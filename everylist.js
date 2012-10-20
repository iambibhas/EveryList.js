;(function ( $, window, undefined ) {
    
    var pluginName = 'EveryList',
        document = window.document,
        defaults = {
            element: "select"
        };

    function EveryList( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    EveryList.prototype.init = function () {
        console.log(this.element);
        console.log(this.options);
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));