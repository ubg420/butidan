phina.define('IronGolem', {
    superClass: 'Enemy',
  
    init: function() {
      this.superInit();

      this.setSize(150, 150);
      
      this.sprite = Sprite('irongolem').addChildTo(this.spriteLayer);
      this.spriteSS= FrameAnimation('golemSS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('run');
      this.spriteSS.fit = false;

      this.hpUI.y = this.height/4;
      this.type = "golem";

      this.sprite.setSize(170,170)

      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 150;
      
      //倍率
      this.hpMagnification = 2.4;
      this.attackMagnification = 1.5;
      this.expMagnification = 10;

      this.setLevel();
      this.weight = 3;
      
      this.speed = 20;
      this.vx =  this.speed;
      this.vy =  this.speed;
      this.mode = "move";

    },
  
    update: function() {

      this.move();

      if (this.y < -this.height) {
        this.remove();
      }
    },


    move :function(){


      this.x += this.vx;
      this.y += this.vy;


      switch (this.mode) {
        case "move":
          //だんだん加速


          break;

        case "knockBack":
          
          this.knockBack();
          break;
          
        default:
          break;
      }

      this.checkScreenArea();


    },

    resetMode:function(){

    },

    kakiin:function(){

    },


    checkScreenArea:function(){

  
      if (this.left < 0) {
          this.left = 0;
          this.vx *= -1;
  
          this.scaleX = 1;
          var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
          hiteffect.x = this.x;
          hiteffect.y = this.y;

      }
      else if (this.right > SCREEN_WIDTH) {
          this.right = SCREEN_WIDTH;
          this.vx *= -1;
          this.scaleX = -1;
  
          var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
          hiteffect.x = this.x;
          hiteffect.y = this.y;


  
      }
  


    if (this.top < 0 && this.vy < 0) {
        this.top = 0;
        this.vy *= -1;


        var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
        hiteffect.x = this.x;
        hiteffect.y = this.y;


    }

    if (this.bottom > SCREEN_HEIGHT && this.vy > 0) {
        this.bottom = SCREEN_HEIGHT;
        this.vy *= -1;


        var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
        hiteffect.x = this.x;
        hiteffect.y = this.y;



    }



      
  },





    knockBack :function(){

      if(this.knockBackTimer > this.knockBackRemit){
        this.knockBackTimer = 0;
        this.mode = "move";
        if(this.hp == 0){
          this.die();
        }
      }

      this.knockBackTimer++


    },

    damageMove:function(){


      this.speed = this.maxspeed /2;

      //ぶっとばす
      var random = Math.floor( Math.random() * 120 ) + -60;
      var rot = Math.atan2(GameMain.player.vy+random,GameMain.player.vx+random) * 180 / Math.PI;
      if(rot > 180)	rot-= 360;
      if(rot <-180)	rot+= 360;

      var knockBackSpeed  = 30;

      this.vx = Math.cos(rot * Math.PI / 180) * knockBackSpeed;
      this.vy = Math.sin(rot * Math.PI / 180) * knockBackSpeed;




      this.mode = "knockBack";

      if(this.hp <= 0){
        this.die();
      }

    },


  });