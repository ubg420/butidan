phina.define('Treasure', {
superClass: 'Sprite',

    init: function(x,y) {
        this.superInit('treasure');

        this.anim = FrameAnimation('treasureSS').attachTo(this);
        this.anim.gotoAndPlay('close');
        this.anim.fit = false;
        this.setSize(120, 120);

        this.x = x;
        this.y = y;

        var random = Math.floor( Math.random() * 30 ) + -15;

        this.vx = random;
        this.vy= -15;
        this.g = 1.98;
        
        this.timer = 0;

        this.tag = 'treasure';

    },

    update: function(app) {

        this.rotation+= 11;
        if(this.rotation > 360){
            this.rotation = 0;
        }
        //this.vy += this.g;

        this.timer++;

        this.move();
    },


    move:function(app){
        this.x += this.vx;
        this.y += this.vy;
    
        if (this.left < 0) {
            this.left = 0;
            this.vx *= -1;
    
            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;
    
        }
        else if (this.right > SCREEN_WIDTH) {
            this.right = SCREEN_WIDTH;
            this.vx *= -1;

    
            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;
    
        }
    
        if (this.top < 0) {
            this.top = 0;
            this.vy *= -1;
    
            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;
    
        }
        else if (this.bottom > SCREEN_HEIGHT) {
            this.bottom = SCREEN_HEIGHT;
            this.vy *= -1;
    
            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;
    
    
        }
    },



});