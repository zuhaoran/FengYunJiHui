cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.getArmature();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    getArmature:function(){
        //获取 ArmatureDisplay
        this._armatureDisPlay = this.getComponent(dragonBones.ArmatureDisplay)
        //获取 Armatrue
        this._armature = this._armatureDisPlay.armature()
        //添加动画监听
        this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this.animationEventHandler, this)
        this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.animationEventHandler, this)
        this.walk();
    },
    walk:function(){
        //动画执行方式一
        this._armature.animation.fadeIn('walk', -1, -1, 0, 'hit');
    },
    attack:function(){
        //动画执行方式一
        this._armature.animation.fadeIn('attack1', -1, -1, 0, 'hit');
    },
    attack2:function(){
        //动画执行方式二
        this._armatureDisPlay.playAnimation('attack2', 1);
    },
    animationEventHandler: function animationEventHandler(event) {
        if (event.type == dragonBones.EventObject.FADE_IN_COMPLETE) {
            cc.log(event.detail.animationName + ' fade in complete');
        } else if (event.type == dragonBones.EventObject.FADE_OUT_COMPLETE) {
            cc.log(event.detail.animationName + ' fade out complete');
        }
    }
});
