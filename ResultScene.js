
phina.define("ResultScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function(x,y,rotation) {
    // 親クラス初期化
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });
    SoundManager.stopMusic();
    SoundManager.play("gameover");

    // 背景を半透明化
    this.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    var self = this;

    this.layer1 = DisplayElement().addChildTo(this);
    this.layer2 = DisplayElement().addChildTo(this);

    var exp = GameMain.player.expCount;
    var tresure = GameMain.tresureCount;
    var floor = GameMain.floor;
    var level = GameMain.player.level;
    var combo = GameMain.comboUI.comboMax;


    var titleLabel = Label().addChildTo(this);
    titleLabel.text = 'こんかいの らっか';
    titleLabel.fill = '#FFFFFF'; // 色を変更
    titleLabel.strokeWidth = 8;
    titleLabel.fontSize = 63; // フォントサイズを変更
    titleLabel.fontFamily = 'def';
    titleLabel.setPosition(this.gridX.center(),this.gridY.center(-6));
    titleLabel.scaleX = 1;
    titleLabel.scaleY = 0;

    titleLabel.tweener
    .clear()
    .wait(100)
    .to({scaleY:1}, 500,"easeOutQuart");



    var posY = -4.3;
    var wait = 400;
    var floorLabel = Label().addChildTo(this);
    floorLabel.text =　"フロア";
    floorLabel.fill = '#FFFFFF'; // 色を変更
    floorLabel.strokeWidth = 8;
    floorLabel.fontSize = 48; // フォントサイズを変更
    floorLabel.fontFamily = 'def';
    floorLabel.align = "left";
    floorLabel.setPosition(this.gridX.center(12),this.gridY.center(posY));
    floorLabel.scaleX = 1;
    floorLabel.scaleY = 0;
    floorLabel.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");
    wait += 100;


    var floorLabel2 = Label().addChildTo(this);
    floorLabel2.text = floor +"F";
    floorLabel2.fill = '#FFFFFF'; // 色を変更
    floorLabel2.strokeWidth = 8;
    floorLabel2.fontSize = 60; // フォントサイズを変更
    floorLabel2.fontFamily = 'def';
    floorLabel2.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    floorLabel2.scaleX = 1;
    floorLabel2.scaleY = 0;
    floorLabel2.align = "right";
    floorLabel2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");


    posY += 1.2;
    wait += 100;

    var levelLabel = Label().addChildTo(this);

    levelLabel.text =　"レベル";
    levelLabel.fill = '#FFFFFF'; // 色を変更
    levelLabel.strokeWidth = 8;
    levelLabel.fontSize = 48; // フォントサイズを変更
    levelLabel.fontFamily = 'def';
    levelLabel.align = "left";

    levelLabel.setPosition(this.gridX.center(12),this.gridY.center(posY));
    levelLabel.scaleX = 1;
    levelLabel.scaleY = 0;
    levelLabel.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");

    var levelLabel2 = Label().addChildTo(this);
    levelLabel2.text = level;
    levelLabel2.fill = '#FFFFFF'; // 色を変更
    levelLabel2.strokeWidth = 8;
    levelLabel2.fontSize = 60; // フォントサイズを変更
    levelLabel2.fontFamily = 'def';
    levelLabel2.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    levelLabel2.scaleX = 1;
    levelLabel2.scaleY = 0;
    levelLabel2.align = "right";
    levelLabel2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");



    posY += 1.2;
    wait += 100;

    var comboLabel = Label().addChildTo(this);
    comboLabel.text = 'さいだいコンボ';
    comboLabel.fill = '#FFFFFF'; // 色を変更
    comboLabel.strokeWidth = 8;
    comboLabel.fontSize = 43; // フォントサイズを変更
    comboLabel.fontFamily = 'def';
    comboLabel.setPosition(this.gridX.center(12),this.gridY.center(posY));
    comboLabel.scaleX = 1;
    comboLabel.scaleY = 0;
    comboLabel.align = "left";
    comboLabel.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");
    wait += 100;


    var comboLabel2 = Label().addChildTo(this);
    comboLabel2.text = combo;
    comboLabel2.fill = '#FFFFFF'; // 色を変更
    comboLabel2.strokeWidth = 8;
    comboLabel2.fontSize = 60; // フォントサイズを変更
    comboLabel2.fontFamily = 'def';
    comboLabel2.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    comboLabel2.scaleX = 1;
    comboLabel2.scaleY = 0;
    comboLabel2.align = "right";
    comboLabel2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");





    posY += 1.2;
    wait += 100;

    var expLabel = Label().addChildTo(this);
    expLabel.text = 'かせいだEXP';
    expLabel.fill = '#FFFFFF'; // 色を変更
    expLabel.strokeWidth = 8;
    expLabel.fontSize = 43; // フォントサイズを変更
    expLabel.fontFamily = 'def';
    expLabel.setPosition(this.gridX.center(12),this.gridY.center(posY));
    expLabel.scaleX = 1;
    expLabel.scaleY = 0;
    expLabel.align = "left";
    expLabel.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");
    wait += 100;


    var expLabel2 = Label().addChildTo(this);
    expLabel2.text = exp;
    expLabel2.fill = '#FFFFFF'; // 色を変更
    expLabel2.strokeWidth = 8;
    expLabel2.fontSize = 60; // フォントサイズを変更
    expLabel2.fontFamily = 'def';
    expLabel2.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    expLabel2.scaleX = 1;
    expLabel2.scaleY = 0;
    expLabel2.align = "right";
    expLabel2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");


    posY += 1.2;
    wait += 100;

    var itemLabel = DisplayElement().addChildTo(this);
    itemLabel.setPosition(this.gridX.center(12),this.gridY.center(posY));

    itemLabel.value = 0;
    itemLabel.alpha = 1;
    itemLabel.icon = Sprite('treasure').addChildTo(itemLabel);
    itemLabel.icon.x = 320;
    itemLabel.icon.y = -4;
    itemLabel.anim = FrameAnimation('treasureSS').attachTo(itemLabel.icon);
    itemLabel.anim.gotoAndPlay('close');
    itemLabel.anim.fit = false;
    itemLabel.icon.setSize(80,80);
    itemLabel.label = Label().addChildTo(itemLabel);
    itemLabel.label.text = "ゲットした";
    itemLabel.label.fill = '#FFFFFF'; // 色を変更
    itemLabel.label.strokeWidth = 8;
    itemLabel.label.fontSize = 48; // フォントサイズを変更
    itemLabel.label.fontFamily = 'def';
    itemLabel.label.align = 'left';
    itemLabel.scaleY = 0;
    itemLabel.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");

    wait += 100;


    var itemLabel2 = Label().addChildTo(this);
    itemLabel2.text = tresure +"コ";
    itemLabel2.fill = '#FFFFFF'; // 色を変更
    itemLabel2.strokeWidth = 8;
    itemLabel2.fontSize = 60; // フォントサイズを変更
    itemLabel2.fontFamily = 'def';
    itemLabel2.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    itemLabel2.scaleX = 1;
    itemLabel2.scaleY = 0;
    itemLabel2.align = "right";
    itemLabel2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");

    posY += 1.2;
    wait += 200;


    GameMain.saveData();

    var saveLavel = Label().addChildTo(this);
    saveLavel.text = 'セーブしました';
    saveLavel.fill = '#FFFFFF'; // 色を変更
    saveLavel.strokeWidth = 8;
    saveLavel.fontSize = 55; // フォントサイズを変更
    saveLavel.fontFamily = 'def';
    saveLavel.setPosition(this.gridX.center(),this.gridY.center(posY));
    saveLavel.scaleX = 1;
    saveLavel.scaleY = 0;
    saveLavel.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1}, 500,"easeOutQuart")
    .wait(1000)
    .to({scaleY:0}, 500,"easeOutQuart")
    ;




  




    this.okButton = DisplayElement().addChildTo(this);
    this.okButton.setPosition(this.gridX.center(3.8),this.gridY.center(3.5));

    this.okButton.window = Sprite('window_yoko').addChildTo(this.okButton);
    this.okButton.window.setSize(358, 158);
    this.okButton.setSize(308, 158);
    this.okButton.setInteractive(true);

    this.okButton.label = Label('ふっかつ').addChildTo(this.okButton);
    this.okButton.label.fill = 'white'; // 色を変更
    this.okButton.label.fontSize = 55; // フォントサイズを変更
    this.okButton.label.y = -5;
    this.okButton.label.fontFamily = 'def';
    this.okButton.scaleY = 0;
    this.okButton.tweener
    .clear()
    .wait(1800)
    .to({scaleY:1}, 500,"easeOutQuart");

    var self = this;
    
    this.okButton.onpointend = function(e) {
      self.exit();
      GameMain.exit("Main");
    };

    this.backButton = DisplayElement().addChildTo(this);
    this.backButton.setPosition(this.gridX.center(-3.8),this.gridY.center(3.5));

    this.backButton.window = Sprite('window_yoko').addChildTo(this.backButton);
    this.backButton.window.setSize(358, 158);
    this.backButton.setSize(308, 158);
    this.backButton.setInteractive(true);

    this.backButton.label = Label('ちじょうへ').addChildTo(this.backButton);
    this.backButton.label.fill = 'white'; // 色を変更
    this.backButton.label.fontSize = 55; // フォントサイズを変更
    this.backButton.label.y = -5;
    this.backButton.label.fontFamily = 'def';
    this.backButton.scaleY = 0;
    this.backButton.tweener
    .clear()
    .wait(1500)
    .to({scaleY:1}, 500,"easeOutQuart");

    
    this.backButton.onpointend = function(e) {
      self.exit();
      GameMain.exit("Tijou");

    };


    


   var tweet = Sprite('tweet').addChildTo(this);

   var url = "https://cachacacha.com/GAME/butidan/";
   var score = 0;
   this.ResultTxt = "";

   var Tweettxt = encodeURIComponent("レベル" + level + "で" + floor + "Fまで落ちた EXP " + exp + "かせいだ　 #ブチぬきダンジョン #かちゃコム "  + url  );

   tweet.setPosition(this.gridX.center(3.8),this.gridY.center(5.4));
   tweet.scaleX = 1;
   tweet.scaleY = 0;
   tweet.setSize(260,100)
   tweet.tweener
   .clear()
   .wait(1700)
   .to({scaleY:1}, 500,"easeOutQuart");
   // タッチ判定を有効に
   tweet.setInteractive(true);
   // タッチ終了時に発火
   tweet.onclick = function() {
     // 自身を削除
     window.open("http://twitter.com/intent/tweet?text=" + Tweettxt);
   };



   var cacha = Sprite('cacha').addChildTo(this);
   cacha.setPosition(this.gridX.center(-3.8),this.gridY.center(5.4));

   cacha.scaleX = 1;
   cacha.scaleY = 0;
   cacha.setSize(250,90)

   cacha.tweener
   .clear()
   .wait(1700)
   .to({scaleY:1}, 500,"easeOutQuart");
   // タッチ判定を有効に
   cacha.setInteractive(true);
   // タッチ終了時に発火
   cacha.onclick = function() {
     // 自身を削除
     window.open("https://cachacacha.com");
   };


   
   var googlePlay = Sprite('googlePlay').addChildTo(this);
   googlePlay.setPosition(this.gridX.center(),this.gridY.center(7.2));

   googlePlay.scaleX = 1.2;
   googlePlay.scaleY = 0;
   googlePlay.setSize(312,125)

   googlePlay.tweener
   .clear()
   .wait(1700)
   .to({scaleY:1.2}, 500,"easeOutQuart");
   // タッチ判定を有効に
   googlePlay.setInteractive(true);
   // タッチ終了時に発火
   googlePlay.onclick = function() {
     // 自身を削除
     window.open("https://play.google.com/store/apps/details?id=com.cachacacha.butinukidungeon");
   };





  },

  
  sceneEnd: function(){
    this.exit();    
  }
  

});

