/**
 * Created by beens on 16/4/7.
 */




var plainSprite = cc.Sprite.extend({
    onEnter:function(){
        this._super();
        this.addTouchMoveEvent();
    },
    onExit:function(){

    },
    addTouchMoveEvent:function(){
        var _this = this,
            win_max_width = cc.visibleRect.width - this.width/2,
            win_max_height = cc.visibleRect.height - this.height/2,
            win_min_width = this.width/ 2,
            win_min_height = this.height/2;

        this.touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                //判断是否点击到元素上
                //began事件返回false后续的move和end事件不会触发
                return (cc.rectContainsPoint(target.getBoundingBox(),pos));
            },
            onTouchMoved:function(touch,event){
                //当前点坐标
                var now_pos = touch.getLocation(),
                    //上一个点坐标
                    str_pos = touch.getPreviousLocation();

                _this.x += now_pos.x - str_pos.x;
                _this.y += now_pos.y - str_pos.y;

                _this.x = (_this.x>win_max_width)? win_max_width : _this.x;
                _this.y = (_this.y>win_max_height)? win_max_height : _this.y;
                _this.x = (_this.x<win_min_width)? win_min_width : _this.x;
                _this.y = (_this.y<win_min_height)? win_min_height : _this.y;

            },
            onTouchEnded:function(){

            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    }
});