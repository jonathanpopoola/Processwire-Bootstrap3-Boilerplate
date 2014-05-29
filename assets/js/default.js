
var GU = window.GU || {};

(function ($) { 

    // change name of namespace to match project e.g GU.Default to GU.YourCustomNameSpace

    // note Default exists in other places please remove //

    //define namespaces
    GU.Default = GU.Default || {};
 
    GU.UTIL = GU.UTIL || {};

/*------------------------------------------------------*
 GLOBALS
 *------------------------------------------------------*/
 var
 $body;   
  
    /**
     * Utility to return top level domain (or 'localhost')
     * @param urlString String assume window.location.hostname
     * @return domain String domain to three levels "***.co.uk" or "localhost"
     * FIXME: Won't work with IP addresses
     **/
     GU.UTIL.getDomain = function (urlString) {
        var domain = "",
        urlArr = urlString.split('.');
        domain = (urlArr.length === 1) ? urlArr[0] : urlArr.reverse().slice(0, 3).reverse().join('.');
        return domain;
    };

    /**
     * element factory
     * @param el String Element name

     * @returns jQuery object
     **/
     GU.UTIL.el = function (el) {
        return $(document.createElement(el));
    };

    GU.UTIL.asyncAddEl = function (d, s, id, url) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = url;
        fjs.parentNode.insertBefore(js, fjs);
    };

    GU.Default = (function () {
        var public = {
            init: function () {
                $body = $('body');
            }

        
        };
        return public; 
    })(); 
 

    GU.Default.Homepage = (function () {
        var
        FILTER_ROOT = "#test", //change to match id, of your pge identifier

            //jquery objects
            $root,

            //others
            //hammer,

            private = {

            },

            public = {
                init: function () {
                    $root = $(FILTER_ROOT);
                    if ($root.length === 0) {
                        return false;
                    }



                }
            };
            return public;
        })();
 

    //example common functions

    GU.Default.Utilities = (function () {
        var
        private = {
          

        }, public = {
            init: function () {

            }
        };
        return public;
    })();

    $(function () {

        $(document).ready(function () {
            GU.Default.init();
            GU.Default.Utilities.init(); 
            GU.Default.Homepage.init();
        });

    });

})(jQuery);