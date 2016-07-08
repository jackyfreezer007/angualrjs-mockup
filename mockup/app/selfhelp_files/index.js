var ESupportApp = {
    sessionStatus:
    {
        "video":{
            producttype:"WebEx Meeting Center",
            topic:"0",
            video:"0",
            playingvideokey:""
        },

        "faq":{
            producttype:"WebEx Meeting Center",
            topic:"0",
            faq:"0",
            openingfaqkey:""
        }

    },

    login:function (callback) {
        this.currentHash = window.location.hash;
        var that = this;
        this._checkRememberMe(function (rememberMe) {
            if (rememberMe) {
                callback();
            } else {
                that.toLogin(callback);
            }
        });
    },
    _checkRememberMe:function (callback) {
        $.ajax("../rememberMe", {
            type:"GET",
            dataType:"json",
            success:function (result) {
                if (result.success) {
                    return callback(true);
                } else {
                    return callback(false);
                }
            },
            error:function () {
                return callback(false);
            }
        });
    },
    toLogin:function (callback) {
        //todo load loginModel.js and loginView.js
        tpl.loadTemplates(['login'], function () {
            new LoginView({callback:callback}).render();
        });
    }
};

$(function () {
    tpl.loadTemplates([
        'header',
        'home',
        'top_faq',
        'featured_video',
        'home_played_video',
//        'kbsearch_bar',
        'kbsearch_layout',
        'kbsearch_result',
        'headersearch',
        'video_main',
        'video_topic',
        'video_list',
        'video_player',
        'faq_main',
        'faq_topic',
        'faq_list',
        'print_faq_list'
        ], function () {
        new HeaderView(
            {
                callback:function () {
                    //new NavigationExecutor().init();
                    eSupportRouter = new ESupportRouter();
                    Backbone.history.start();
                }
            }
        ).render();
    });


});

//window.NavigationExecutor = function()
//{
//    this.renderVideos= function(){
//        $("#navlink > ul >li").css("border-bottom","0px");
//        $("#navlink > ul > li:nth-child(2)").css("border-bottom", "6px solid #555");
//
//        var headerView = new HeaderSearchView();
//        headerView.render();
//
//        var videoMainView = new VideoMainView({"producttype":"WebEx Meeting Center", "activetopicid":"0"});
//        videoMainView.render();
//    };
//
//    this.renderVideoByCategory=function(categoryId){
//
//    }
//
//    this.renderFAQs= function(){
//    };
//
////    this.renderHelpCenter= function()
////    {
////    };
//
//    this.init= function(){
//        $("#navlink > ul >li > a").bind("click",this._navigateSwitch);
//        //ESupportView.registerRouter("video", NavigationExecutor,"renderVideos");
//        //ESupportView.registerRouter("faq", NavigationExecutor,"renderFAQs");
//
//    };
//
//    this._navigateSwitch= function(event)
//    {
//         $("#navlink > ul >li").css("border-bottom","0px");
//         $(event.target).parent().css("border-bottom", "6px solid #555");
//    }
//};


