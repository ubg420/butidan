phina.define('Coin', {
superClass: 'Sprite',

    init: function(x,y) {
        this.superInit('coin');

        this.anim = FrameAnimation('coinSS').attachTo(this);
        this.anim.gotoAndPlay('run');
        this.anim.fit = false;


        console.log('coinX:'+x+' coinY'+y);

        this.x = x;
        this.y = y;

        var random = Math.floor( Math.random() * 10 ) + -5;
        this.vx = random;
        this.vy= -15;
        this.g = 1.98;
        
        this.timer = 0;

    },

    update: function(app) {

        this.x += this.vx;
        this.y += this.vy;

        this.vy += this.g;

        this.timer++;

        if(this.timer > 80){
            this.remove();
        }

/*
        if (this.anim.finished) { 
            console.log("remove");
            this.remove();
        }
*/
    },


});