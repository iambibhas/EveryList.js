;(function ( $, window, undefined ) {
    
    var pluginName = 'EveryList',
        document = window.document,
        defaults = {
            tag: "SELECT"
        };

    function EveryList( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    EveryList.prototype.init = function () {
        this.options.tag = this.element.tagName;
        list = this.getList(this.options.listName);
        console.log(list);
    };

    EveryList.prototype.getList = function(name){
        if(name == 'COUNTRY'){
            // returning dummy list
            return {1: 'India'};
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new EveryList( this, options ));
            }
        });
    };

}(jQuery, window));