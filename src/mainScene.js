/**
 * Created by beens on 16/4/6.
 */


var textObj = null,
    number = 0;

var mainLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.createText();
    },
    createText:function(){
        var text = new cc.LabelTTF("0","",10);
        text.x = cc.visibleRect.width/2;
        text.y = cc.visibleRect.top.y - 30;
        this.addChild(text);
        textObj = text;
    }
});


var planeLayer = cc.Layer.extend({
    writePlanes:[],
    redPlane:null,
    redShot:[],
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.createRedPlane();
        //this.createWritePlane();

        this.schedule(this.createWritePlane,1);
        this.schedule(this.update,0.05);
    },
    createRedPlane:function(){
        var plane = new plainSprite();
        plane.setTextureRect(cc.rect(0, 0,100 ,100 ));
        plane.setColor(cc.color("#ff0000"));
        plane.x = cc.visibleRect.width/2;
        plane.y = 200;
        plane.zIndex = 10;

        this.redPlane = plane;
        this.addChild(plane);
    },
    createWritePlane:function(){
        var plane = new cc.Sprite();
        plane.setTextureRect(cc.rect(0, 0,50 ,50 ));
        plane.setColor(cc.color("#ffffff"));
        plane.x = (cc.visibleRect.width - plane.width)*cc.random0To1();
        plane.y = cc.visibleRect.top.y - 25;

        var dorpAction = cc.moveTo(4, cc.p(plane.x,-30));
        plane.runAction(dorpAction);

        this.addChild(plane);
        this.writePlanes.push(plane);
    },
    delNotUseWritePlaneAndShot:function(){
        var newPlanes = [];
        for(var i= 0,l=this.writePlanes.length;i<l;i++){
            var this_plane = this.writePlanes[i];
            if(this_plane.y<-this_plane.height/2){
                this_plane.removeFromParent();
            }else{
                newPlanes.push(this_plane);
            }
        }
        this.writePlanes = newPlanes;

        var newShot = [],
            height = cc.winSize.height;
        for(var z= 0,zl=this.redShot.length;z<zl;z++){
            var this_shot = this.redShot[z];
            if(this_shot.y>height){
                this_shot.removeFromParent();
            }else{
                newShot.push(this_shot);
            }
        }
        this.redShot = newShot;


        for(var j= 0,jl=this.redShot.length;j<jl;j++){
            var that_shot = this.redShot[j],
                shot_x = that_shot.x,
                shot_y = that_shot.y;
            for(var k= 0,kl=this.writePlanes.length;k<kl;k++){
                var that_plane = this.writePlanes[k],
                    r = that_plane.width/2;

                if(that_plane.isDel){continue;}

                if(that_plane.x-r<shot_x &&
                    that_plane.x+r>shot_x &&
                    that_plane.y -r < shot_y &&
                    that_plane.y +r >shot_y){
                    that_plane.isDel = true;
                    that_shot.isDel = true;
                    number++;
                    textObj.setString(number);
                    break;
                }
            }
        }


        var newPlanes1 = [];
        for(var f= 0,fl=this.writePlanes.length;f<fl;f++){
            this_plane = this.writePlanes[f];
            if(!this_plane.isDel){
                newPlanes1.push(this_plane);
            }else{
                this_plane.removeFromParent();
            }
        }
        this.writePlanes = newPlanes1;


        var newShot1 = [];
        for(var b= 0,bl=this.redShot.length;b<bl;b++){
            this_shot = this.redShot[b];
            if(!this_shot.isDel){
                newShot1.push(this_shot);
            }else{
                this_shot.removeFromParent();
            }
        }
        this.redShot = newShot1;

    },
    update:function(){
        this.shot();
        this.delNotUseWritePlaneAndShot();

    },
    shot:function(){

        var shot = new cc.Sprite();
        shot.setTextureRect(cc.rect(0, 0,8 ,8 ));
        shot.setColor(cc.color("#ff0000"));
        shot.x = this.redPlane.x;
        shot.y = this.redPlane.y + this.redPlane.height/2;

        var y = this.redPlane.y + cc.winSize.height;
        var dorpAction = cc.moveTo(1.5, cc.p(this.redPlane.x,y));
        shot.runAction(dorpAction);

        this.addChild(shot);
        this.redShot.push(shot);
    }
});



var mainScene = cc.Scene.extend({
    ctor:function(){
        this._super();

        this.addChild(new planeLayer());
        this.addChild(new mainLayer());
    }
});