/**
 * Created by beens on 16/4/6.
 */


var startBgLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function(){
        this.createBg();
        this.createTitle();
    },
    createBg:function(){
        var winSize = cc.winSize;

        var bg_ = new cc.Sprite();
        bg_.setTextureRect(cc.rect(0, 0,winSize.width ,winSize.height ));
        bg_.setColor(cc.color("#feff00"));
        bg_.x = cc.visibleRect.width/2;
        bg_.y = cc.visibleRect.height/2;
        this.addChild(bg_);

        var bg = new cc.Sprite(res.bg);
        bg.x = winSize.width/2;
        bg.y = winSize.height/2;
        this.addChild(bg);
    },
    createTitle:function(){
        var winSize = cc.visibleRect;
        var str = cc.visibleRect.width+" "+cc.visibleRect.height;
        var str1 = cc.winSize.width+" "+cc.winSize.height;

        title = new cc.LabelTTF("大法师打发斯蒂芬阿斯顿发是哦的房价是对方阿斯蒂芬静安寺迪欧","",36,cc.size(200,86),cc.TEXT_ALIGNMENT_CENTER,"");
        title.x = winSize.width/2;
        title.y = winSize.top.y - 40;
        title.setColor({r:211,g:137,b:0});
        //设置显示区域
        //title.setDimensions(200,80);
        this.addChild(title);
    }
});

var startBtnLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.createBtn();
    },
    createBtn:function(){
        var _this = this;

        var startItem = new cc.MenuItemImage(
            res.btn,
            res.btn_,
            function () {
                _this.btnClick();
            }, this);

        startItem.attr({
            x: cc.visibleRect.width/2 - 90,
            y: 20,
            anchorX: 0.5,
            anchorY: 0
        });

        var startItem1 = new cc.MenuItemImage(
            res.btn,
            res.btn_,
            function () {
                _this.btn1Click();
            }, this);

        startItem1.attr({
            x: cc.visibleRect.width/2 + 90,
            y: 20,
            anchorX: 0.5,
            anchorY: 0
        });


        var menu = new cc.Menu([startItem,startItem1]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    },
    btnClick:function(){
        cc.director.pushScene(new mainScene());
    },
    btn1Click:function(){
        //http://www.cocos.com/doc/tutorial/show?id=2166
        cc.director.runScene(new cc.TransitionFade(1,new mainScene));
    }
});



var startScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        this.addChild(new startBgLayer());
        this.addChild(new startBtnLayer());
    }
});