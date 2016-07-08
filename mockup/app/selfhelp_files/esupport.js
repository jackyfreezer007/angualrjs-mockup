var ESupportRouter = Backbone.Router.extend({

    initialize:function () {
        var that = this;
        $(ESupportView.all).each(function (index, routerView){
            var viewClazz = routerView.view;
            var view = new viewClazz();
            that.route(routerView.pattern, routerView.name, function(){
                var render = view[routerView.render];
                render.apply(view, arguments);
            });
        });
    }
});

ESupportView = Backbone.View.extend({
});

ESupportView.all = [];
ESupportView.registerRouter = function () {
    if (arguments.length == 2) {
        ESupportView.all[ESupportView.all.length] = {pattern:arguments[0], name:"render", view:arguments[1], render : "render"};
    } else {
        ESupportView.all[ESupportView.all.length] = {pattern:arguments[0], name:arguments[2], view:arguments[1], render : arguments[2]};
    }
};

tpl = {
    // Hash of preloaded templates for the app
    templates:{},
    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, callback) {
        var that = this;
        var loadTemplate = function (index) {
            var name = names[index];
            //console.log('Loading template: ' + name);
            $.get('tpl/tpl_' + name + '.html?bn=876', function (data) {
                that.templates[name] = data;
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        };
        loadTemplate(0);
    },
    // Get template by name from hash of preloaded templates
    get:function (name) {
        return this.templates[name];
    }
};

var player,
APIModules,
videoPlayer;

function onTemplateLoad(experienceID) {
    player = brightcove.api.getExperience(experienceID);
    APIModules = brightcove.api.modules.APIModules;
}

function onTemplateReady(evt) {
    videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);

    $("#maskdiv").css("z-index", "902");
    
    var onMediaEventFired = function(evt) {
        if (evt.type === "mediaPlay") {
            $("#shadow").show();
        }
        if (evt.type === "mediaStop") {
            $("#shadow").hide();
        }
    }
    
    videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired);
    videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaEventFired);
    videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onMediaEventFired);
    videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, onMediaEventFired);
    videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, onMediaEventFired);
}

ESupportModelSupport = {
    parse:function (response) {
        if (response.needLogin) {
            this._toLogin();
        } else {
            if (response.value) {
                return response.value;
            } else {
                return response;
            }
        }
    },
    _toLogin:function () {
        if (ESupportModelSupport.doingLogin) {
            return;
        }
        ESupportModelSupport.doingLogin=true;
        window.location.reload(true);

        //alert("Session timeout, please login again.");
        //window.location.hash = "login";
    },
    save : function () {
        if (arguments.length == 0) {
            return Backbone.Model.prototype.save.apply(this, [{}, {error:function(model, response){
                console.log("Failed to save model : " + JSON.stringify(model.toJSON()) + " because of status " + response.status);
            }}]);
        }
        if (arguments.length == 1) {
            return Backbone.Model.prototype.save.apply(this, [arguments[0], {error:function(model, response){
                console.log("Failed to save model : " + JSON.stringify(model.toJSON()) + " because of status " + response.status);
            }}]);
        } else {
            if (!arguments[1].error) {
                arguments[1].error=function(model, response) {
                    console.log("Failed to save model : " + JSON.stringify(model.toJSON()) + " because of status " + response.status);
                }
            }
            return Backbone.Model.prototype.save.apply(this, arguments);
        }
    }
};
ESupportModel = Backbone.Model.extend(ESupportModelSupport);
ESupportCollection = Backbone.Collection.extend(ESupportModelSupport);
