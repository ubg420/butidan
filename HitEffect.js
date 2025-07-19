phina.define('HitEffect', {
superClass: 'Sprite',

    init: function(img,ss) {
        this.superInit(img);

        this.anim = FrameAnimation(ss).attachTo(this);
        this.anim.gotoAndPlay('run');
        this.anim.fit = false;


    },

    update: function(app) {

        if (this.anim.finished) { 
            this.remove();
        }

    },


});