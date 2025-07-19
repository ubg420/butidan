
phina.define("CreditScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });


    // 背景を半透明化
    this.backgroundColor = 'rgba(0, 0, 0, 0.8)';

    var self = this;

    this.layer1 = DisplayElement().addChildTo(this);
    this.layer2 = DisplayElement().addChildTo(this);



    var titleLabel = Label().addChildTo(this);
    titleLabel.text = 'クレジット';
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
    var seisaku = Label().addChildTo(this);
    seisaku.text =　"せいさく";
    seisaku.fill = '#FFFFFF'; // 色を変更
    seisaku.strokeWidth = 8;
    seisaku.fontSize = 68; // フォントサイズを変更
    seisaku.fontFamily = 'def';
    seisaku.align = "left";
    seisaku.setPosition(this.gridX.center(12),this.gridY.center(posY));
    seisaku.scaleX = 1;
    seisaku.scaleY = 0;
    seisaku.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");
    wait += 100;

    var seisaku2 = Label().addChildTo(this);
    seisaku2.text =  "うちょ";
    seisaku2.fill = '#FFFFFF'; // 色を変更
    seisaku2.strokeWidth = 8;
    seisaku2.fontSize = 70; // フォントサイズを変更
    seisaku2.fontFamily = 'def';
    seisaku2.setPosition(this.gridX.center(12),this.gridY.center(posY));
    seisaku2.scaleX = 1;
    seisaku2.scaleY = 0;
    seisaku2.align = "right";
    seisaku2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");

    posY += 2;
    wait += 100;


    var credit = Label().addChildTo(this);
    credit.text =　"BGM";
    credit.fill = '#FFFFFF'; // 色を変更
    credit.strokeWidth = 8;
    credit.fontSize = 60; // フォントサイズを変更
    credit.fontFamily = 'def';
    credit.align = "left";
    credit.setPosition(this.gridX.center(12),this.gridY.center(posY));
    credit.scaleX = 1;
    credit.scaleY = 0;
    credit.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");
    wait += 100;

    posY += 1.4;
    

    var credit2 = Label().addChildTo(this);
    credit2.text =  "Wingless Seraph";
    credit2.fill = '#FFFFFF'; // 色を変更
    credit2.strokeWidth = 8;
    credit2.fontSize = 45; // フォントサイズを変更
    credit2.fontFamily = 'def';
    credit2.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    credit2.scaleX = 1;
    credit2.scaleY = 0;
    credit2.align = "right";
    credit2.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");

    posY += 1.6;


    var credit3 = Label().addChildTo(this);
    credit3.text =　"SE";
    credit3.fill = '#FFFFFF'; // 色を変更
    credit3.strokeWidth = 8;
    credit3.fontSize = 60; // フォントサイズを変更
    credit3.fontFamily = 'def';
    credit3.align = "left";
    credit3.setPosition(this.gridX.center(12),this.gridY.center(posY));
    credit3.scaleX = 1;
    credit3.scaleY = 0;
    credit3.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(-6)}, 500,"easeOutQuart");
    wait += 100;

    posY += 1.2;


    var credit4 = Label().addChildTo(this);
    credit4.text =  "PANICPUMPKIN";
    credit4.fill = '#FFFFFF'; // 色を変更
    credit4.strokeWidth = 8;
    credit4.fontSize = 45; // フォントサイズを変更
    credit4.fontFamily = 'def';
    credit4.setPosition(this.gridX.center(12),this.gridY.center(posY));
    credit4.scaleX = 1;
    credit4.scaleY = 0;
    credit4.align = "right";
    credit4.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");
    posY += 1.2;
    wait += 100;


    var credit5 = Label().addChildTo(this);
    credit5.text =  "SKIPMORE";
    credit5.fill = '#FFFFFF'; // 色を変更
    credit5.strokeWidth = 8;
    credit5.fontSize = 45; // フォントサイズを変更
    credit5.fontFamily = 'def';
    credit5.setPosition(this.gridX.center(12),this.gridY.center(posY-0.1));
    credit5.scaleX = 1;
    credit5.scaleY = 0;
    credit5.align = "right";
    credit5.tweener
    .clear()
    .wait(wait)
    .to({scaleY:1,x:this.gridX.center(6.5)}, 500,"easeOutQuart");

    posY += 1.2;
    wait += 100;







    this.backButton = DisplayElement().addChildTo(this);
    this.backButton.setPosition(this.gridX.center(12),this.gridY.center(7));

    this.backButton.window = Sprite('window_yoko').addChildTo(this.backButton);
    this.backButton.window.setSize(358, 158);
    this.backButton.setSize(308, 158);
    this.backButton.setInteractive(true);

    this.backButton.label = Label('もどる').addChildTo(this.backButton);
    this.backButton.label.fill = 'white'; // 色を変更
    this.backButton.label.fontSize = 55; // フォントサイズを変更
    this.backButton.label.y = -5;
    this.backButton.label.fontFamily = 'def';
    this.backButton.scaleY = 0;
    this.backButton.tweener
    .clear()
    .to({scaleY:1,x:this.gridX.center(5)}, 500,"easeOutQuart");

    this.backButton.onpointend = function(e) {
      self.exit();

    };


    




  },

  
  sceneEnd: function(){
    this.exit();    
  }
  

});

