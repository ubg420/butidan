phina.define('MainUI', {
    superClass: 'DisplayElement',
  
    init: function(combo) {
      this.superInit();

      //TODO: HP フロア　レベル
      this.timer = 0;
      
      this.width = SCREEN_WIDTH - 10;
      this.height = 75;

      this.x = SCREEN_WIDTH / 2;
      this.y = this.height / 2 + 22;
      
      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height =  this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1
      this.colision.fill = "black";
      this.colision.stroke = 'white';
      this.colision.strokeWidth = 8;  
      this.colision.cornerRadius = 5;  

      this.levelLabel = Label('Lv').addChildTo(this);
      this.levelLabel.fill = '#FFFFFF'; // 色を変更
      this.levelLabel.fontSize = 25; // フォントサイズを変更
      this.levelLabel.fontFamily = 'def';
      this.levelLabel.x = -370;
      this.levelLabel.y = 20;

      this.levelCountLabel = Label(GameMain.player.level).addChildTo(this.levelLabel);
      this.levelCountLabel.fill = '#FFFFFF'; // 色を変更
      this.levelCountLabel.fontSize = 43; // フォントサイズを変更
      this.levelCountLabel.fontFamily = 'def';
      this.levelCountLabel.x = 37;
      this.levelCountLabel.y = -11;

      this.levelCountLabel.align = 'left';

      this.hpUI = DisplayElement().addChildTo(this);

      this.maxHpWidth = 300;

      this.hpGauge = RectangleShape().addChildTo(this.hpUI);
      this.hpGauge.width = this.maxHpWidth;
      this.hpGauge.height =  30;
      this.hpGauge.y = 11;
      this.hpGauge.x = -155;
      this.hpGauge.alpha = 1; //コリジョン可視化 = 1
      this.hpGauge.fill = "red";
      this.hpGauge.stroke = 'white';
      this.hpGauge.strokeWidth = 11;  
      this.hpGauge.cornerRadius = 1;  
      this.hpGauge.origin.set(0,0.5);

      this.hpValueGauge = RectangleShape().addChildTo(this.hpGauge);
      this.hpValueGauge.width = this.maxHpWidth;
      this.hpValueGauge.height =  30;
      this.hpValueGauge.alpha = 1; //コリジョン可視化 = 1
      this.hpValueGauge.fill = "limegreen";
      this.hpValueGauge.stroke = 'white';
      this.hpValueGauge.strokeWidth =  0;  
      this.hpValueGauge.cornerRadius = 1;  
      this.hpValueGauge.origin.set(0,0.5);


      this.hpLabel = Label('Hp').addChildTo(this.hpUI);
      this.hpLabel.fill = '#FFFFFF'; // 色を変更
      this.hpLabel.fontSize = 25; // フォントサイズを変更
      this.hpLabel.fontFamily = 'def';
      this.hpLabel.x = -125;
      this.hpLabel.y = -22;

      this.hpValueLabel = Label(GameMain.player.hp).addChildTo(this.hpLabel);
      this.hpValueLabel.fill = '#FFFFFF'; // 色を変更
      this.hpValueLabel.align = 'left';
      this.hpValueLabel.fontSize = 25; // フォントサイズを変更
      this.hpValueLabel.fontFamily = 'def';
      this.hpValueLabel.x = 33;

      this.floorLabel = Label('F').addChildTo(this);
      this.floorLabel.fill = '#FFFFFF'; // 色を変更
      this.floorLabel.fontSize = 34; // フォントサイズを変更
      this.floorLabel.fontFamily = 'def';
      this.floorLabel.x =  385;
      this.floorLabel.y =  12;

      this.floorValueLabel = Label(GameMain.floor).addChildTo(this);
      this.floorValueLabel.fill = '#FFFFFF'; // 色を変更
      this.floorValueLabel.fontSize = 44; // フォントサイズを変更
      this.floorValueLabel.fontFamily = 'def';
      this.floorValueLabel.x =  355;
      this.floorValueLabel.y =  7;
      this.floorValueLabel.align = 'right';



      this.stHpWidth = 300;

      this.stGauge = RectangleShape().addChildTo(this.hpUI);
      this.stGauge.width = this.stHpWidth;
      this.stGauge.height =  10;
      this.stGauge.y = 51;
      this.stGauge.x = -155;
      this.stGauge.alpha = 1; //コリジョン可視化 = 1
      this.stGauge.fill = "red";
      this.stGauge.stroke = 'white';
      this.stGauge.strokeWidth = 5;  
      this.stGauge.cornerRadius = 1;  
      this.stGauge.origin.set(0,0.5);

      this.stValueGauge = RectangleShape().addChildTo(this.stGauge);
      this.stValueGauge.width = this.stHpWidth;
      this.stValueGauge.height =  12;
      this.stValueGauge.alpha = 1; //コリジョン可視化 = 1
      this.stValueGauge.fill = "yellow";
      this.stValueGauge.stroke = 'white';
      this.stValueGauge.strokeWidth =  0;  
      this.stValueGauge.cornerRadius = 1;  
      this.stValueGauge.origin.set(0,0.5);




    },
  
    update: function() {
    
    },

    changeHp:function(maxHp,hp){
      this.hpValueLabel.text = hp;
  
      var hpWidth = hp/maxHp * this.maxHpWidth;
      this.hpValueGauge.width = hpWidth;

    },

    
    changeSt:function(maxSt,st){
  
      var stWidth = st/maxSt * this.stHpWidth;
      this.stValueGauge.width = stWidth;

    },


    changeFloor:function(floor){
      this.floorValueLabel.text = floor;

    },


    
  });