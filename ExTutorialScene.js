/*
 * runstant
 */

// main scene

var ExTutorialScene;

phina.define('ExTutorialScene', {
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });
    ExTutorialScene = this;

    this.backgroundColor = "black";

    this.timer = 0;
    this.floor = 1;

    this.backLayer = DisplayElement().addChildTo(this);
    this.afeterGroup = DisplayElement().addChildTo(this);
    this.enemyGroup = DisplayElement().addChildTo(this);



    this.player = ExTutorialPlayer().addChildTo(this);
    this.player.setPosition(this.gridX.center(),this.gridY.center(-4));

    this.yubi = Sprite('yubi').addChildTo(this);
    this.yubi.origin.set(1,0.5);

    this.yubi.setSize(188, 158);
    this.yubi.setPosition(this.gridX.center(5),this.gridY.center(2));
    this.yubi.rotation = -90;
    this.yubi.alpha = 0;
    this.yubi.scaleX = 3;
    this.yubi.scaleY = 3;

    this.tutorialLabel = Label('EXチュートリアル').addChildTo(this);
    this.tutorialLabel.fill = '#FFFFFF'; // 色を変更
    this.tutorialLabel.fontSize = 45; // フォントサイズを変更
    this.tutorialLabel.fontFamily = 'def';
    this.tutorialLabel.x = -370;
    this.tutorialLabel.y = 20;
    this.tutorialLabel.setPosition(this.gridX.center(),this.gridY.center(-7));

    this.lessonLabel = Label('').addChildTo(this);
    this.lessonLabel.fill = '#FFFFFF'; // 色を変更
    this.lessonLabel.fontSize = 55; // フォントサイズを変更
    this.lessonLabel.fontFamily = 'def';
    this.lessonLabel.x = -370;
    this.lessonLabel.y = 20;
    this.lessonLabel.setPosition(this.gridX.center(),this.gridY.center(-6));


    this.setumei = Label('').addChildTo(this);
    this.setumei.fill = '#FFFFFF'; // 色を変更
    this.setumei.fontSize = 60; // フォントサイズを変更
    this.setumei.fontFamily = 'def';

    this.objectGroup = DisplayElement().addChildTo(this);
    this.effectGroup = DisplayElement().addChildTo(this);

    var speed = -32;
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

    this.slimeType = 1;
    this.enemyType = 3;



    this.combo = 0;



    this.comboTimer = 0;
    this.comboRemit = 60;
    

    this.gameMode = 'play';


    var self = this;

    this.enemyLevel = 1;


    this.kaitenHitAcceleration = 1.3;

    /*

    var enemy = Golem().addChildTo(this.enemyGroup);
    enemy.x = Math.randint(enemy.width /2, this.gridX.width - enemy.width);
    enemy.y = SCREEN_HEIGHT;

    
    var magician = Magician().addChildTo(this.enemyGroup);
    magician.x = Math.randint(magician.width /2, this.gridX.width - magician.width);
    magician.y = SCREEN_HEIGHT
    magician.warp();

    
    var knight = Knight().addChildTo(this.enemyGroup);
    knight.x = Math.randint(knight.width /2, this.gridX.width - knight.width);
    knight.y = SCREEN_HEIGHT;

      */  

     this.okButton = DisplayElement().addChildTo(this);
     this.okButton.setPosition(this.gridX.center(12),this.gridY.center(6.3));
 
     this.okButton.window = Sprite('window_yoko').addChildTo(this.okButton);
     this.okButton.window.setSize(258, 128);
     this.okButton.setSize(258, 128);
     this.okButton.setInteractive(true);



  

     this.okButton.label = Label('OK').addChildTo(this.okButton);
     this.okButton.label.fill = 'limegreen'; // 色を変更
     this.okButton.label.fontSize = 55; // フォントサイズを変更
     this.okButton.label.y = -5;
     this.okButton.label.fontFamily = 'def';

    this.lesson = 1;
     
     this.okButton.onpointend = function(e) {
      self.lesson++;
      self.resetLesson();
      self.okFLG = false;
      self.okButton.setPosition(self.gridX.center(12),self.gridY.center(6.3));
      self.tweener.clear();


      if(self.lesson == 2){
        self.player.remove();
        self.enemyGroup.children.clear();
        self.lesson2();
      }
      else if(self.lesson == 3){
        self.endScene();

      }
      else if(self.lesson == 4){

      }

    };



    this.pointStart;

    this.floorLimitTime = 300;
    this.popSlimeTime = 20;

    this.okFLG = false;

    this.lesson1();
   // this.startScene();


  },


  lesson1:function(){

    var self = this;
    
    this.player.setPosition(this.gridX.center(),this.gridY.center(-4));
    this.player.resetMode();
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.friction = 0.995;


    this.magician = TutorialMagician().addChildTo(this.enemyGroup);
    this.magician.setPosition(this.gridX.center(),this.gridY.center(3));


    this.yubi.setPosition(this.gridX.center(4),this.gridY.center(2));
    this.yubi.rotation = -90;
    this.yubi.alpha = 0;
    this.yubi.scaleX = 3;
    this.yubi.scaleY = 3;

    this.lessonLabel.text = "パリィ";

    this.setumei.text = 'こうげきがあたるしゅんかん\nかまえるとパリィ';
    this.setumei.setPosition(this.gridX.center(),this.gridY.center(4.5));

    this.tweener.clear()
    .wait(4300)
    .call(function() {

      if(!this.okFLG){
        this.okFLG = true;
        this.okButton.tweener.clear()
        .to({x:self.gridX.center(),},500,"easeOutCubic")
        .call(function() {

        }, this)

      }

    }, this)
    .wait(1000)
    .call(function() {
      self.lesson1();

    }, this)

    ;

  },

  lesson2:function(){

    var self = this;





    this.setumei.text = 'スライムや こうげきしてない\nてきはパリィできない';
    this.setumei.setPosition(this.gridX.center(),this.gridY.center(4.5));


    var lessonLabel = Label('パリイできる').addChildTo(this);

    lessonLabel.fill = '#FFFFFF'; // 色を変更
    lessonLabel.fontSize = 55; // フォントサイズを変更
    lessonLabel.fontFamily = 'def';
    lessonLabel.x = -370;
    lessonLabel.y = 20;
    lessonLabel.setPosition(this.gridX.center(),this.gridY.center(-4.5));


    var sprite = Sprite('fireball').addChildTo(this);
    var spriteSS= FrameAnimation('fireballSS')
    spriteSS.attachTo(sprite);
    spriteSS.gotoAndPlay('run');
    spriteSS.fit = false;
    sprite.setSize(150,150)
    sprite.setPosition(this.gridX.center(-3),this.gridY.center(-3));



    var sprite = Sprite('golem').addChildTo(this);
    var spriteSS= FrameAnimation('golemSS')
    spriteSS.attachTo(sprite);
    spriteSS.gotoAndPlay('run');
    spriteSS.fit = false;
    sprite.setSize(120,120)
    sprite.setPosition(this.gridX.center(),this.gridY.center(-3));


    var wepon = Sprite('sord').addChildTo(this);
    wepon.setSize(140,140)
    wepon.rotation = 90;
    wepon.setPosition(this.gridX.center(5),this.gridY.center(-3));
    var sprite = Sprite('knight').addChildTo(this);
    var spriteSS= FrameAnimation('knightSS')
    spriteSS.attachTo(sprite);
    spriteSS.gotoAndPlay('attack');
    spriteSS.fit = false;
    sprite.setSize(160,160)
    sprite.setPosition(this.gridX.center(3),this.gridY.center(-3));




    var lessonLabel = Label('パリイできない').addChildTo(this);

    lessonLabel.fill = '#FFFFFF'; // 色を変更
    lessonLabel.fontSize = 55; // フォントサイズを変更
    lessonLabel.fontFamily = 'def';
    lessonLabel.x = -370;
    lessonLabel.y = 20;
    lessonLabel.setPosition(this.gridX.center(),this.gridY.center(-0.5));


    var sprite = Sprite('slime').addChildTo(this);
    var spriteSS= FrameAnimation('slimeSS')
    spriteSS.attachTo(sprite);
    spriteSS.gotoAndPlay('run');
    spriteSS.fit = false;
    sprite.setSize(120,120)
    sprite.setPosition(this.gridX.center(-3),this.gridY.center(1));

    var sprite = Sprite('magician').addChildTo(this);
    var spriteSS= FrameAnimation('magicianSS')
    spriteSS.attachTo(sprite);
    spriteSS.gotoAndPlay('run');
    spriteSS.fit = false;
    sprite.setSize(160,160)
    sprite.setPosition(this.gridX.center(),this.gridY.center(1));

    
    var sprite = Sprite('knight').addChildTo(this);
    var spriteSS= FrameAnimation('knightSS')
    spriteSS.attachTo(sprite);
    spriteSS.gotoAndPlay('run');
    spriteSS.fit = false;
    sprite.setSize(160,160)
    sprite.setPosition(this.gridX.center(3),this.gridY.center(1));


    
    
    this.tweener.clear()
    .wait(1600)
    .call(function() {

      if(!this.okFLG){
        this.okFLG = true;
        this.okButton.tweener.clear()
        .to({x:self.gridX.center(),},500,"easeOutCubic")
        .call(function() {

        }, this)

      }

    }, this)
    .wait(1000)
    .call(function() {

    }, this)

    ;

  },

  
  parry:function(){

    this.player.mode="tame";

    var v = Vector2(this.magician.x,this.magician.y);
    
    this.player.tame(v);
   
    var hiteffect = HitEffect('parry','hit2SS').addChildTo(ExTutorialScene.effectGroup);
    hiteffect.x = this.player.x;
    hiteffect.y = this.player.y;
    hiteffect.setSize(352, 352);

    this.player.damageFLG = true;

    this.player.spriteSS.gotoAndPlay('tame1');

    var parryLabel = DamageLabel("パリィ",'white').addChildTo(ExTutorialScene.effectGroup);
    parryLabel.setPosition(this.player.x,this.player.y);
    SoundManager.play("parry");

    this.player.parryFLG = false;
    this.player.tameTimer = this.player.tameAttackLimit

    //パリィの無敵時間を調整
    this.player.damageTimer = 0;

  },


  resetLesson:function(){

    this.yubi.tweener.clear();
    this.setumei.tweener.clear();




    this.setumei.text = "";
    
    this.yubi.alpha = 0;
    this.player.setPosition(this.gridX.center(),this.gridY.center(-4));
    this.player.resetMode();
    this.player.vx = 0;
    this.player.vy = 0;


  },

  startScene:function(){

    var startLabel;
    var self = this;

    startLabel = Label('EXチュートリアル').addChildTo(this);
    startLabel.fill = '#FFFFFF'; // 色を変更
    startLabel.fontSize = 85; // フォントサイズを変更
    startLabel.fontFamily = 'def';
    startLabel.setPosition(this.gridX.center(),this.gridY.center(-2));
    startLabel.scaleX = 0;
    startLabel.scaleY = 0;

    startLabel.tweener.clear()
    .to({scaleX:1,scaleY:1,alpha:1},800,"easeOutBack")
    .wait(500)
    .to({y:-1000},800,"easeInCubic")
    .call(function(){
      self.lesson1();
      startLabel.remove;
    })
    ;


  },


  endScene:function(){
    localStorage.setItem("ExTutorialFLG1","true");
    this.exit();

  },

  update: function(app) {

    if (this.player.mode === 'attack') {
      var ai = MagicianAfterimage().addChildTo(this.afeterGroup);
      ai.setPosition(this.player.x, this.player.y);
      ai.rotation = this.player.rotation;
      ai.scaleX = this.player.sprite.scaleX;

    }


  },


});


phina.define('ExTutorialPlayer', {
  superClass: 'DisplayElement',
  
  init: function() {
      this.superInit();
      this.index = 1;
      this.vx = 0;
      this.vy = 0;
      this.setSize(30,30);
  
      this.mode = 'normal';
  
      this.defalutHp = 10;
      this.defalutStr = 3;
  
      this.defalutDef = 1;
  

      
      //this.friction  = 0.995;
     // this.friction  = 0.998;
  
  
      //this.friction  = 0.99;
  
      this.friction  = 0.98;
  
      this.wepon = null;
      this.shield = null;
      this.gem = null;
  
      this.kaitenTime = 600;
  
      this.tameAttackLimit = 30;
      
  
  
      this.weponSprite = Sprite('sord').addChildTo(this);
      this.weponSprite.setSize(158, 158);
      this.weponSprite.x = 54;
      this.weponSprite.origin.set(0.5,0.9);
  
      var _wepon = Item(ITEMDATA[0],1);
  
  
  
  
      this.sprite = Sprite('hero').addChildTo(this);
      this.spriteSS= FrameAnimation('hero_SS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('fall');
      this.spriteSS.fit = false;
      this.sprite.setSize(158, 158);
  

      
  
  
      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1
  
  
      this.attackSpeed = 45;

  
  
      this.damageFLG = false;
      //ダメージ無敵時間上限
      this.damageMutekiRemit = 30;
      this.damageTimer = 0;
  
      this.tameTimer = 0;
  
  
      this.TAMELIMIT = 5;


      this.mode = "default";

      this.vx = 0;
      this.vy = 0;
  
  },
  
  update: function(app) {

    switch (this.mode) {
      case "tame":

        var p = app.pointer;


        this.tame(p);

        break;


    
      default:
        break;
    }
    this.move();


  },


  
  move:function(app){
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.friction ;
    this.vy *= this.friction ;

    if (this.left < 0 && this.vx < 0) {
        this.left = 0;
        this.vx *= -1;

        this.rightFacing();

        this.hitWall();

    }
    else if (this.right > SCREEN_WIDTH && this.vx > 0) {
        this.right = SCREEN_WIDTH;
        this.vx *= -1;

        this.leftFacing();

        this.hitWall();
    }

    if (this.top < 0 && this.vy < 0) {
        this.top = 0;
        this.vy *= -1;

        this.hitWall();
    }
    else if (this.bottom > SCREEN_HEIGHT && this.vy > 0) {
        this.bottom = SCREEN_HEIGHT;
        this.vy *= -1;

        this.hitWall();

    }
},

  hitWall:function(){

      if(this.mode == "attack"){
          this.resetMode();
      }

      var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
      hiteffect.x = this.x;
      hiteffect.y = this.y;

  },

  
  resetMode:function(){
    this.weponSprite.tweener.clear();


    if(this.mode==="kaiten"){
        this.kaitenEffect.remove();
        this.tweener.clear();
    }


    this.mode = 'normal';
    this.spriteSS.gotoAndPlay('fall');
    this.rotation = 0;

    this.weponSprite.rotation = 0;
    if(this.sprite.scaleX > 0){
        this.weponSprite.x = 54;

    }else{
        this.weponSprite.x = -54;        

    }


  },




  tameStart: function() {
      this.mode = "tame";
    SoundManager.play("syu");


      var r = 1;
      if(this.sprite.scaleX < 0){
          r  = -1;
      }
      
    
      var hiteffect = HitEffect('slash','slashSS').addChildTo(this);
      hiteffect.x =100 *r;
      hiteffect.scaleX = r;
      hiteffect.y = -40;
  
      hiteffect.setSize(150,150)
  


  },

  tame: function(p) {
    this.setRotation(p);
    this.spriteSS.gotoAndPlay('attack');

  },


  setRotation:function(p){

    var v = Vector2.sub(ExTutorialScene.magician, this);

    var angle = v.toAngle().toDegree();

    if(angle > 90 && angle < 260){
        this.rotation = angle + 180;
        this.leftFacing();

    }else{
        this.rotation = angle;
        this.rightFacing();
    }



  },


  tameAttack: function(p) {

    this.mode = "kaiten";
    this.spriteSS.gotoAndPlay('attack');

    SoundManager.play("daikaiten");



    this.kaitenEffect = Sprite('kaiten').addChildTo(this);
    this.kaitenEffect.setSize(350, 350);

    var kaitenTime = 2200;

    var self = this;
    this.kaitenEffect.tweener.clear()
    .to({
        rotation:kaitenTime /2,
    },kaitenTime)
    .call(function() {
        this.kaitenEffect.remove();
    }, this)
    ;

    this.tweener.clear()
    .by({
        rotation:kaitenTime,
    },kaitenTime)
    .call(function() {
        this.resetMode();
    }, this)
    ;





    var v = Vector2.sub(ExTutorialScene.yubi, this);
    this.weponSprite.tweener.clear();
    var angle = v.toAngle().toDegree();



    //進行方向の設定
    /*
    this.dx = this.x - p.x;
    this.dy = this.y - p.y;
    this.vx = -(this.dx / 20);
    this.vy = -(this.dy / 20);
    */

    this.vx = Math.cos(angle * Math.PI / 180) * (this.attackSpeed * 1.5);
    this.vy = Math.sin(angle * Math.PI / 180) * (this.attackSpeed * 1.5);

    var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
    hiteffect.x = this.x;
    hiteffect.y = this.y;
    hiteffect.setSize(150,150)



    

    /*
    var self = this;
    this.tweener.clear()
    .wait(500)
    .wait(100)
    .call(function() {
        self.resetMode();

    }, this)
    ;
    */
},




  //左向き
  leftFacing:function(){
      this.sprite.scaleX = -1;
      this.weponSprite.scaleX = -1;

      this.weponSprite.x = -54;

      if(this.mode == "tame" || this.mode == "kaiten" || this.mode == "attack"){
          this.weponSprite.rotation = -90;
      }

  },

  //右向き
  rightFacing:function(){
      this.sprite.scaleX = 1;
      this.weponSprite.scaleX = 1;

      this.weponSprite.x = 54;


      if(this.mode == "tame" || this.mode == "kaiten" || this.mode == "attack"){
          this.weponSprite.rotation = 90;
      }

  },

  attack: function(p) {

    SoundManager.play("attack");

    var v = Vector2.sub(ExTutorialScene.yubi, this);

    this.weponSprite.tweener.clear();

    //向きを設定
    var angle = v.toAngle().toDegree();
    if(angle > 90 && angle < 260){
        this.rotation = angle + 180;
        this.sprite.scaleX = -1;

        this.weponSprite.scaleX = -1;
        this.weponSprite.rotation = -90;
        this.weponSprite.x = -54;

    }else{
        this.rotation = angle;
        this.sprite.scaleX = 1;

        this.weponSprite.scaleX = 1;
        this.weponSprite.rotation = 90;
        this.weponSprite.x = 54;

    }

    this.vx = Math.cos(angle * Math.PI / 180) * this.attackSpeed;
    this.vy = Math.sin(angle * Math.PI / 180) * this.attackSpeed;

    this.mode = 'attack';
    this.spriteSS.gotoAndPlay('attack');


    var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
    hiteffect.x = this.x;
    hiteffect.y = this.y;
    hiteffect.setSize(150,150)


},

attack2: function(p) {

      SoundManager.play("attack");


  var v = Vector2.sub(p, this);

  this.weponSprite.tweener.clear();

  //向きを設定
  var angle = v.toAngle().toDegree();
  if(angle > 90 && angle < 260){
      this.rotation = angle + 180;
      this.sprite.scaleX = -1;

      this.weponSprite.scaleX = -1;
      this.weponSprite.rotation = -90;
      this.weponSprite.x = -54;

  }else{
      this.rotation = angle;
      this.sprite.scaleX = 1;

      this.weponSprite.scaleX = 1;
      this.weponSprite.rotation = 90;
      this.weponSprite.x = 54;

  }

  this.vx = Math.cos(angle * Math.PI / 180) * this.attackSpeed;
  this.vy = Math.sin(angle * Math.PI / 180) * this.attackSpeed;

  this.mode = 'attack';
  this.spriteSS.gotoAndPlay('attack');


  var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
  hiteffect.x = this.x;
  hiteffect.y = this.y;
  hiteffect.setSize(150,150)


},





kaiten: function(p){


    SoundManager.play("kaiten");

  if(p){
    var v = Vector2.sub(this, this);

    //向きを設定
    var angle = v.toAngle().toDegree();
    if(angle > 90 && angle < 260){
        this.rotation = angle + 180;
        this.sprite.scaleX = -1;

        this.weponSprite.scaleX = -1;
        this.weponSprite.rotation = -90;
        this.weponSprite.x = -54;

    }else{
        this.rotation = angle;
        this.sprite.scaleX = 1;

        this.weponSprite.scaleX = 1;
        this.weponSprite.rotation = 90;
        this.weponSprite.x = 54;

    }

  }




  //this.spriteSS.gotoAndPlay('attack');


  this.spriteSS.gotoAndPlay('attack');


  this.mode = "kaiten";


  this.kaitenEffect = Sprite('kaiten2').addChildTo(this);
  this.kaitenEffect.setSize(350, 350);

  var kaitenTime = this.kaitenTime;
  var self = this;
  this.kaitenEffect.tweener.clear()
  .to({
      rotation:kaitenTime /2,
  },kaitenTime)
  .call(function() {
      this.kaitenEffect.remove();
  }, this)
  ;

  this.tweener.clear()
  .by({
      rotation:kaitenTime,
  },kaitenTime)
  .call(function() {
      this.resetMode();
  }, this)
  ;


},


  
  
  
  });


phina.define('TutorialMagician', {
  superClass: 'DisplayElement',

  init: function() {
    this.superInit();
    this.setSize(80, 80);
    
    this.sprite = Sprite('magician').addChildTo(this);
    this.spriteSS= FrameAnimation('magicianSS')
    this.spriteSS.attachTo(this.sprite);
    this.spriteSS.gotoAndPlay('run');
    this.spriteSS.fit = false;

    this.sprite.setSize(160,160)

    this.colision = RectangleShape().addChildTo(this);
    this.colision.width = this.width;
    this.colision.height = this.height;
    this.colision.alpha = 0; //コリジョン可視化 = 1


    this.weight = 1;
    this.timer = 0;

    this.shotRemit =40;
    this.shotTimer = this.shotRemit;

    this.nextShotRemit = 50;
    this.nextShotTimer = this.nextShotRemit;

    

    this.mode = "move";


  },

  update: function() {

    this.move();

    if (this.y < -this.height) {
      this.remove();
    }
  },

  shot :function(){
    this.tameFire.remove();
    var fireball = TutorialFireBall(this.x,this.y,this.attack).addChildTo(ExTutorialScene.enemyGroup);
    this.mode = "move";

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
       this.mode = "move";
       this.spriteSS.gotoAndPlay('run');

       this.tweener.clear()
       .by({y:20},1000)
       .by({y:-20},1000)
       .setLoop(1);


    }, this)
    ;

  },
  
  damage :function(){
    this.remove();
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

      var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
      hiteffect.x = this.x;
      hiteffect.y = this.y;
      hiteffect.setSize(50, 50);

    }
    else if (this.right > SCREEN_WIDTH) {
        this.right = SCREEN_WIDTH;
        this.knockBackVx *= -1;

        var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
        hiteffect.x = this.x;
        hiteffect.y = this.y;
        hiteffect.setSize(50, 50);

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


phina.define('TutorialFireBall', {
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

    var v = Vector2.sub(ExTutorialScene.player, this);

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

    this.hitCheck();


  },

  hitCheck: function(){

    if(!this.parryFLG){

      if (this.hitTestElement(ExTutorialScene.player)) {
        this.parryFLG = true;
        this.vx *= -1;
        this.vy *= -1;

        ExTutorialScene.parry()

      }
  
    }else if(this.parryFLG){

      ExTutorialScene.enemyGroup.children.each(function(enemy) {

        switch (enemy.mode) {
  
          case "knockBack":
          
          break;
        
          case "fire":
          

            break;

  
          default:
            if (this.hitTestElement(enemy)) {
  
              
  
              enemy.damage(this.parryPower);
  
              SoundManager.play("damage");
  
  
              var hiteffect = HitEffect('hit','hitSS').addChildTo(ExTutorialScene.effectGroup);
              hiteffect.x = enemy.x;
              hiteffect.y = enemy.y;
              hiteffect.setSize(200, 200);
  
              
              var hiteffect2 = HitEffect('hit2','hit2SS').addChildTo(ExTutorialScene.effectGroup);
              hiteffect2.x = enemy.x;
              hiteffect2.y = enemy.y;
              hiteffect2.setSize(164, 164);
  
          }
  
  
  
            break;
        }
  
  
      }, this);
  
  



    }






  },



});