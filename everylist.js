;(function ( $, window, undefined ) {
    
    var pluginName = 'EveryList',
        document = window.document,
        defaults = {
            tagName: "SELECT",
            remote_host: "http://localhost/everylist"
        };

    function EveryList( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    EveryList.prototype.init = function () {
        this.options.tagName = this.element.tagName;
        if(!this.options.hasOwnProperty('listName')){
            return this.errorOnMissingParameter('init', 'listName');
        }
        this.getList(this.options.listName);
    };

    EveryList.prototype.getList = function(name){
        this.readFile(name);
    };

    EveryList.prototype.setValues = function(str_list) {
        console.log(this.options);
        switch(this.options.tagName) {
            case 'UL':
                console.log(this.element);
                list = str_list.split('\n');
                for(var i=0; i<list.length; i++){
                    console.log(list[i]);
                    el = [];
                    list[i] = list[i].split(',');
                    
                    el.push(list[i].pop());
                    el.push(list[i].toString());
                    list[i] = el;
                    
                    subel = $('<li/>', {
                        text: list[i][1],
                        alt: list[i][0]
                    });
                    subel.appendTo(this.element);
                }
                break;
        }
    };

    EveryList.prototype.readFile = function(fileName){
        if(fileName == undefined || fileName == ""){
            return this.errorOnMissingParameter('readFile', 'fileName');
        }
        fileName += '.csv';
        var listurl = this.options.remote_host + "/lists/" + fileName;
        var current_obj = this;
        $.ajax({
            url: listurl,
            success: function(data) {
                console.log(pluginName + ': List found - ' + fileName);
                current_obj.setValues(data);
            },
            error: function(jqXHR, exception) {
                console.log(pluginName + ': List not found - ' + fileName + '(' + exception + ')');
            },
            statusCode: {
                404: function(jqXHR, exception) {
                    console.log(pluginName + ': List not found - ' + fileName);
                    console.log(exception);
                }
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