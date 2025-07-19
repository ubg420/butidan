phina.define('Enemy', {
    superClass: 'DisplayElement',
  
    init: function() {
      this.superInit();
      this.setSize(80, 80);



      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 10;

      //能力基本値
      this.defaultHp = 5;
      this.defaultAttack = 1.5;
      this.defaultDiffence = 1.5;

      //倍率
      this.hpMagnification = 1;
      this.attackMagnification = 1;
      this.diffenceMagnification = 1;
      this.expMagnification = 1;

      this.type = "enemy";

      this.maxHp = 5;
      this.hp = this.maxHp;
      this.attack = 2;
      this.diffence = 2;
      this.weight = 1;
      this.expPoint = 1;

      this.defaultExp = 1;

      this.status = 'live';

      this.spriteLayer = DisplayElement().addChildTo(this);

      this.hpUI = DisplayElement().addChildTo(this);
      this.hpUI.alpha = 0;

      this.maxHpWidth = 100;

      this.hpGauge = RectangleShape().addChildTo(this.hpUI);
      this.hpGauge.width = this.maxHpWidth;
      this.hpGauge.height =  10;
      this.hpGauge.y = 70;
      this.hpGauge.x = -60;
      this.hpGauge.alpha = 1; //コリジョン可視化 = 1
      this.hpGauge.fill = "red";
      this.hpGauge.stroke = 'white';
      this.hpGauge.strokeWidth = 5;  
      this.hpGauge.cornerRadius = 1;  
      this.hpGauge.origin.set(0,0.5);

      this.hpValueGauge = RectangleShape().addChildTo(this.hpGauge);
      this.hpValueGauge.width = this.maxHpWidth;
      this.hpValueGauge.height =  10;
      this.hpValueGauge.alpha = 1; //コリジョン可視化 = 1
      this.hpValueGauge.fill = "limegreen";
      this.hpValueGauge.stroke = 'white';
      this.hpValueGauge.strokeWidth =  0;  
      this.hpValueGauge.cornerRadius = 1;  
      this.hpValueGauge.origin.set(0,0.5);


      this.mode = "move";

      this.maxspeed = 14;
      this.speed = this.maxspeed;

      this.knockBackTimer = 0;
      this.knockBackRemit = 3;
      this.knockBackVy = 0;
      this.knockBackVx = 0;

      this.friction = 0.8;

    },


    
      //TODO 敵つよさ設定
      //基本HP 基本攻撃力を設定
      //敵のレベルがあがると基本値があがる
      //各敵によって能力の倍率が変わる
      //基本値 ×　能力倍率　＝　ステータス
      //例　(HP10 * LEVEL2) * 倍率1.5 = 30HP
    setLevel: function(playerAttackPower) {

      this.level = GameMain.enemyLevel;

      this.maxHp = Math.floor((this.defaultHp * this.level) * this.hpMagnification);
      this.hp = this.maxHp;
      this.attack = Math.floor((this.defaultAttack * this.level) * this.attackMagnification);
      this.diffence = Math.floor((this.defaultDiffence * this.level) * this.diffenceMagnification);
      this.expPoint = Math.floor((this.defaultExp * this.level) * this.expMagnification);

    },
  


    damage: function(playerAttackPower) {

      var randamDamage= Math.floor( Math.random() * 5 ) + 100;
      var damageValue =  Math.round(playerAttackPower * (randamDamage /100));
//      var damageValue =  Math.round( ((playerAttackPower /2) - (this.diffence /4)) * (randamDamage /156));
 //      var damageValue =  Math.round(playerAttackPower * (randamDamage /156));
    //  var damageValue =  Math.round( ((playerAttackPower /2) - (this.diffence /4)));


      this.hp -= damageValue;
      if(this.hp <= 0){
        this.hp = 0;
      }
      this.changeHp();

      this.hpUI.tweener.clear()
      .to({alpha:1},1)
      .wait(1500)
      .to({alpha:0},200)

      //ダメージ表示
      var damageLabel = DamageLabel(damageValue).addChildTo(GameMain.effectGroup);
      damageLabel.setPosition(this.x,this.y);


      GameMain.comboUI.addCombo();

      this.damageMove();
      
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

      this.remove();

    },


    dropCheck: function(){

      var rand = Math.floor( Math.random() * 1000);

      var rate = Math.ceil(this.dropRate * ((GameMain.comboUI.itemBonus.value /100) + 1));

      if(rand < rate){

        var treasure = Treasure(this.x,this.y).addChildTo(GameMain.objectGroup);

      } 


    },

    changeHp:function(){
  
      var hpWidth = (this.hp/this.maxHp) * this.maxHpWidth;
      this.hpValueGauge.width = hpWidth;

    }


  });