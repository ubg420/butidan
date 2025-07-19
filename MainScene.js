/*
 * runstant
 */
// main scene
phina.define('MainScene', {
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });
    GameMain = this;

//    localStorage.clear();
    this.backgroundColor = "black";

//debug
   // StartFloor = 1520;

    this.timer = 0;
    this.floor = StartFloor;
    this.enemyLevel = StartFloor;


    this.pointStart;

    this.floorLimitTime = 150;
    this.popSlimeTime = 20;

    this.popSlimeRTime = 100;


    this.tresureCount = 0;

    this.gameoverFLG = false;
    var speed = -32;

    this.slimeType = 1;
    this.slimeRFLG = false;

    this.enemyType = 1;
    this.enemyTypeMin = 0;


    this.comboTimer = 0;
    this.comboRemit = 60;

    this.combo = 0;


    this.popEnemyMax = 1;

   SoundManager.playMusic("Bgm");

    this.backLayer = DisplayElement().addChildTo(this);
    this.afeterGroup = DisplayElement().addChildTo(this);
    this.enemyGroup = DisplayElement().addChildTo(this);

    this.playData = {};


    this.player = Player().addChildTo(this);
    this.player.x = this.gridX.center();
    this.player.y = this.gridY.span(3);

    /*
    this.player.tweener
      .to({y:400},1200,"easeOutCubic")
      .call(function() {
        this.setInteractive(true);
      }, this);
    */


    this.objectGroup = DisplayElement().addChildTo(this);
    this.effectGroup = DisplayElement().addChildTo(this);

    EffectGroup = DisplayElement().addChildTo(this);



    var back_1 = LoopImage("back",speed).addChildTo(this.backLayer);
    back_1.setPosition(this.gridX.center(),this.gridY.center());
    var back_2 = LoopImage("back",speed).addChildTo(this.backLayer);
    back_2.setPosition(this.gridX.center(),this.gridY.center(16));
    var back_3 = LoopImage("back",speed).addChildTo(this.backLayer);
    back_3.setPosition(this.gridX.center(),this.gridY.center(32));

    var speed = -32;
    var wall_1 = LoopImage("wall",speed).addChildTo(this);
    wall_1.setPosition(this.gridX.center(8.3),this.gridY.center());
    var wall_2 = LoopImage("wall",speed).addChildTo(this);
    wall_2.setPosition(this.gridX.center(8.3),this.gridY.center(16));
    var wall_3 = LoopImage("wall",speed).addChildTo(this);
    wall_3.setPosition(this.gridX.center(8.3),this.gridY.center(32));

    var speed = -32;
    var wall_1 = LoopImage("wall",speed).addChildTo(this);
    wall_1.setPosition(this.gridX.center(-8.3),this.gridY.center());
    var wall_2 = LoopImage("wall",speed).addChildTo(this);
    wall_2.setPosition(this.gridX.center(-8.3),this.gridY.center(16));
    var wall_3 = LoopImage("wall",speed).addChildTo(this);
    wall_3.setPosition(this.gridX.center(-8.3),this.gridY.center(32));


    this.UIGroup = DisplayElement().addChildTo(this);
    this.mainUI = MainUI().addChildTo(this.UIGroup);

    this.comboUI = ComboUI().addChildTo(this);
    this.comboUI.setPosition(this.gridX.center(5),this.gridY.center(-5.5));

    this.gameMode = 'play';

    var self = this;

    //debug
    //var encount = Encount(Knight(),250).addChildTo(this.backLayer);




    this.loadData();

  },



  loadData: function(){
    if(localStorage.length > 0){
      this.playData.level = localStorage.getItem("level");
      this.playData.exp = localStorage.getItem("exp");
      this.playData.wepon = localStorage.getItem("weponId");
      this.playData.weponLevel = localStorage.getItem("weponLevel");
      this.playData.shield = localStorage.getItem("shieldId");
      this.playData.shieldLevel = localStorage.getItem("shieldLevel");
      this.playData.gem = localStorage.getItem("gemId");
      this.playData.gemLevel = localStorage.getItem("gemLevel");
      this.playData.maxFloor = localStorage.getItem("maxFloor");



    }

  },

  saveData:function(){
    var level = this.player.level;
    var exp = this.player.exp;
    localStorage.setItem("level",level);
    localStorage.setItem("exp",exp);

    var wepon = this.player.wepon;
    if(wepon !== null){
      localStorage.setItem("weponId",wepon.id);
      localStorage.setItem("weponLevel",wepon.level);
    }


    var shield = this.player.shield;
    if(shield !== null){
      localStorage.setItem("shieldId",shield.id);
      localStorage.setItem("shieldLevel",shield.level);
    }

    var gem = this.player.gem;
    if(gem !== null){
      localStorage.setItem("gemId",gem.id);
      localStorage.setItem("gemLevel",gem.level);
    }

    if(this.playData.maxFloor){
      var maxFloor = parseInt(this.playData.maxFloor);
      if(maxFloor < this.floor){
        localStorage.setItem("maxFloor",this.floor);
      }

    }else{
        localStorage.setItem("maxFloor",this.floor);
    }


    

  },

  moveScene: function(e) {

  },

  onpointstart: function(e) {
    var p = e.pointer;
    var v = Vector2.sub(e.pointer, this.player);
    if(this.player.mode === "normal"){
      this.player.tameStart(p);
      this.pointStartPosition = p;
      this.pointStart = Vector2(p.x,p.y);

 
    }
    
  },

  onpointmove: function(e) {

    if(this.player.mode === "tame"){
      var p = e.pointer;
      //this.player.tame(p);
    }

  },

  onpointend: function(e) {
    var p = e.pointer;
    var v = Vector2.sub(e.pointer, this.player);
    if(this.player.mode === "tame"){    
      this.player.tameCheck(p);
      return;
    }

    if(this.player.mode === "attack"){

      if(this.player.st >= this.player.kaitenStCost){
        this.player.kaiten();
      }else{
        this.player.resetMode();

        var damageLabel = DamageLabel("スタミナぎれ",'yellow').addChildTo(GameMain.effectGroup);
        damageLabel.setPosition(this.player.x,this.player.y);

      }

      return;
    }

  },


  update: function(app) {

    this.timer++;
    if(this.timer > this.floorLimitTime && !this.gameoverFLG){
      this.floorUp();
    }

    switch (this.gameMode) {
      case 'play':
          
        if (this.player.mode === 'attack') {
          var ai = Afterimage().addChildTo(this.afeterGroup);
          ai.setPosition(this.player.x, this.player.y);
          ai.rotation = this.player.rotation;
          ai.scaleX = this.player.sprite.scaleX;
    
        }
    
        if (app.frame % this.popSlimeTime === 0) {
          /*
          var enemy = Slime().addChildTo(this.enemyGroup);
          enemy.x = Math.randint(enemy.width /2, this.gridX.width - enemy.width);
          enemy.y = SCREEN_HEIGHT;
          */
         var encount = Encount(Slime(),"random").addChildTo(this.backLayer);

          var r = Math.floor( Math.random() * this.slimeType);
          switch (r) {
            case 0:

              break;

            case 1:
              var encount = Encount(SlimeB(),"random").addChildTo(this.backLayer);

              break;

            case 2:
              var encount = Encount(SlimeR(),"random").addChildTo(this.backLayer);

              break;
              
            default:
              break;
          }

        }

        if(this.slimeRFLG){
          if (app.frame % this.popSlimeRTime === 0) {
            var encount = Encount(SlimeR(),"random").addChildTo(this.backLayer);
          }
        }

  
        this.hitCheck();
  
        break;
    
      default:
        break;
    }



  },


  floorUp:function(){

    this.timer = 0;
    this.floor++;
    this.mainUI.changeFloor(this.floor);
    this.enemyLevel++;


    if(this.floor >= 5){
      this.enemyType = 2;

    }
    if(this.floor >= 10){

      this.enemyType = 3;
      this.slimeType = 2;

    }
    if(this.floor >= 20){
      this.enemyTypeMin = 2;
      this.enemyType = 4;
    }
    if(this.floor >= 25){
      this.enemyTypeMin = 0;
      this.enemyType = 4;
    }
    if(this.floor >= 30){
      this.enemyType = 5;
    }
    if(this.floor >= 40){
      this.slimeRFLG = true;
    }
    if(this.floor >= 60){
      this.enemyType = 6;
    }
    if(this.floor >= 80){
      this.enemyType = 7;

    }
    if(this.floor >= 100){
      this.enemyType = 8;
    }
    if(this.floor >= 120){
      this.enemyType = 9;
    }
    if(this.floor >= 150){
      this.popEnemyMax = 2;

    }
    if(this.floor >= 250){
      this.popEnemyMax = 3;

    }
    if(this.floor >= 500){
      this.popEnemyMax = 4;
    }

  
    if(this.floor >= 5){

      this.createEnemy();

      if(this.popEnemyMax > 1){
        for (let i = 1; i < this.popEnemyMax; i++) {
           var r = Math.floor( Math.random() * 2);
           if(r==0){
            this.createEnemy();

           }
        }
      }


    }



  },

  createEnemy:function(){

    var r = Math.floor( Math.random() * (this.enemyType  - this.enemyTypeMin)) +this.enemyTypeMin;
    var wave = ENEMYWAVE.wave[r];
    var enemys = wave.enemy;


    for (let i = 0; i < enemys.length; i++) {
      var enemy = enemys[i];
      var posX = enemy.posX;

      switch (enemy.name) {
        case "golem":
          var encount = Encount(Golem(),posX).addChildTo(this.backLayer);
  
          break;
  
        case "night":
          var encount = Encount(Knight(),posX).addChildTo(this.backLayer);
  
          break;  
  
        case "magician":
          var encount = Encount(Magician(),posX).addChildTo(this.backLayer);
  
          break;  
  
        case "slime":
          var encount = Encount(Slime(),posX).addChildTo(this.backLayer);
  
          break;    

        case "slimeB":
        var encount = Encount(SlimeB(),posX).addChildTo(this.backLayer);

        break;    

        case "slimeR":
        var encount = Encount(SlimeR(),posX).addChildTo(this.backLayer);

        break;      

        case "irongolem":
        var encount = Encount(IronGolem(),posX).addChildTo(this.backLayer);

        break;      

        case "bigslime":
        var encount = Encount(BigSlime(),posX).addChildTo(this.backLayer);

        break;      

        case "daimagician":
        var encount = Encount(DaiMagician(),posX).addChildTo(this.backLayer);

        break;      


        case "blacknight":
        var encount = Encount(BlackKnight(),posX).addChildTo(this.backLayer);

        break;      
      
        default:
          break;
      }
      
    }

  },

  parry:function(){

    var hiteffect = HitEffect('parry','hit2SS').addChildTo(GameMain.effectGroup);
    hiteffect.x = this.player.x;
    hiteffect.y = this.player.y;
    hiteffect.setSize(352, 352);

    this.player.damageFLG = true;

    this.player.spriteSS.gotoAndPlay('tame1');



    var parryLabel = DamageLabel("パリィ",'white').addChildTo(GameMain.effectGroup);
    parryLabel.setPosition(this.player.x,this.player.y);
    SoundManager.play("parry");

    this.player.parryFLG = false;
    this.player.tameTimer = this.player.tameAttackLimit

    //パリィの無敵時間を調整
    this.player.damageTimer = 0;

  },


  hitCheck:function(){

    this.enemyGroup.children.each(function(enemy) {


      switch (enemy.mode) {
        case "knockBack":
          
          break;
        
        case "fire":
        
          if (this.player.hitTestElement(enemy)) {
            if(this.player.mode !== "die"){
              if(!this.player.damageFLG){

                if(this.player.parryFLG){

                  enemy.vx *= -1;
                  enemy.vy *= -1;
                  enemy.parryFLG = true;
                  enemy.parryPower = this.player.getAttackPower();

                  this.parry();


                }else{
                  this.player.damage(enemy.attack);

                }
              }
            }
          }

          break;

        case "attack":
      
          if (this.player.hitTestElement(enemy)) {

            if(this.player.mode == "attack" ){

              var vx = enemy.vx;
              var vy = enemy.vy;

              enemy.x += (enemy.vx * -1);
              enemy.y += (enemy.vy * -1);

              enemy.kakiin();
              this.player.vx *= 0.4
              this.player.vy *= 0.4;

              this.player.resetMode();

              var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
              hiteffect.x = enemy.x;
              hiteffect.y = enemy.y;
              hiteffect.setSize(164, 164);

            }
            else if(this.player.mode == "kaiten"){

              var vx = enemy.vx;
              var vy = enemy.vy;

              this.player.vx *= -1;
              this.player.vy *= -1;

              enemy.kakiin();
              
              var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);

              hiteffect.x = enemy.x;
              hiteffect.y = enemy.y;
              hiteffect.setSize(164, 164);

            }
            else if(this.player.mode == "tame"){

              if(!this.player.damageFLG){

                if(this.player.parryFLG){

                  enemy.vx *= -0.2;
                  enemy.vy *= -0.2;
                  enemy.resetMode();
                  this.parry();


                }else{
                  this.player.damage(enemy.attack);

                }

              }

            }
            else if(this.player.mode !== "die"){
              if(!this.player.damageFLG){
                this.player.damage(enemy.attack);
              }
            }
          }

          break;

        default:

          if (this.player.hitTestElement(enemy)) {
            if (this.player.mode === 'attack') {

              this.player.changeSt(this.player.hitCureSt);
              var attackPower = this.player.getAttackPower();
              enemy.damage(attackPower * 1.5);

              SoundManager.play("damage");


              var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
              hiteffect.x = enemy.x;
              hiteffect.y = enemy.y;
              hiteffect.setSize(200, 200);

              
              var hiteffect2 = HitEffect('hit2','hit2SS').addChildTo(GameMain.effectGroup);
              hiteffect2.x = enemy.x;
              hiteffect2.y = enemy.y;
              hiteffect2.setSize(164, 164);

              if(enemy.weight > 1){
                this.player.vx *= -0.3;
                this.player.vy *= -0.3;
                this.player.resetMode();
              }
            }
            else if(this.player.mode === 'kaiten'){
              this.player.changeSt(this.player.hitCureSt);

              SoundManager.play("damage");

              var attackPower = this.player.getAttackPower();
              enemy.damage(attackPower * 1.3);

              var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
              hiteffect.x = enemy.x;
              hiteffect.y = enemy.y;
              hiteffect.setSize(280, 280);


              var hiteffect2 = HitEffect('hit2','hit2SS').addChildTo(GameMain.effectGroup);
              hiteffect2.x = enemy.x;
              hiteffect2.y = enemy.y;
              hiteffect2.setSize(280, 280);


              if(enemy.weight > 1){
                this.player.vx *= -0.9;
                this.player.vy *= -0.9;
              }

            }
            else if(this.player.mode === 'die'){

            }
            else {

              if(enemy.type == "golem" && this.player.parryFLG){
                enemy.vx *= -0.5;
                enemy.vy *= -0.5;

                this.parry();

              }else{
                if(!this.player.damageFLG){
                  this.player.damage(enemy.attack);
                }
              }


            }

          }

          break;
      }

      if(enemy.mode !== "knockBack"){

      }
    }, this);


    this.objectGroup.children.each(function(obj) {

      if(obj.tag == "treasure"){

        if (this.player.hitTestElement(obj)) {
          var x = obj.x;
          var y = obj.y;
          var rotation = obj.rotation;

          obj.remove();

          this.tresureCount++;
          this.app.pushScene(ItemScene(x,y,rotation));   
        }

      }
    }, this);
  },

  gameover: function() {
    this.app.pushScene(ResultScene());
  },
});

phina.define('Afterimage', {
  superClass: 'Sprite',

  init: function() {
    this.superInit('hero');


    this.heroSS= FrameAnimation('hero_SS')
    this.heroSS.attachTo(this);
    this.heroSS.gotoAndPlay('attack');
    this.heroSS.fit = false;
    this.setSize(158, 158);


    this.tweener
      .fadeOut(256)
      .call(function() {
        this.remove();
      }, this);
  },
});


phina.define("LoopImage", {
  superClass: "phina.display.Sprite",
  init: function(texture,speed) {
    this.superInit(texture);

      this.vy = speed;

      this.harfheight = this.height / 2;

  },

  update: function(app) {

    this.y += this.vy;


    if(this.y < -this.harfheight){
      this.y = this.height * 3 + -this.harfheight + this.vy;
    }


  },


});



phina.define('Crash', {
  superClass: 'DisplayElement',

  init: function() {
    this.superInit();

    this.l = Sprite('sryim').addChildTo(this);
    this.l.setFrameIndex(0, this.l.width/2, this.l.height);
    this.l.width/=2;
    this.l.originX = 1;
    this.l.tweener
      .by({
        x: -20,
        alpha: -1,
      }, 250)

    this.r = Sprite('sryim').addChildTo(this);
    this.r.setFrameIndex(1, this.r.width/2, this.r.height);
    this.r.width/=2;
    this.r.originX = 0;
    this.r.tweener
      .by({
        x: 20,
        alpha: -1,
      }, 250)


    this.tweener
      .wait(500)
      .call(function() {
        this.remove();
      }, this);
  },
})

phina.define('Locus', {
  superClass: 'CircleShape',

  init: function() {
    this.superInit({
      stroke: false,
      fill: 'white',
    });

    this.tweener.to({
      scaleX: 0.2,
      scaleY: 0.2,
      alpha: 0,
    }).call(function() {
      this.remove();
    }, this);
  },
  update: function() {
    this.y -= 10;
  },
});

