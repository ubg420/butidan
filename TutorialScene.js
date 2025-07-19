/*
 * runstant
 */

// main scene

var TutorialScene;

phina.define('TutorialScene', {
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });
    TutorialScene = this;

    this.backgroundColor = "black";

    this.timer = 0;
    this.floor = 1;

    this.backLayer = DisplayElement().addChildTo(this);
    this.afeterGroup = DisplayElement().addChildTo(this);
    this.enemyGroup = DisplayElement().addChildTo(this);


  
    this.player = TutorialPlayer().addChildTo(this);
    this.player.setPosition(this.gridX.center(),this.gridY.center(-4));




    
    this.yubi = Sprite('yubi').addChildTo(this);
    this.yubi.origin.set(1,0.5);

    this.yubi.setSize(188, 158);
    this.yubi.setPosition(this.gridX.center(5),this.gridY.center(2));
    this.yubi.rotation = -90;
    this.yubi.alpha = 0;
    this.yubi.scaleX = 3;
    this.yubi.scaleY = 3;


    this.tutorialLabel = Label('チュートリアル').addChildTo(this);
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


      if(self.lesson == 2){
        self.lesson2();
      }
      else if(self.lesson == 3){
        self.lesson3();

      }
      else if(self.lesson == 4){

        self.endScene();
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


    this.yubi.setPosition(this.gridX.center(4),this.gridY.center(2));
    this.yubi.rotation = -90;
    this.yubi.alpha = 0;
    this.yubi.scaleX = 3;
    this.yubi.scaleY = 3;


    this.lessonLabel.text = "アタック";

    this.setumei.text = 'タッチしてるところをねらう';
    this.setumei.setPosition(this.gridX.center(),this.gridY.center(4.5));


    this.yubi.tweener.clear()
    .wait(600)
    .to({scaleX:1,scaleY:1,alpha:1},200,"easeInCubic")
    .call(function() {


      var shape = CircleShape().addChildTo(TutorialScene.backLayer);
      // 位置を指定
      shape.setPosition(self.yubi.x -20, self.yubi.y -20);
      shape.fill = 'rgba(0,0,0,0)';
      shape.stroke = 'white';
      shape.scaleX = 0;
      shape.scaleY = 0;

      shape.strokeWidth = 15;
      shape.radius  = 70;
      shape.tweener
      .clear()
      .to({alpha:0,scaleX:2,scaleY:2}, 400,"easeOutCubic")
      .to({alpha:0}, 100,"easeOutQuint")
      .call(function(){
        shape.remove();
      })



      self.player.tameStart();
    })
    .to({y:550,x:100,rotation:-120},1100,"easeInCubic")
    .to({y:550,x:800,rotation:-80},1100,"easeInCubic")
    .to({y:850,x:200,rotation:-110},1100,"easeInCubic")
    .to({y:850,x:700,rotation:-80},1100,"easeInCubic")


    .wait(500)
    .call(function() {
     // self.setumei.text = 'はなすと、とつげきします';
     // self.setumei.tweener = 'はなすと、とつげきします';
      self.setumei.tweener.clear()
      .to({scaleX:1,scaleY:0,alpha:1},200,"easeInCubic")
      .call(function() {
        self.setumei.text ='はなすとアタックするぞ';
      })
      .to({scaleX:1,scaleY:1,alpha:1},200,"easeInCubic")
      ;


    }, this)
    .wait(1000)
    .to({scaleX:3,scaleY:3,alpha:0},200,"easeInCubic")
    .call(function() {
      self.player.attack();

    }, this)
    .wait(2000)
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

    this.player.setPosition(this.gridX.center(),this.gridY.center(-3.5));
    this.player.resetMode();
    this.player.vx = 0;
    this.player.vy = 0;

    this.player.friction = 0.98;


    this.player.rightFacing();


    this.yubi.setPosition(this.gridX.center(-2),this.gridY.center());
    this.yubi.rotation = -45;
    this.yubi.alpha = 1;
    this.yubi.scaleX = 1.5;
    this.yubi.scaleY = 1.5;


    var self = this;

    this.yubi.tweener.clear()
    .wait(600)
    .to({scaleX:2,scaleY:2,alpha:1},200,"easeOutCubic")
    .to({scaleX:0.7,scaleY:0.7,alpha:1},100,"easeInCubic")
    .call(function() {


              var shape = CircleShape().addChildTo(TutorialScene.backLayer);
              // 位置を指定
              shape.setPosition(self.yubi.x -20, self.yubi.y -20);
              shape.fill = 'rgba(0,0,0,0)';
              shape.stroke = 'white';
              shape.scaleX = 0;
              shape.scaleY = 0;

              shape.strokeWidth = 15;
              shape.radius  = 70;
              shape.tweener
              .clear()
              .to({alpha:0,scaleX:2,scaleY:2}, 400,"easeOutCubic")
              .to({alpha:0}, 100,"easeOutQuint")
              .call(function(){
                shape.remove();
              })

              self.player.kaiten(true);

    })
    .to({scaleX:1.5,scaleY:1.5,alpha:1},400,"easeOutCubic")
    .wait(1200)
    .to({scaleX:2,scaleY:2,alpha:1},200,"easeOutCubic")
    .to({scaleX:0.7,scaleY:0.7,alpha:1},100,"easeInCubic")
    .call(function() {




        var shape = CircleShape().addChildTo(TutorialScene.backLayer);
        // 位置を指定
        shape.setPosition(self.yubi.x -20, self.yubi.y -20);
        shape.fill = 'rgba(0,0,0,0)';
        shape.stroke = 'white';
        shape.scaleX = 0;
        shape.scaleY = 0;
        shape.strokeWidth = 15;
        shape.radius  = 70;
        shape.tweener
        .clear()
        .to({alpha:0,scaleX:2,scaleY:2}, 400,"easeOutCubic")
        .to({alpha:0}, 100,"easeOutQuint")
        .call(function(){
          shape.remove();
        })

        self.player.kaiten(true);

    })
    .to({scaleX:1.5,scaleY:1.5,alpha:1},400,"easeOutCubic")
    .wait(1000)
//    .to({scaleX:1,scaleY:1,alpha:1},400,"easeInCubic")

    .call(function() {

      self.setumei.tweener.clear()
      .to({scaleX:1,scaleY:0,alpha:1},200,"easeInCubic")
      .call(function() {
        self.setumei.text ='アタックや、いどうちゅうも\nくりだせるぞ';
      })
      .to({scaleX:1,scaleY:1,alpha:1},200,"easeInCubic")
      ;




      var v = Vector2(800, 1000);
      self.player.attack2(v);
    })
    .to({scaleX:2,scaleY:2,alpha:1},200,"easeOutCubic")
    .to({scaleX:0.7,scaleY:0.7,alpha:1},100,"easeInCubic")
    .call(function() {


      var shape = CircleShape().addChildTo(TutorialScene.backLayer);
      // 位置を指定
      shape.setPosition(self.yubi.x -20, self.yubi.y -20);
      shape.fill = 'rgba(0,0,0,0)';
      shape.stroke = 'white';
      shape.scaleX = 0;
      shape.scaleY = 0;

      shape.strokeWidth = 15;
      shape.radius  = 70;
      shape.tweener
      .clear()
      .to({alpha:0,scaleX:2,scaleY:2}, 400,"easeOutCubic")
      .to({alpha:0}, 100,"easeOutQuint")
      .call(function(){
        shape.remove();
      })

      self.player.kaiten();

    })
    .to({scaleX:1.5,scaleY:1.5,alpha:1},400,"easeOutCubic")
    .wait(600)

    .call(function() {
      var v = Vector2(300, 100);
      self.player.attack2(v);
    })
    .wait(300)

    .to({scaleX:2,scaleY:2,alpha:1},200,"easeOutCubic")
    .to({scaleX:0.7,scaleY:0.7,alpha:1},100,"easeInCubic")
    .call(function() {





      var shape = CircleShape().addChildTo(TutorialScene.backLayer);
      // 位置を指定
      shape.setPosition(self.yubi.x -20, self.yubi.y -20);
      shape.fill = 'rgba(0,0,0,0)';
      shape.stroke = 'white';
      shape.scaleX = 0;
      shape.scaleY = 0;

      shape.strokeWidth = 15;
      shape.radius  = 70;
      shape.tweener
      .clear()
      .to({alpha:0,scaleX:2,scaleY:2}, 400,"easeOutCubic")
      .to({alpha:0}, 100,"easeOutQuint")
      .call(function(){
        shape.remove();
      })

      self.player.kaiten();

    })
    .to({scaleX:1.5,scaleY:1.5,alpha:1},400,"easeOutCubic")
    .call(function() {

      if(!this.okFLG){
        this.okFLG = true;
        this.okButton.tweener.clear()
        .to({x:self.gridX.center(),},500,"easeOutCubic")
        .call(function() {

        }, this)

      }

    }, this)
    .wait(1400)
    .call(function(){
      self.lesson2();
    })
    ;




    this.setumei.text = 'タッチしてすぐはなすと\nかいてんぎり';
    this.setumei.setPosition(this.gridX.center(),this.gridY.center(4.5));

    this.lessonLabel.text = "かいてんぎり";







  },


  lesson3:function(){

    this.player.friction = 0.995;
    this.player.setPosition(this.gridX.center(-5),this.gridY.center(-3.5));
    this.player.resetMode();
    this.player.vx = 0;
    this.player.vy = 0;

    this.player.rightFacing();

    this.setumei.text = 'タッチしつづけると\nパワーがタマる\n';
    this.setumei.setPosition(this.gridX.center(),this.gridY.center(4.5));
    this.lessonLabel.text = "だいかいてんぎり";

    var self = this;


    this.yubi.setPosition(this.gridX.center(4),this.gridY.center(1));
    this.yubi.rotation = -90;
    this.yubi.alpha = 0;
    this.yubi.scaleX = 3;
    this.yubi.scaleY = 3;



    this.yubi.tweener.clear()
    .wait(600)
    .to({scaleX:1,scaleY:1,alpha:1},200,"easeInCubic")
    .call(function() {


      var shape = CircleShape().addChildTo(TutorialScene.backLayer);
      // 位置を指定
      shape.setPosition(self.yubi.x -20, self.yubi.y -20);
      shape.fill = 'rgba(0,0,0,0)';
      shape.stroke = 'white';
      shape.scaleX = 0;
      shape.scaleY = 0;

      shape.strokeWidth = 15;
      shape.radius  = 70;
      shape.tweener
      .clear()
      .to({alpha:0,scaleX:2,scaleY:2}, 400,"easeOutCubic")
      .to({alpha:0}, 100,"easeOutQuint")
      .call(function(){
        shape.remove();
      })

      self.player.tameStart();
    })
    .wait(1000)
    .call(function() {
        self.player.spriteSS.gotoAndPlay('tame1');
        SoundManager.play("tame");

        self.player.mode = "power";
    })
    .wait(2000)
    .call(function() {

      self.setumei.tweener.clear()
      .to({scaleX:1,scaleY:0,alpha:1},200,"easeInCubic")
      .call(function() {
        self.setumei.text ='タメてからアタックで\nだいかいてんぎりだ';
      })
      .to({scaleX:1,scaleY:1,alpha:1},200,"easeInCubic")
      ;

    })
    .wait(1000)
    .to({scaleX:3,scaleY:3,alpha:0},200,"easeInCubic")
    .call(function() {
      self.player.tameAttack();
    })
    .wait(2000)
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
    .call(function(){
      self.lesson3();
    })
    







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

    startLabel = Label('チュートリアル').addChildTo(this);
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

    this.setumei.remove();
    this.player.remove();
    this.tutorialLabel.remove();
    this.lessonLabel.remove();
    this.yubi.remove();

    var endlabel;
    var self = this;

    endlabel = Label('チュートリアル').addChildTo(this);
    endlabel.fill = '#FFFFFF'; // 色を変更
    endlabel.fontSize = 85; // フォントサイズを変更
    endlabel.fontFamily = 'def';
    endlabel.setPosition(this.gridX.center(),this.gridY.center(-2));
    endlabel.scaleX = 0;
    endlabel.scaleY = 0;

    endlabel.tweener.clear()
    .to({scaleX:1,scaleY:1,alpha:1},800,"easeOutBack")
    .wait(500)
    .to({y:-1000},800,"easeInCubic")


    ;

    var endlabel2;

    endlabel2 = Label('おわり').addChildTo(this);
    endlabel2.fill = '#FFFFFF'; // 色を変更
    endlabel2.fontSize = 80; // フォントサイズを変更
    endlabel2.fontFamily = 'def';
    endlabel2.scaleX = 0;
    endlabel2.scaleY = 0;

    endlabel2.setPosition(this.gridX.center(),this.gridY.center(0));

    endlabel2.tweener.clear()
    .wait(500)
    .to({scaleX:1,scaleY:1,alpha:1},800,"easeOutBack")
    .wait(500)
    .to({y:-1000},800,"easeInCubic")
    .call(function(){
      self.exit();
    })

    ;
  },

  update: function(app) {

    if (this.player.mode === 'attack') {
      var ai = Afterimage().addChildTo(this.afeterGroup);
      ai.setPosition(this.player.x, this.player.y);
      ai.rotation = this.player.rotation;
      ai.scaleX = this.player.sprite.scaleX;

    }


  },


});


phina.define('TutorialPlayer', {
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

      var hiteffect = HitEffect('hit','hitSS').addChildTo(TutorialScene.effectGroup);
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

    var v = Vector2.sub(TutorialScene.yubi, this);

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





    var v = Vector2.sub(TutorialScene.yubi, this);
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

    var hiteffect = HitEffect('hit','hitSS').addChildTo(TutorialScene.effectGroup);
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

    var v = Vector2.sub(TutorialScene.yubi, this);

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


    var hiteffect = HitEffect('hit','hitSS').addChildTo(TutorialScene.effectGroup);
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


  var hiteffect = HitEffect('hit','hitSS').addChildTo(TutorialScene.effectGroup);
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