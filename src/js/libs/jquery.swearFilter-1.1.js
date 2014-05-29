
(function ($) {
    $.fn.swearFilter = function (options) {

        var defaults = {
            words: "",
            mask: "*",
            mode: "input",
            sensor: "normal",
            live: true,
            inputEvents: "keypress"

        };

        var options = $.extend(defaults, options);

        /*-------------------------------------------------------------------------------
        Build Filter Regex Pattern 
        -------------------------------------------------------------------------------*/

        var filterRegex;
        if (options.words != "") {

            // build bad word regex pattern
            var badwords = options.words.split(" ");
            var regexPattern = "";

            switch (options.sensor) {

                case "normal":
                    for (i = 0; i < badwords.length; i++) {
                        if (badwords[i] != "") { regexPattern += "\\b" + badwords[i] + "\|"; }
                    }
                    break;

                case "high":
                    for (i = 0; i < badwords.length; i++) {
                        if (badwords[i] != "") { regexPattern += badwords[i] + "\|"; }
                    }
                    break;
                default:
                    for (i = 0; i < badwords.length; i++) {
                        if (badwords[i] != "") { regexPattern += "\\b" + badwords[i] + "\|"; }
                    }
            }


            // create regex to match bad words using generated pattern 
            filterRegex = new RegExp(regexPattern, "gi");

        }

        /*-------------------------------------------------------------------------------
        Main Filter Function
        -------------------------------------------------------------------------------*/
        function FilterText(input) {

            if (filterRegex != null && input != null) {
                var clean = input.replace(filterRegex, function (str) { return str.replace(/(?!\b\w)\w/gi, options.mask); });
                return clean;
            } else {
                return input;
            }

        };

        /*-------------------------------------------------------------------------------
        Handler Functions
        -------------------------------------------------------------------------------*/

        // Handle Input Fields With Value Attribute
        function FilterInput(ctrl) {

            var caretPos = 0;
            ctrl.val(FilterText(ctrl.val()));

            if (options.live) {
                ctrl.bind(options.inputEvents, function () {

                    caretPos = GetCaretPosition($(ctrl).get(0)); //Get current caret position
                    this.value = FilterText(this.value);
                    SetCaretPosition($(ctrl).get(0), caretPos); //Return caret back to inital pos
                });
            }
        }

        // Handle Elements Without Value Attributes
        function FilterHtml(ctrl) {

            if (ctrl.html() != null) {
                ctrl.html(FilterText(ctrl.html()));
            }

        }
        /*-------------------------------------------------------------------------------
        Caret Helper Functions
        -------------------------------------------------------------------------------*/

        function GetCaretPosition(ctrl) {

            var CaretPos = 0;
            // IE Support
            if (document.selection) {

                ctrl.focus();
                var Sel = document.selection.createRange();

                Sel.moveStart('character', -ctrl.value.length);

                CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0')
                CaretPos = ctrl.selectionStart;

            return (CaretPos);

        }


        function SetCaretPosition(ctrl, pos) {

            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            }
            else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }

        /*-------------------------------------------------------------------------------
        Pass Selected Items to Filter Function
        -------------------------------------------------------------------------------*/

        return this.each(function () {

            var currObj = $(this);
            switch (options.mode) {

                case "input":
                    FilterInput(currObj);
                    break;
                case "static":
                    FilterHtml(currObj);
                    break;
                default:
                    FilterInput(currObj);
            }

        }); // End each

    }; // End plugin

})(jQuery);  // End closure
