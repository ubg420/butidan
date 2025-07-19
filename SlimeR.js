phina.define('SlimeR', {
    superClass: 'Slime',
  
    init: function() {
      this.superInit();
      this.setSize(80, 80);
      
      this.sprite = Sprite('slimeR').addChildTo(this);
      this.spriteSS= FrameAnimation('slimeSS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('run');
      this.spriteSS.fit = false;

      this.sprite.setSize(120,120)

      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      // ドロップ率　1000分のdropRateの確率でアイテム出現
      this.dropRate = 10;
      
      //倍率
      this.hpMagnification = 1.4;
      this.attackMagnification = 1;
      this.expMagnification = 1.5;
      this.setLevel();

      this.weight = 1;

      
      this.maxspeed = 10;
      this.speed = this.maxspeed;;
      


    },
  

  });