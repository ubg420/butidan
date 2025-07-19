phina.define('Knight', {
    superClass: 'Enemy',
  
    init: function() {
      this.superInit();
      this.setSize(80, 80);
      
      this.sprites = DisplayElement().addChildTo(this);

      this.weponSprite = Sprite("sord").addChildTo(this.sprites);
      this.weponSprite.setSize(158, 158);
      this.weponX = 54;
      this.weponSprite.x = this.weponX;
      this.weponSprite.origin.set(0.5,0.95);

      this.sprite = Sprite('knight').addChildTo(this.sprites);

      this.spriteSS= FrameAnimation('knightSS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('run');
      this.spriteSS.fit = false;
      this.sprite.setSize(158, 158);

      this.colision = RectangleShape().addChildTo(this.sprites);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 100;

      //倍率
      this.hpMagnification = 2;
      this.attackMagnification = 1.3;
      this.expMagnification = 6;
      this.setLevel();

      this.weight = 1;
      

      this.shotRemit =40;
      this.shotTimer = this.shotRemit;

      this.nextShotRemit = 40;
      this.nextShotTimer = this.nextShotRemit;

      this.friction = 0.99;

      this.mode = "move";
      this.vx = 0;
      this.vy = -20;



      this.attackSpeed = 45;

      this.knockBackRemit = 30;


    },
  
    update: function(app) {

      this.move(app.frame);

      if (this.y < -this.height) {
        this.remove();
      }
    },


    move :function(frame){


        this.x += this.vx;
        this.y += this.vy;
  
        this.vx *= this.friction;
        this.vy *= this.friction;


      switch (this.mode) {
        case "move":


          this.nextShotTimer--;
          if(this.nextShotTimer <= 0){
            this.nextShotTimer = this.nextShotRemit;
            this.tameStart();
          }


          break;

        case "tame":
          this.setRotation();

          this.shotTimer--;
          if(this.shotTimer <= 0){
            this.shotTimer = this.shotRemit;
            this.shot();
          }

          break;


        case "knockBack":
          this.knockBack();





          break;

        case "attack":

            if (frame % 2 === 0) {
                var ai = KnightAfterimage().addChildTo(GameMain.afeterGroup);
                ai.setPosition(this.x, this.y);
                ai.rotation = this.sprites.rotation;
                ai.scaleX = this.sprite.scaleX;
            }
    

            break;

          
        default:
          break;
      }

      this.checkScreenArea();


    },

    resetMode:function(){
        this.weponSprite.tweener.clear();
    
        this.mode = 'move';
        this.spriteSS.gotoAndPlay('run');
        this.sprites.rotation = 0;
        this.tameTimer= 0;
        this.shotTimer = this.shotRemit;

        this.weponSprite.rotation = 0;
        if(this.sprite.scaleX > 0){
            this.weponSprite.x = this.weponX;
        }else{
            this.weponSprite.x = -this.weponX;        
        }
    
        this.setSize(80, 80);
    
    },



    shot :function(){
        SoundManager.play("attack");


        var v = Vector2.sub(GameMain.player, this);
        this.setSize(100,100);
        this.weponSprite.tweener.clear();
    
        //向きを設定
        var angle = v.toAngle().toDegree();
        if(angle > 90 && angle < 260){
            this.sprites.rotation = angle + 180;
            this.sprite.scaleX = -1;
    
            this.weponSprite.scaleX = -1;
            this.weponSprite.rotation = -90;
            this.weponSprite.x = -this.weponX;
    
    
        }else{
            this.sprites.rotation = angle;
            this.sprite.scaleX = 1;
    
            this.weponSprite.scaleX = 1;
            this.weponSprite.rotation = 90;
            this.weponSprite.x = this.weponX;
    
    
        }
    
        //進行方向の設定
        /*
        this.dx = this.x - p.x;
        this.dy = this.y - p.y;
        this.vx = -(this.dx / 20);
        this.vy = -(this.dy / 20);
        */
    
        this.vx = Math.cos(angle * Math.PI / 180) * this.attackSpeed;
        this.vy = Math.sin(angle * Math.PI / 180) * this.attackSpeed;
    
        this.mode = 'attack';
        this.spriteSS.gotoAndPlay('attack');
    
    
        var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
        hiteffect.x = this.x;
        hiteffect.y = this.y;
        hiteffect.setSize(150,150)
    

    },


    tameStart:function(){

        this.mode = "tame";
        this.spriteSS.gotoAndPlay('tame');
        SoundManager.play("tame");


    },


    setRotation:function(){

        var v = Vector2.sub(GameMain.player, this);
    
        var angle = v.toAngle().toDegree();
    
        if(angle > 90 && angle < 260){
            this.sprites.rotation = angle + 180;
            this.leftFacing();
    
        }else{
            this.sprites.rotation = angle;
            this.rightFacing();
        }
    
    },

    
    checkScreenArea :function(){

        if (this.left < 0 && this.vx < 0) {
            this.left = 0;
            this.vx *= -1;

            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;


            if(this.mode == "attack"){
                this.resetMode();
            }


        }
        else if (this.right > SCREEN_WIDTH && this.vx > 0) {
            this.right = SCREEN_WIDTH;
            this.vx *= -1;

            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;

            if(this.mode == "attack"){
                this.resetMode();
            }

        }

        if (this.top < 0 && this.vy < 0) {
            this.top = 0;
            this.vy *= -1;


            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;

            if(this.mode == "attack"){
                this.resetMode();
            }

        }
        if (this.bottom > SCREEN_HEIGHT && this.vy > 0) {
            this.bottom = SCREEN_HEIGHT;
            this.vy *= -1;


            var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
            hiteffect.x = this.x;
            hiteffect.y = this.y;

            if(this.mode == "attack"){
                this.resetMode();
            }

        }

    },

    //左向き
    leftFacing:function(){
        this.sprite.scaleX = -1;
        this.weponSprite.scaleX = -1;

        this.weponSprite.x = -this.weponX;

        if(this.mode == "tame" || this.mode == "kaiten" || this.mode == "attack"){
            this.weponSprite.rotation = -90;

        }

    },

    //右向き
    rightFacing:function(){
        this.sprite.scaleX = 1;
        this.weponSprite.scaleX = 1;

        this.weponSprite.x = this.weponX;

        if(this.mode == "tame" || this.mode == "kaiten" || this.mode == "attack"){
            this.weponSprite.rotation = 90;
        }

    },

    knockBack :function(){
        if(this.hp == 0){
            this.die();
        }

        if(this.knockBackTimer % 2 ==0){
            this.sprite.alpha = 0.2;
            this.weponSprite.alpha = 0.2;

        }
        if(this.knockBackTimer % 4 ==0){
            this.sprite.alpha = 1;
            this.weponSprite.alpha = 1;

        }

      if(this.knockBackTimer > this.knockBackRemit){

        this.sprite.alpha = 1;
        this.weponSprite.alpha = 1;

        this.knockBackTimer = 0;
        this.mode = "move";

      }

      this.knockBackTimer++

    },

    damageMove:function(){
      this.speed = this.maxspeed /2;

      this.resetMode();

      //ぶっとばす
      var random = Math.floor( Math.random() * 120 ) + -60;
      var rot = Math.atan2(GameMain.player.vy+random,GameMain.player.vx+random) * 180 / Math.PI;
      if(rot > 180)	rot-= 360;
      if(rot <-180)	rot+= 360;

      var knockBackSpeed  = 50;

      this.vx = Math.cos(rot * Math.PI / 180) * knockBackSpeed;
      this.vy = Math.sin(rot * Math.PI / 180) * knockBackSpeed;

      this.mode = "knockBack";

    },


    kakiin:function(){
  
        this.resetMode();
  
        //ぶっとばす
        var random = Math.floor( Math.random() * 120 ) + -60;
        var rot = Math.atan2(GameMain.player.vy+random,GameMain.player.vx+random) * 180 / Math.PI;
        if(rot > 180)	rot-= 360;
        if(rot <-180)	rot+= 360;
  
        var knockBackSpeed  = 50;
  
        this.vx = Math.cos(rot * Math.PI / 180) * knockBackSpeed;
        this.vy = Math.sin(rot * Math.PI / 180) * knockBackSpeed;
  
  
    },




  });


phina.define('KnightAfterimage', {
superClass: 'Sprite',

init: function() {
    this.superInit('knight');


    var ss = FrameAnimation('knightSS')
    ss.attachTo(this);
    ss.gotoAndPlay('attack');
    ss.fit = false;
    this.setSize(158, 158);

    this.tweener
    .fadeOut(368)
    .call(function() {
        this.remove();
    }, this);
},
});
