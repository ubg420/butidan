phina.define('Golem', {
    superClass: 'Enemy',
  
    init: function() {
      this.superInit();

      this.setSize(100, 100);
      
      this.type = "golem";

      this.sprite = Sprite('golem').addChildTo(this);
      this.spriteSS= FrameAnimation('golemSS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('run');
      this.spriteSS.fit = false;

      this.sprite.setSize(120,120)

      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 100;
      
      //倍率
      this.hpMagnification = 1.8;
      this.attackMagnification = 1;
      this.expMagnification = 5;

      this.setLevel();
      this.weight = 3;
      
      this.speed = 15;
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


  resetMode:function(){

  },

  kakiin:function(){

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