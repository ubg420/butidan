var TitleScene;

phina.define('TijouScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';

    TitleScene = this;
    var self = this;


    var back = Sprite('sora').addChildTo(this);
    back.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    back.setPosition(this.gridX.center(),this.gridY.center());

    var kabe1 = Sprite('kabe1').addChildTo(this);
    kabe1.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    kabe1.setPosition(this.gridX.center(),this.gridY.center());

    this.playData = {};
    this.loadData();
    this.afeterGroup = DisplayElement().addChildTo(this);


    this.charaLayer = DisplayElement().addChildTo(this);


    this.sprite = Sprite('hero').addChildTo(this.charaLayer);
    this.spriteSS= FrameAnimation('hero_SS')
    this.spriteSS.attachTo(this.sprite);
    this.spriteSS.gotoAndPlay('Run');
    this.spriteSS.fit = false;
    this.sprite.setSize(158, 158);
    this.sprite .setPosition(this.gridX.center(-4.5),this.gridY.center(0.6));

    this.sprite.vy = 0;
    this.sprite.vx = 0;

    this.maskman = Sprite('maskman').addChildTo(this);
    this.maskmanSS= FrameAnimation('maskmanSS')
    this.maskmanSS.attachTo(this.maskman);
    this.maskmanSS.gotoAndPlay('run');
    this.maskmanSS.fit = false;
    this.maskman.setSize(250,250);
    this.maskman.setPosition(this.gridX.center(4.5),this.gridY.center(0.1));
    this.maskman.zanzouFLG = false;



    this.ido = Sprite('ido1').addChildTo(this);
    this.ido.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    this.ido.setPosition(this.gridX.center(),this.gridY.center(-0.2));

    var zimen = Sprite('zimen').addChildTo(this);
    zimen.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    zimen.setPosition(this.gridX.center(),this.gridY.center());

    this.wait =0;

    this.title = Sprite('logo1').addChildTo(this);
    this.title.setPosition(this.gridX.center(-1),this.gridY.center(-0.8));    
    this.title.scaleX = 1.15;
    this.title.scaleY = 1.15;

    this.logo2 = Sprite('logo2').addChildTo(this);
    this.logo2.setPosition(this.gridX.center(1),this.gridY.center(-0.8));    
    this.logo2.scaleX = 1.18;
    this.logo2.scaleY = 1.18;


    this.startlabel;
    this.startlabel = Label('START').addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(),this.gridY.center(5));
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 60; // フォントサイズを変更
    this.startlabel.fill= "white"; // フォントサイズを変更
    this.startlabel.fontFamily = "def"; // フォントサイズを変更    
    this.startlabel.tweener
    .clear()
    .to({alpha:1,scaleX:1,scaleY:1}, 700,"easeOutSine")
    .wait(400)
    .to({alpha:0,scaleX:0.8,scaleY:0.8}, 700,"easeInSine")
    .setLoop(true);

    this.startFLG = false;

    var version = 'Ver'+String(MAJOR_VERSION) + '.' + String(MINOR_VERSION) + '.' + String(BUILD_VERSION);
    this.versionLabel = Label(version).addChildTo(this);
    this.versionLabel.setPosition(this.gridX.center(5),this.gridY.center(7.5));
    this.versionLabel.strokeWidth = 8;
    this.versionLabel.fontSize = 35; // フォントサイズを変更
    this.versionLabel.fill= "white"; // フォントサイズを変更
    this.versionLabel.fontFamily = "def"; // フォントサイズを変更    

    this.diveFLG = false;

    this.maskmanTouchArea = RectangleShape().addChildTo(this);
    this.maskmanTouchArea.width = 230;
    this.maskmanTouchArea.height = 230;
    this.maskmanTouchArea.alpha = 0; //コリジョン可視化 = 1
    this.maskmanTouchArea.setPosition(this.gridX.center(4.5),this.gridY.center());
    this.maskmanTouchArea.setInteractive(true);

    this.shortCutUI = null;

    this.maskmanTouchArea.onpointend = function(e) {
      self.closeTitleUI();

      self.shortCutUI = ShortCutUI().addChildTo(TitleScene);
    };


    this.diveButton = DisplayElement().addChildTo(this);
    this.diveButton.setPosition(this.gridX.center(),this.gridY.center(4));
    this.diveButton.setSize(400,200);
    this.diveButton.scaleY = 0;
    this.diveButton.setInteractive(false);


    var diveWindow = Sprite('window_yoko').addChildTo(this.diveButton);
    diveWindow.setSize(400, 200);

    var diveLabel = Label('おちる').addChildTo(this.diveButton);
    diveLabel.strokeWidth = 8;
    diveLabel.fontSize = 70; // フォントサイズを変更
    diveLabel.fill= "white"; // フォントサイズを変更
    diveLabel.fontFamily = "def"; // フォントサイズを変更    

    this.diveButton.onpointend = function(e) {
      self.closeTitleUI();
      self.dive();
    };


    this.creditButton = DisplayElement().addChildTo(this);
    this.creditButton.setPosition(this.gridX.center(-4),this.gridY.center(7));
    this.creditButton.setSize(300,130);
    this.creditButton.scaleY = 0;
    this.creditButton.setInteractive(false);

    var creditSprite = Sprite('window_yoko').addChildTo(this.creditButton);
    creditSprite.setSize(300, 130);

    var creditLabel = Label('クレジット').addChildTo(this.creditButton);
    creditLabel.strokeWidth = 8;
    creditLabel.fontSize = 40; // フォントサイズを変更
    creditLabel.fill= "white"; // フォントサイズを変更
    creditLabel.fontFamily = "def"; // フォントサイズを変更    

    this.creditButton.onpointend = function(e) {
      self.app.pushScene(CreditScene());   
    };



    this.talkUI = DisplayElement().addChildTo(this);
    this.talkUI.setPosition(this.gridX.center(4.5),this.gridY.center(-1.5));
    this.talkUI.scaleY = 0;    
    this.talkUI.sprite = Sprite('sankaku').addChildTo(this.talkUI);
    this.talkUI.sprite.setSize(60, 60);
    this.talkUI.sprite.tweener
    .clear()
    .to({y:-30,scaleY:1,scaleX:1}, 500,"easeOutQuart")
    .to({y:0,scaleY:0.5,scaleX:0.5}, 500,"easeInQuart")
    .setLoop(true);


    this.timer =0;


  },



  update: function(app){
    if(this.diveFLG){
      if(this.sprite.x < this.gridX.center()){
        this.sprite.x += this.sprite.vx;

      }else{
        if(this.sprite.y < this.gridY.center(-0.3)){
          this.spriteSS.gotoAndPlay('Run');

          this.sprite.vy = 4;
        }else{
          this.spriteSS.gotoAndPlay('fall');

        }
      }
      this.sprite.y += this.sprite.vy;
      this.sprite.vy += this.g;


    }

    if(this.sprite.y> SCREEN_HEIGHT + this.sprite.height){

      if(localStorage.length > 0){
          this.exit("Main");          
      }else{

        this.exit();

      }
    }


    if (this.maskman.zanzouFLG) {
      this.timer++;
 
      if(this.timer % 2 ==0){
        
        var ai = MaskManAfterimage().addChildTo(this.afeterGroup);
        ai.setPosition(this.maskman.x, this.maskman.y);
        ai.rotation = this.maskman.rotation;
        
      }


    }

  },

 
  onclick(){
    var context = phina.asset.Sound.getAudioContext();
    context.resume();
    
        if(!this.startFLG){
          SoundManager.play("tame");
          this.start();
    
          //Debug
          //this.exit();
          //
        }
  },

  showTitleUI(){
    this.maskmanTouchArea.setInteractive(true);
    this.talkUI.scaleY = 1;

    this.creditButton.setInteractive(true);
    this.creditButton.tweener
    .clear()
    .to({scaleY:1}, 500,"easeOutQuart")

    this.diveButton.setInteractive(true);
    this.diveButton.tweener
    .clear()
    .to({scaleY:1}, 500,"easeOutQuart")

  },

  closeTitleUI(){
    this.maskmanTouchArea.setInteractive(false);

    this.talkUI.scaleY = 0;
    this.creditButton.scaleY = 0;

    this.diveButton.setInteractive(false);
    this.diveButton.tweener
    .clear()
    .to({scaleY:0}, 500,"easeOutQuart")


    this.creditButton.setInteractive(false);
    this.creditButton.tweener
    .clear()
    .to({scaleY:0}, 500,"easeOutQuart")
  },


  start: function(){
    this.startFLG = true;
    this.title.remove();
    this.logo2.remove();
    this.startlabel.remove();
    this.versionLabel.remove();

    this.showTitleUI();

//    this.exit();
  },




  shortCutStart:function(floor){

    this.shortCutUI.remove();


    StartFloor = floor;

    var self = this;

    this.maskmanSS.gotoAndPlay("tukami");
    this.maskman.zanzouFLG = true;


    var exTutorialFLG = localStorage.getItem("ExTutorialFLG1");

    var next = "Main";

    if(!exTutorialFLG){
      next = "ExTutorial";
    }


    this.maskman.tweener.clear()
    .to({x:self.sprite.x + 60}, 500,"easeInSine")
    .call(function() {
      SoundManager.play("sobi");


      this.sprite.remove();
      var hero = Sprite('hero').addChildTo(this.maskman);
      hero.x = -70;
      hero.y = 20;

      var heroSS= FrameAnimation('hero_SS')
      heroSS.attachTo(hero);
      heroSS.gotoAndPlay('fall');
      heroSS.fit = false;
      hero.setSize(158, 158);


    }, this)
    .wait(200)

    .to({y:400,x:this.gridX.center(),rotation:180}, 400,"easeInSine")
    .call(function() {
      
      self.ido.tweener.clear()
      .by({scaleX:0.6,scaleY:0.6,y:-60}, 200,"easeInSine")

    }, this)
    .wait(300)
    .call(function() {
      SoundManager.play("kaiten");

    }, this)
    .to({y:SCREEN_HEIGHT+ 500}, 700,"easeInSine")
    .call(function() {
      this.exit(next);

    }, this);
    
  },

  dive:function(){
    StartFloor = 1;
    this.diveFLG = true;
    this.sprite.vy = -30;
    this.g = 1.65;
    this.sprite.vx = 8;
    this.spriteSS.gotoAndPlay('fall');
    SoundManager.play("tame");

  },

  loadData: function(){
    this.playData.level = localStorage.getItem("level");
    this.playData.exp = localStorage.getItem("exp");
    this.playData.wepon = localStorage.getItem("weponId");
    this.playData.weponLevel = localStorage.getItem("weponLevel");
    this.playData.shield = localStorage.getItem("shieldId");
    this.playData.shieldLevel = localStorage.getItem("shieldLevel");
    this.playData.gem = localStorage.getItem("gemId");
    this.playData.gemLevel = localStorage.getItem("gemLevel");
    this.playData.maxFloor = localStorage.getItem("maxFloor");
  },



});

phina.define('MaskManAfterimage', {
  superClass: 'Sprite',

  init: function() {
    this.superInit('maskman');


    this.heroSS= FrameAnimation('maskmanSS')
    this.heroSS.attachTo(this);
    this.heroSS.gotoAndPlay('tukami');
    this.heroSS.fit = false;
    this.setSize(250, 250);


    this.tweener
      .fadeOut(256)
      .call(function() {
        this.remove();
      }, this);
  },
});


