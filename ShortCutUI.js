
phina.define("ShortCutUI", {
  // 継承
  superClass: 'DisplayElement',
  // コンストラクタ
  init: function(x,y,rotation) {
    // 親クラス初期化
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;

    // 背景を半透明化
    this.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    var self = this;


    this.layer1 = DisplayElement().addChildTo(this);
    this.layer2 = DisplayElement().addChildTo(this);

    this.width = 200;
    this.height = 200;


    this.serifu = DisplayElement().addChildTo(this);
    this.serifu.x = TitleScene.maskman.x;
    this.serifu.y = TitleScene.maskman.y;
    this.serifu.scaleX = 0;
    this.serifu.scaleY = 0;
    this.serifu.window = Sprite('window_yoko').addChildTo(this.serifu);
    this.serifu.window.setSize(800, 250);


    this.buttonGroup = DisplayElement().addChildTo(this);



    this.serifu.tweener
    .clear()
    .to({scaleY:1,scaleX:1,x:TitleScene.gridX.center(),y:TitleScene.gridY.center(-6.3)}, 500,"easeOutQuart")
    .wait(1000)

    this.maxFloor = TitleScene.playData.maxFloor;
    //何階層ごとにショートカットできるか
    this.shortCutFloor = 50;

    var text;
    text = '50Fまですすめたら\nもどって きたまえっ';

    if(!this.maxFloor){
      

    }else{

      this.maxFloor = parseInt(this.maxFloor);
      this.targetFloor  = this.maxFloor;

      this.rightButton = Sprite('yazirushi').addChildTo(this);
      this.rightButton.setPosition(TitleScene.gridX.center(6),TitleScene.gridY.center());
      this.rightButton.setSize(180,180);
      this.rightButton.setInteractive(false);
      this.rightButton.onpointend = function(e) {
        self.backFloor();
      };
      this.rightButton.alpha = 0;
      
  
      this.leftButton = Sprite('yazirushi').addChildTo(this);
      this.leftButton.scaleX = -1;
      this.leftButton.setPosition(TitleScene.gridX.center(-6),TitleScene.gridY.center());
      this.leftButton.setSize(180,180);
      this.leftButton.setInteractive(false);
      this.leftButton.onpointend = function(e) {
        self.nextFloor();
  
      };
      this.leftButton.alpha = 0;

      var self = this;

      if(this.maxFloor >= this.shortCutFloor){

        this.createButton(false);

        text = 'いきたい フロアまで\nはこんで あげよう';

      }
    }

    this.serifu.label
    this.serifu.label = Label(text).addChildTo(this.serifu);
    this.serifu.label.align = "left";
    this.serifu.label.strokeWidth = 8;
    this.serifu.label.x = -300;
    this.serifu.label.fontSize = 55; // フォントサイズを変更
    this.serifu.label.fill= "white"; // フォントサイズを変更
    this.serifu.label.fontFamily = "def"; // フォントサイズを変更    


    this.closeWindow = DisplayElement().addChildTo(this);
    this.closeWindow.setPosition(TitleScene.gridX.center(12),TitleScene.gridY.center(6));
    this.closeWindow.setSize(300,140);
    this.closeWindow.scaleY = 1;
    this.closeWindow.setInteractive(true);


    var cw = Sprite('window_yoko').addChildTo(this.closeWindow);
    cw.setSize(350, 170);

    var cl
    cl = Label('とじる').addChildTo(this.closeWindow);
    cl.strokeWidth = 8;
    cl.fontSize = 60; // フォントサイズを変更
    cl.fill= "white"; // フォントサイズを変更
    cl.fontFamily = "def"; // フォントサイズを変更    


    this.closeWindow.tweener
    .clear()
    .wait(700)
    .to({x:TitleScene.gridX.center(4),scaleY:1,scaleX:1}, 500,"easeOutQuart")

    this.closeWindow.onpointend = function(e) {
      SoundManager.play("tame");

      self.tweener
      .clear()
      .to({x:SCREEN_WIDTH}, 500,"easeOutQuart")
      .call(function() {
        TitleScene.showTitleUI()
        self.remove();

      }, this)
    };




  },

  createButton:function(back){

    var shortCutFloor = 50;

    var dir = 12;
    if(back){
      dir *= -1;
    }

    var floorCount = Math.floor(this.targetFloor / this.shortCutFloor);
    var posY = -3;
    var choiseCount = 0;
    var waittime = 200;
    for (let index = floorCount; index > 0; index--) {
      var floor = index * shortCutFloor;

      var choiceFloor1 = ShortCutObject(floor).addChildTo(this.buttonGroup);
      choiceFloor1.setPosition(TitleScene.gridX.center(dir),TitleScene.gridY.center(posY));
      choiceFloor1.scaleY = 1;
  
      choiceFloor1.tweener
      .clear()
      .wait(waittime)
      .to({scaleY:1,scaleX:1,x:TitleScene.gridX.center()}, 500,"easeOutQuart")
      .call(function() {
        choiceFloor1.setInteractive(true);
      })
      waittime += 100;

      posY+= 3;
      //三個以上表示しない
      choiseCount++;
      if(choiseCount >= 3){
        break;

      }
    }

    this.tweener
    .clear()
    .wait(waittime + 100)
    .call(function() {

      this.buttonGroup.children.each(function(obj) {
        obj.setInteractive(true);
      }, this);

      if(this.maxFloor > this.targetFloor){
        //左ボタン表示
        this.leftButton.setInteractive(true);
        this.leftButton.tweener
        .clear()
        .to({scaleY:1,alpha:1}, 110)      
      }
      
      if(this.targetFloor >= 200){
        //右ボタン表示
        this.rightButton.setInteractive(true);
        this.rightButton.tweener
        .clear()
        .to({scaleY:1,alpha:1}, 110)      
      }


    }, this)

  },

  removeButton:function(back){

    var dir = 12;
    if(!back){
      dir *= -1;
    }

    var waittime = 0;
    this.buttonGroup.children.each(function(obj) {
      obj.setInteractive(false);

      obj.tweener
      .clear()
      .wait(waittime)
      .to({scaleY:1,scaleX:1,x:TitleScene.gridX.center(dir)}, 500,"easeOutQuart")
      .call(function() {
        obj.remove();
      }, this);

      waittime+=100;

    }, this);

  },

  backFloor:function(){

    this.removeButton(false);
    this.targetFloor-=150;
    this.createButton(false);

    this.rightButton.setInteractive(false);
    this.rightButton.tweener
    .clear()
    .to({scaleY:0.5,alpha:0}, 110)

    this.leftButton.setInteractive(false);
    this.leftButton.tweener
    .clear()
    .to({scaleY:0.5,alpha:0}, 110)
    

  },

  nextFloor:function(){

    this.removeButton(true);
    this.targetFloor+=150;
    this.createButton(true);

    this.rightButton.setInteractive(false);
    this.rightButton.tweener
    .clear()
    .to({scaleY:0.5,alpha:0}, 110)

    this.leftButton.setInteractive(false);
    this.leftButton.tweener
    .clear()
    .to({scaleY:0.5,alpha:0}, 110)

  },



  sceneEnd: function(){
    this.exit();    
  }
  

});


phina.define('ShortCutObject', {
  superClass: 'DisplayElement',
  
  init: function(floor) {
      this.superInit();

      this.floor = floor;

      this.width = 400;
      this.height = 200;

      this.window = Sprite('window_yoko').addChildTo(this);
      this.window.setSize(this.width, this.height);

      this.label
      var startlabel;
      this.label = Label(this.floor+'F').addChildTo(this);
      this.label.strokeWidth = 8;
      this.label.fontSize = 60; // フォントサイズを変更
      this.label.fill= "white"; // フォントサイズを変更
      this.label.fontFamily = "def"; // フォントサイズを変更    





  },
  
  update: function(app) {

  },

  viewDetail:function(){


    this.detail.tweener
    .clear()
    .to({scaleX:1}, 400, 'easeOutCubic')
    ;

  },

  closeDetail:function(){

    this.detail.tweener
    .clear()
    .to({scaleX:0}, 200, 'easeOutCubic')
    ;

  },

  
  onpointend:function(){
    SoundManager.play("tame");

    TitleScene.shortCutStart(this.floor);
    
    this.remove();
  }

  
});