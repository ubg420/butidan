phina.define('Magician', {
    superClass: 'Enemy',
  
    init: function() {
      this.superInit();
      this.setSize(80, 80);
      
      this.sprite = Sprite('magician').addChildTo(this);
      this.spriteSS= FrameAnimation('magicianSS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('warp');
      this.spriteSS.fit = false;

      this.sprite.setSize(160,160)

      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 100;


      //倍率
      this.hpMagnification = 0.8;
      this.attackMagnification = 1.1;
      this.expMagnification = 5.5;
      this.setLevel();

      this.weight = 1;
      this.timer = 0;

      this.shotRemit =40;
      this.shotTimer = this.shotRemit;

      this.nextShotRemit = 50;
      this.nextShotTimer = this.nextShotRemit;

      

      this.mode_hozon = "move";

      this.warp();

    },
  
    update: function() {

      this.move();

      if (this.y < -this.height) {
        this.remove();
      }
    },


    shot :function(){
      this.tameFire.remove();
      var fireball = FireBall(this.x,this.y,this.attack).addChildTo(GameMain.enemyGroup);
      this.mode = "move";

    },

    move :function(){

      switch (this.mode) {
        case "move":
          //だんだん加速
          if(this.speed < this.maxspeed){
            this.speed *= 1.01;
          }

          this.nextShotTimer--;
          if(this.nextShotTimer <= 0){
            this.nextShotTimer = this.nextShotRemit;
            this.tameStart();
          }

          break;

        case "wait":


          break;

        case "tame":

          this.shotTimer--;
          if(this.shotTimer <= 0){
            this.shotTimer = this.shotRemit;
            this.shot();
          }


          break;



        case "knockBack":
          
          this.knockBack();
          break;
          
        default:
          break;
      }

      this.checkScreenArea();

    },


    tameStart: function(){
      this.mode = "tame";
      this.tameFire = Sprite('fireball').addChildTo(this);
      this.tameFireSS= FrameAnimation('fireballSS')
      this.tameFireSS.attachTo(this.tameFire);
      this.tameFireSS.gotoAndPlay('run');
      this.tameFireSS.fit = false;
      this.tameFire.setSize(60,60)
      this.tameFire.y = 15;

      SoundManager.play("magic");

    },

    warp: function(){
      this.mode = "knockBack";

      var rx = Math.randint(this.width, SCREEN_WIDTH - this.width); 
      var ry = Math.randint(this.height, SCREEN_HEIGHT - this.height);
      this.sprite.alpha = 0;

      this.tweener.clear()
      .to({x:rx,y:ry},1000,"easeOutCubic")
      .call(function() {
         this.sprite.alpha = 1;
         this.mode = this.mode_hozon;
         this.spriteSS.gotoAndPlay('run');

         this.tweener.clear()
         .by({y:20},1000)
         .by({y:-20},1000)
         .setLoop(1);


      }, this)
      ;

    },
    
    checkScreenArea :function(){

      if (this.left < 0) {
        this.left = 0;
        this.knockBackVx *= -1;

        var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
        hiteffect.x = this.x;
        hiteffect.y = this.y;
        hiteffect.setSize(50, 50);

      }
      else if (this.right > SCREEN_WIDTH) {
          this.right = SCREEN_WIDTH;
          this.knockBackVx *= -1;

          var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
          hiteffect.x = this.x;
          hiteffect.y = this.y;
          hiteffect.setSize(50, 50);

      }

    },


    knockBack :function(){

      this.timer++;
 
      if(this.timer % 2 ==0){
        
          var ai = MagicianAfterimage().addChildTo(GameMain.afeterGroup);
          ai.setPosition(this.x, this.y);
        
      }

    },

    damageMove:function(){
//      this.mode_hozon = this.mode;
      this.resetTame();


      if(this.hp <= 0){
        this.die();
      }
      this.spriteSS.gotoAndPlay('warp');
      this.warp();
    },

    resetTame:function(){

      this.shotTimer = this.shotRemit;
      this.nextShotTimer = this.nextShotRemit;

      if(this.mode=="tame"){
        this.tameFire.remove();
      }


    },
  });


  phina.define('MagicianAfterimage', {
    superClass: 'Sprite',
  
    init: function() {
      this.superInit('magician');
      this.alpha = 0.6;

  
      var ss = FrameAnimation('magicianSS')
      ss.attachTo(this);
      ss.gotoAndPlay('warp');
      ss.fit = false;
      this.setSize(160, 160);
  
      this.tweener
        .fadeOut(368)
        .call(function() {
          this.remove();
        }, this);
    },
  });


  phina.define('FireBall', {
    superClass: 'DisplayElement',

    init: function(x,y,attack) {
      this.superInit();
      SoundManager.play("fire");


      this.x = x;
      this.y = y;

      this.width = 100;
      this.height = 100;

      this.attack = attack;

      this.mode = "fire";

      var sprite = Sprite('fireball').addChildTo(this);
      var ss = FrameAnimation('fireballSS')
      ss.attachTo(sprite);
      ss.gotoAndPlay('shot');
      ss.fit = false;
      sprite.setSize(120, 120);

      var v = Vector2.sub(GameMain.player, this);

      this.speed = 40;

      //向きを設定
      var angle = v.toAngle().toDegree();
      if(angle > 90 && angle < 260){
          this.rotation = angle + 180;
          sprite.scaleX = -1;
      }else{
          this.rotation = angle;
          sprite.scaleX = 1;
      }

      this.vx = Math.cos(angle * Math.PI / 180) * this.speed;
      this.vy = Math.sin(angle * Math.PI / 180) * this.speed;
      
      this.parryFLG = false;
      this.parryPower = 0;

    },

    update: function(){
      this.x += this.vx;
      this.y += this.vy;

      if (this.left < -this.width) {
        this.remove();
      }
      else if (this.right > SCREEN_WIDTH + this.width) {
        this.remove();

      }

      if (this.top < -this.height) {
        this.remove();


      }
      else if (this.bottom > SCREEN_HEIGHT + this.height) {
        this.remove();
      }

      if(this.parryFLG){
        this.hitCheck();
      }


    },

    hitCheck: function(){

      GameMain.enemyGroup.children.each(function(enemy) {


        switch (enemy.mode) {

          case "knockBack":
          
          break;
        
          case "fire":
          

            break;
          
  
          case "attack":
        
            if (this.hitTestElement(enemy)) {

  
                var vx = enemy.vx;
                var vy = enemy.vy;
  
                enemy.kakiin();
  
                var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
                hiteffect.x = enemy.x;
                hiteffect.y = enemy.y;
                hiteffect.setSize(164, 164);
            }
  
            break;
  
          default:
            if (this.hitTestElement(enemy)) {

    

              enemy.damage(this.parryPower);

              SoundManager.play("damage");
  
  
              var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
              hiteffect.x = enemy.x;
              hiteffect.y = enemy.y;
              hiteffect.setSize(200, 200);
  
              
              var hiteffect2 = HitEffect('hit2','hit2SS').addChildTo(GameMain.effectGroup);
              hiteffect2.x = enemy.x;
              hiteffect2.y = enemy.y;
              hiteffect2.setSize(164, 164);
  
          }



            break;
        }
  

      }, this);
  


    },

  });