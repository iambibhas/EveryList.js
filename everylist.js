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
        if(!this.options.hasOwnProperty('listName')){
            return this.errorOnMissingParameter('init', 'listName');
        }
        this.getList(this.options.listName);
    };

    EveryList.prototype.getList = function(name){
        if(name == 'COUNTRY'){
            // returning dummy list
            this.readFile(name);
        }
    };

    EveryList.prototype.readFile = function(fileName){
        if(fileName == undefined || fileName == ""){
            return this.errorOnMissingParameter('readFile', 'fileName');
        }
        fileName += '.json';
        var listurl = "http://iambibhas.github.com/EveryList.js/lists/" + fileName + "?callback=?"
        $.ajax({
            url: listurl,
            dataType: 'jsonp',
            jsonpCallback: 'onelist',
            success: function(data) {
                console.log(pluginName + ': List found - ' + fileName);
                console.log(data);
            },
            error: function(jqXHR, exception) {
                console.log(exception);
            }
        });
    }

    EveryList.prototype.errorOnMissingParameter = function(funcName, paramName){
        if(paramName != undefined){
            console.log(pluginName + ': Must provide property - ' + paramName);
            return false;
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