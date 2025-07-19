/*
 * runstant
 */

// main scene


phina.define('CountDownScene', {
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });

    this.backgroundColor = "black";

    this.timer = 0;
    this.floor = 1;

    this.backLayer = DisplayElement().addChildTo(this);

  

    var countDown = Label('3').addChildTo(this);
    countDown.fill = '#FFFFFF'; // 色を変更
    countDown.fontSize =145; // フォントサイズを変更
    countDown.fontFamily = 'def';
    countDown.setPosition(this.gridX.center(),this.gridY.center());

    countDown.scaleY = 0;
    countDown.scaleX = 0;
    var self = this;

    countDown.tweener.clear()
    .to({scaleX:1,scaleY:1,alpha:1},200,"easeOutBack")
    .wait(400)
    .call(function() {
      countDown.text = "2";
    }, this)
    .wait(10)
    .to({scaleX:1.8,scaleY:1.8,alpha:1},200,"easeOutBack")
    .wait(400)
    .call(function() {
      countDown.text = "1";
    })
    .wait(10)
    .to({scaleX:2.6,scaleY:2.6,alpha:1},200,"easeOutBack")
    .wait(400)
    .call(function() {
      self.exit();
    }, this)

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




  },


  update: function(app) {




  },


});
