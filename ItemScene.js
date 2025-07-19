var ITEMSCENE;

phina.define("ItemScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function(x,y,rotation) {
    // 親クラス初期化
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    // 背景を半透明化
    this.backgroundColor = 'rgba(0, 0, 0, 0.6)';

    var self = this;


    this.layer1 = DisplayElement().addChildTo(this);
    this.layer2 = DisplayElement().addChildTo(this);
    SoundManager.setVolumeMusic(0.25);



    this.tresure = Sprite('treasure').addChildTo(this.layer1);
    this.tresureSS= FrameAnimation('treasureSS')
    this.tresureSS.attachTo(this.tresure);
    this.tresureSS.gotoAndPlay('close');
    this.tresureSS.fit = false;
    this.tresure.setSize(158, 158);
    this.tresure.setPosition(x, y);
    this.tresure.rotation = rotation;
  
    SoundManager.play("get");

    //宝箱を画面下に移動
    this.tresure.tweener
    .clear()
    .to({x: this.gridX.center(), y: this.gridY.center(4), rotation : 0,scaleX:1.3,scaleY:1.3}, 400, 'easeOutCubic')
    .call(function() {

      SoundManager.play("open");

      this.tresureSS.gotoAndPlay('open');
      this.createItem();

      var getlabel = Label().addChildTo(this);
      getlabel.text = 'ゲット!';
      getlabel.fill = '#FFFFFF'; // 色を変更
      getlabel.strokeWidth = 8;
      getlabel.fontSize = 143; // フォントサイズを変更
      getlabel.fontFamily = 'def';
      getlabel.setPosition(this.gridX.center(),this.gridX.center(-3));
      getlabel.scaleX = 0;
      getlabel.scaleY = 0;

      getlabel.tweener
        .clear()
        .to({scaleX:1,scaleY:1}, 400, 'easeOutCubic')
        .wait(150)
        .to({x:-1000}, 300, 'easeInCubic')
        .call(function() {

          this.viewChoiceUI();
        
        }, this)
      ;

    }, this)
    .by({scaleX:0.3,scaleY:0.3}, 200, 'easeOutCubic')
    .by({scaleX:-0.3,scaleY:-0.3}, 200, 'easeOutCubic')
    ;






  },

  createItem:function(){

    var randam= Math.floor( Math.random() * this.itemType);
     var item = Item(ITEMDATA[randam],GameMain.enemyLevel);

//    var item = Item(ITEMDATA.katana,3);
    this.itemObject = ItemObject(item).addChildTo(this.layer2);

    this.itemObject.scaleX = 0;
    this.itemObject.scaleY = 0;
    this.itemObject.setPosition(this.tresure.x,this.tresure.y);

    this.itemObject.tweener
    .clear()
    .to({x: SCREEN_WIDTH /2, y: SCREEN_HEIGHT /2,scaleX:1,scaleY:1}, 400, 'easeOutCubic')
    .call(function() {
      this.itemObject.viewDetail();
    }, this);

    var self = this;

    this.itemObject.onpointstart = function(e) {
      var p = e.pointer;
      this.setPosition(p.x, p.y);
      this.closeDetail();
    };
  
    this.itemObject.onpointmove = function(e) {
      var p = e.pointer;
      this.setPosition(p.x, p.y);
    };
  
    this.itemObject.onpointend = function(e) {
      self.hitCheck();
    };





  },

  viewChoiceUI:function(){

    var EQItem = null;

    if(this.itemObject.type === "wepon"){
       EQItem = GameMain.player.wepon;
    }
    if(this.itemObject.type === "shield"){
      EQItem = GameMain.player.shield;
    }
    if(this.itemObject.type === "gem"){
      EQItem = GameMain.player.gem;
    }



    this.exItemObject = ItemObject(EQItem).addChildTo(this.layer1);
    this.exItemObject.setPosition(this.gridX.center(8),this.gridY.center(-4));

    var exLabel = Label().addChildTo(this.exItemObject);
    exLabel.text = 'そうびちゅう';
    exLabel.fill = '#FFFFFF'; // 色を変更
    exLabel.strokeWidth = 8;
    exLabel.fontSize = 38; // フォントサイズを変更
    exLabel.fontFamily = 'def';
    exLabel.y = -135;

    this.exItemObject.tweener
    .clear()
    .to({x:this.gridX.center(0)}, 400, 'easeOutCubic')
    .call(function() {
       this.exItemObject.viewDetail();
       this.itemObject.setInteractive(true);

      }, this);


    this.irekaeLabel = Label().addChildTo(this.layer1);
    this.irekaeLabel.text = 'そうびする';
    this.irekaeLabel.fill = '#FFFFFF'; // 色を変更
    this.irekaeLabel.strokeWidth = 8;
    this.irekaeLabel.fontSize = 55; // フォントサイズを変更
    this.irekaeLabel.fontFamily = 'def';
    this.irekaeLabel.setPosition(this.gridX.center(-5),this.gridY.center(-2))
    this.irekaeLabel.scaleY = 0;
    this.irekaeLabel.tweener
    .clear()
    .to({scaleY:1},400,'easeOutCubic')
    .call(function() {
      this.irekaeLabel.tweener
        .clear()
        .to({scaleY:1},500,'easeOutCubic')
        .wait(200)
        .to({scaleY:0.5},500,'easeInCubic')
        .setLoop(1)

     }, this);


    this.yazirusiUp = Sprite('yazirushi').addChildTo(this.layer1);
    this.yazirusiUp.setSize(120, 120);
    this.yazirusiUp.setPosition(this.gridX.center(),this.gridY.center());
    this.yazirusiUp.rotation = -90;
    this.yazirusiUp.scaleX = 0;
    this.yazirusiUp.tweener
    .clear()
    .to({y:this.gridY.center(-2),scaleX:1},500,'easeOutCubic')
    .wait(500)
    .to({alpha:0},400,'easeOutCubic')
    .to({y:this.gridY.center(0),alpha:1,scaleX:0},1)
    .setLoop(1);


    this.modosuLabel = Label().addChildTo(this.layer1);
    this.modosuLabel.text = 'へんかん';
    this.modosuLabel.fill = '#FFFFFF'; // 色を変更
    this.modosuLabel.strokeWidth = 8;
    this.modosuLabel.fontSize = 55; // フォントサイズを変更
    this.modosuLabel.fontFamily = 'def';
    this.modosuLabel.setPosition(this.gridX.center(-5),this.gridY.center(1))
    this.modosuLabel.scaleY = 0;
    this.modosuLabel.tweener
    .clear()
    .to({scaleY:1},400,'easeOutCubic')
    .call(function() {
      this.modosuLabel.tweener
        .clear()
        .to({scaleY:1},500,'easeOutCubic')
        .wait(200)
        .to({scaleY:0.5},500,'easeInCubic')
        .setLoop(1);
     }, this);




    this.yazirusiLeft = Sprite('yazirushi').addChildTo(this.layer1);
    this.yazirusiLeft.setSize(120, 120);
    this.yazirusiLeft.setPosition(this.gridX.center(-2),this.gridY.center(0.7));
    this.yazirusiLeft.rotation = 130;
    this.yazirusiLeft.scaleX = 0;
    this.yazirusiLeft.tweener
    .clear()
    .to({y:this.gridY.center(2.2),scaleX:1},500,'easeOutCubic')
    .wait(500)
    .to({alpha:0},400,'easeOutCubic')
    .to({y:this.gridY.center(1.3),alpha:1,scaleX:0},1)
    .setLoop(1);


    this.yazirusiRight = Sprite('yazirushi').addChildTo(this.layer1);
    this.yazirusiRight.setSize(120, 120);
    this.yazirusiRight.setPosition(this.gridX.center(2),this.gridY.center(0.7));
    this.yazirusiRight.rotation = 60;
    this.yazirusiRight.scaleX = 0;
    this.yazirusiRight.tweener
    .clear()
    .to({y:this.gridY.center(2.2),scaleX:1},500,'easeOutCubic')
    .wait(500)
    .to({alpha:0},400,'easeOutCubic')
    .to({y:this.gridY.center(1.3),alpha:1,scaleX:0},1)
    .setLoop(1);



    this.tresure.tweener
    .clear()
    .to({x:this.gridX.center(-12)}, 400, 'easeInCubic')
    .call(function() {

    }, this);

    this.changeExp = DisplayElement().addChildTo(this.layer1);
    this.changeExp.setSize(260, 200);
    this.changeExp.setPosition(this.gridX.center(12),this.gridY.center(4));
    this.changeExp.exp = GameMain.enemyLevel * 30;

    this.expIcon = Label().addChildTo(this.changeExp);
    this.expIcon.text = 'EXP';
    this.expIcon.fill = '#00ff7f'; // 色を変更
    this.expIcon.strokeWidth = 8;
    this.expIcon.fontSize = 70; // フォントサイズを変更
    this.expIcon.fontFamily = 'def';
    this.expIcon.y = 40;

    this.expvalue = Label().addChildTo(this.changeExp);
    this.expvalue.text = this.changeExp.exp;

    this.expvalue.fill = '#00ff7f'; // 色を変更
    this.expvalue.strokeWidth = 8;
    this.expvalue.fontSize = 73; // フォントサイズを変更
    this.expvalue.fontFamily = 'def';
    this.expvalue.y = -40;

    this.expLabel = Label().addChildTo(this.changeExp);
    this.expLabel.text = 'けいけんちをゲット';
    this.expLabel.fill = '#FFFFFF'; // 色を変更
    this.expLabel.strokeWidth = 8;
    this.expLabel.fontSize = 30; // フォントサイズを変更
    this.expLabel.fontFamily = 'def';
    this.expLabel.y = 100;

    
    this.changeExp.tweener
    .clear()
    .wait(200)
    .to({x:this.gridX.center(-4)}, 400, 'easeOutCubic')
    .call(function() {

    }, this);

    this.changeLife = DisplayElement().addChildTo(this.layer1);
    this.changeLife.setSize(260, 200);
    this.changeLife.setPosition(this.gridX.center(12),this.gridY.center(4));
    this.lifeSprite = Sprite('heart').addChildTo(this.changeLife);
    this.lifeSprite.setSize(200,200);
  
    this.lifeLabel = Label().addChildTo(this.changeLife);
    this.lifeLabel.text = 'HP20%かいふく';
    this.lifeLabel.fill = '#FFFFFF'; // 色を変更
    this.lifeLabel.strokeWidth = 8;
    this.lifeLabel.fontSize = 30; // フォントサイズを変更
    this.lifeLabel.fontFamily = 'def';
    this.lifeLabel.y = 100;

    this.changeLife.tweener
    .clear()
    .wait(200)
    .to({x:this.gridX.center(4)}, 400, 'easeOutCubic')
    .call(function() {

      }, this);
    


  },

  hitCheck:function(){

      if (this.itemObject.hitTestElement(this.exItemObject)) {
        this.equipmentItem()
      }
      else if (this.itemObject.hitTestElement(this.tresure)) {
        this.removeItem();
      }
      else if (this.itemObject.hitTestElement(this.changeExp)) {
        this.getExp();
      }
      else if (this.itemObject.hitTestElement(this.changeLife)) {
        this.getLife();
      }
      else{
        this.itemObject.setPosition(SCREEN_WIDTH /2,SCREEN_HEIGHT/2)
        this.itemObject.viewDetail();
      }
  
  },
  

  getExp: function(){

    this.yazirusiUp.remove();
    this.yazirusiUp.remove();

    this.irekaeLabel.remove();
    this.yazirusiRight.remove();
    this.yazirusiLeft.remove();
    this.modosuLabel.remove();


    this.exItemObject.remove();

    this.itemObject.setInteractive(false);

    this.itemObject.tweener
      .clear()
      .to({x:this.changeExp.x,y:this.changeExp.y, scaleX:0,scaleY:0,rotation:360}, 200,)
      .call(function() {

        SoundManager.play("exp");

        var exLabel = Label().addChildTo(this.layer1);
        exLabel.text = 'EXPゲット!';
        exLabel.fill = '#FFFFFF'; // 色を変更
        exLabel.strokeWidth = 8;
        exLabel.fontSize = 108; // フォントサイズを変更
        exLabel.fontFamily = 'def';
        exLabel.scaleX = 0;
        exLabel.scaleY = 0;
        
        exLabel.setPosition(this.gridX.center(),this.gridY.center(-4));
    
        exLabel.tweener
          .clear()
          .to({scaleX:1,scaleY:1}, 200, 'easeOutCubic')
          .wait(500)
          .call(function() {
            GameMain.player.addExp(this.changeExp.exp);
            this.sceneEnd();
          }, this)


        this.changeExp.tweener
        .clear()
        .to({x:this.gridX.center(),y:this.gridY.center(),scaleX:1.5,scaleY:1.5}, 200, 'easeOutCubic')
        ;

      }, this)
      ;

  },


  getLife: function(){


    //回復量
    var cureValue = Math.floor(GameMain.player.maxHp * 0.2);

    this.yazirusiUp.remove();
    this.yazirusiUp.remove();

    this.irekaeLabel.remove();
    this.yazirusiRight.remove();
    this.yazirusiLeft.remove();
    this.modosuLabel.remove();

    this.exItemObject.remove();

    this.itemObject.setInteractive(false);

    this.itemObject.tweener
      .clear()
      .to({x:this.changeLife.x,y:this.changeLife.y, scaleX:0,scaleY:0,rotation:360}, 200,)
      .call(function() {

        SoundManager.play("up");

        var exLabel = Label().addChildTo(this.layer1);
        exLabel.text = 'HPかいふく!';
        exLabel.fill = '#FFFFFF'; // 色を変更
        exLabel.strokeWidth = 8;
        exLabel.fontSize = 108; // フォントサイズを変更
        exLabel.fontFamily = 'def';
        exLabel.scaleX = 0;
        exLabel.scaleY = 0;
      
        exLabel.setPosition(this.gridX.center(),this.gridY.center(-4));

        exLabel.tweener
          .clear()
          .to({scaleX:1,scaleY:1}, 200, 'easeOutCubic')
          .wait(500)
          .call(function() {
            GameMain.player.cure(cureValue);
            this.sceneEnd();
          }, this)

          this.changeLife.tweener
          .clear()
          .to({x:this.gridX.center(),y:this.gridY.center(),scaleX:1.5,scaleY:1.5}, 200, 'easeOutCubic')
          ;


      }, this)
      ;

  },



  equipmentItem: function(){

    this.yazirusiUp.remove();
    this.irekaeLabel.remove();
    this.yazirusiRight.remove();
    this.yazirusiLeft.remove();
    this.modosuLabel.remove();

    this.itemObject.setInteractive(false);

    this.exItemObject.remove();
    this.itemObject.viewDetail();

    this.itemObject.setPosition(this.gridX.center(),this.gridY.center(-4));
    this.itemObject.scaleX = 2;
    this.itemObject.scaleY = 2;


    if(this.itemObject.type === "wepon"){
      GameMain.player.setWepon(this.itemObject.item);
    }
    if(this.itemObject.type === "shield"){
      GameMain.player.setShield(this.itemObject.item);
    }
    if(this.itemObject.type === "gem"){
      GameMain.player.setGem(this.itemObject.item);
    }

    this.itemObject.tweener
      .clear()
      .to({scaleX:1,scaleY:1}, 400, 'easeOutCubic')
      .call(function() {

      }, this)
  ;

  SoundManager.play("sobi");

    var exLabel = Label().addChildTo(this.layer1);
    exLabel.text = 'そうび!';
    exLabel.fill = '#FFFFFF'; // 色を変更
    exLabel.strokeWidth = 8;
    exLabel.fontSize = 108; // フォントサイズを変更
    exLabel.fontFamily = 'def';
    exLabel.scaleX = 0;
    exLabel.scaleY = 0;
    

    exLabel.setPosition(this.gridX.center(),this.gridY.center());

    exLabel.tweener
      .clear()
      .to({scaleX:1,scaleY:1}, 200, 'easeOutCubic')
      .wait(500)
      .call(function() {
        this.sceneEnd();
      }, this)

    ;

  },
  
  removeItem: function(){

    this.yazirusiUp.remove();
    this.irekaeLabel.remove();
    this.yazirusiDown.remove();
    this.modosuLabel.remove();


    this.itemObject.setInteractive(false);

    this.itemObject.tweener
      .clear()
      .to({x:this.tresure.x,y:this.tresure.y, scaleX:0,scaleY:0,rotation:360}, 300,)
      .call(function() {

        this.tresureSS.gotoAndPlay('close');
        this.tresure.tweener
        .clear()
        .by({scaleX:-0.1,scaleY:-0.1}, 100)
        .by({scaleX:0.1,scaleY:0.1}, 100)

      }, this)
      .wait(500)
      .call(function() {
        this.sceneEnd();
      }, this)


      ;


  },

  sceneEnd: function(){
    SoundManager.setVolumeMusic(0.8);
    this.exit();    
  }
  

});


phina.define('ItemObject', {
  superClass: 'DisplayElement',
  
  init: function(item) {
      this.superInit();

      this.width = 200;
      this.height = 200;

      this.window = Sprite('window').addChildTo(this);
      this.window.setSize(200, 200);



      if(!item){


  
        this.detail = Label().addChildTo(this);
        this.detail.text = 'なし ';

        this.detail.align = 'left';
        this.detail.fill = '#FFFFFF'; // 色を変更
        this.detail.strokeWidth = 8;
        this.detail.fontSize = 43; // フォントサイズを変更
        this.detail.fontFamily = 'def';
        this.detail.y = -35;
        this.detail.x = 115;
        this.item = item;
        this.detail.scaleX = 0;


      }else{

        this.itemImage = Sprite(item.name).addChildTo(this);
        this.type = item.type;

        if(this.type == "gem"){
          this.itemImage.setSize(100, 100);
        }
        if(this.type == "shield"){
          this.itemImage.setSize(200, 200);
  
        }
        if(this.type == "wepon"){
          this.itemImage.setSize(200, 200);
          this.itemImage.rotation = 45; 
          this.itemImage.y = -20;
          this.itemImage.origin.set(0.4,0.45);
    
        }
  
  
        this.detail = Label().addChildTo(this);
        this.detail.text = 'レベル ' +　item.level;
        if(item.attack > 0){
          this.detail.text += '\nこうげき +' + item.attack;
        }
        if(item.attack < 0){
          this.detail.text += '\nこうげき ' + item.attack;
        }
        if(item.defense > 0){
          this.detail.text += '\nぼうぎょ +' + item.defense;
        }
        if(item.defense < 0){
          this.detail.text += '\nぼうぎょ ' + item.defense;
        }

        if(this.type == "wepon"){
          var wtext;

          switch (item.weight) {
            case 0:
              wtext = "ライト";
              break;

            case 1:
              wtext = "ミドル";
              
              break;
            case 2:
　            wtext = "ヘビー";
              
              break;
          
            default:
              break;
          }

          this.detail.text += '\nおもさ ' + wtext;
        }


        this.detail.align = 'left';
        this.detail.fill = '#FFFFFF'; // 色を変更
        this.detail.strokeWidth = 8;
        this.detail.fontSize = 33; // フォントサイズを変更
        this.detail.fontFamily = 'def';
        this.detail.y = -35;
        this.detail.x = 115;
        this.item = item;
        this.detail.scaleX = 0;

        
      }


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

  
});