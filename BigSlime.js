phina.define('BigSlime', {
    superClass: 'Enemy',
  
    init: function() {
      this.superInit();
      this.setSize(250, 250);
      
      this.sprite = Sprite('slime').addChildTo(this.spriteLayer);


      this.hpUI.y = this.height/4;

      this.spriteSS= FrameAnimation('slimeSS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('run');
      this.spriteSS.fit = false;

      this.sprite.setSize(300,300)

      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 15;
     // this.dropRate = 1000;

      this.level = GameMain.enemyLevel;
      //倍率
      this.hpMagnification = 2;
      this.attackMagnification = 1;
      this.expMagnification = 4;
      this.setLevel();

      this.friction = 0.88;
      this.knockBackSpeed  = 80;

      this.weight = 2;


    },
  
    update: function() {

      this.move();

      if (this.y < -this.height) {
        this.remove();
      }
    },


    move :function(){

      this.x += this.knockBackVx;
      this.y += this.knockBackVy;

      this.knockBackVx *= this.friction;
      this.knockBackVy *= this.friction;

      switch (this.mode) {
        case "move":
          //だんだん加速
          if(this.speed < this.maxspeed){
            this.speed *= 1.01;
          }
          this.y -= this.speed;

          break;

        case "knockBack":
          
          this.knockBack();
          break;
          
        default:
          break;
      }

      this.checkScreenArea();


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


    die:function(){
      this.hp = 0;

      this.mode = "die";
      var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
      hiteffect.x = this.x;
      hiteffect.y = this.y;
      hiteffect.setSize(200, 200);
/*
      var coin = Coin(this.x,this.y).addChildTo(GameMain.effectGroup);
      var coin2 = Coin(this.x,this.y).addChildTo(GameMain.effectGroup);
*/
      this.dropCheck();

      var exp = Math.ceil(this.expPoint * ((GameMain.comboUI.expBonus.value /100) + 1));

      GameMain.player.addExp(exp);

      var ExpLabels = DisplayElement().addChildTo(GameMain.effectGroup)
      ExpLabels.x = this.x;
      ExpLabels.y = this.y;
      ExpLabels.scaleX = 0.7;
      ExpLabels.scaleY = 0.7;

      var expValueLabel = Label(exp).addChildTo(ExpLabels);
      expValueLabel.fill = '#00ff7f'; // 色を変更
      expValueLabel.strokeWidth = 8;
      expValueLabel.x = -15;
      expValueLabel.fontSize = 40; // フォントサイズを変更
      expValueLabel.fontFamily = 'def';
      expValueLabel.align = 'left';

      var expLabel = Label('Exp').addChildTo(ExpLabels);
      expLabel.fill = '#00ff7f'; // 色を変更
      expLabel.strokeWidth = 8;
      expLabel.fontSize = 23; // フォントサイズを変更
      expLabel.x = -65;
      expLabel.y =  10;
      expLabel.fontFamily = 'def';

      ExpLabels.tweener.clear()
        .by({y:-200,scaleX:0.5,scaleY:0.5},700,"easeOutCubic")
        .to({alpha:0},500)
        .call(function() {
            ExpLabels.remove();
        }, this)


      var slime =  Slime().addChildTo(GameMain.enemyGroup);
      slime.x = this.x;
      slime.y = this.y;
      slime.damageMove();
      var slime =  Slime().addChildTo(GameMain.enemyGroup);
      slime.x = this.x;
      slime.y = this.y;
      slime.damageMove();
      var slime =  Slime().addChildTo(GameMain.enemyGroup);
      slime.x = this.x;
      slime.y = this.y;
      slime.damageMove();
      var slime =  Slime().addChildTo(GameMain.enemyGroup);
      slime.x = this.x;
      slime.y = this.y;
      slime.damageMove();
      var slime =  Slime().addChildTo(GameMain.enemyGroup);
      slime.x = this.x;
      slime.y = this.y;
      slime.damageMove();

      this.remove();

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

      var knockBackSpeed  = this.knockBackSpeed;

      this.knockBackVx = Math.cos(rot * Math.PI / 180) * knockBackSpeed;
      this.knockBackVy = Math.sin(rot * Math.PI / 180) * knockBackSpeed;

      this.mode = "knockBack";

    },


  });