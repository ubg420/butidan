phina.define('ComboUI', {
    superClass: 'DisplayElement',
  
    init: function(combo) {
      this.superInit();


      this.comboCount = 0;
      this.comboMax = 0;
      
      this.comboTimer = 0;
      this.comboRemit = 80;
      
      this.comboLabel = Label('').addChildTo(this);
      this.comboLabel.fill = '#FFFFFF'; // 色を変更
      this.comboLabel.strokeWidth = 8;
      this.comboLabel.fontSize = 33; // フォントサイズを変更
      this.comboLabel.y = 65;
      this.comboLabel.fontFamily = 'def';

      this.countLabel = Label('').addChildTo(this);
      this.countLabel.fill = '#FFFFFF'; // 色を変更
      this.countLabel.strokeWidth = 8;
      this.countLabel.fontSize = 80; // フォントサイズを変更
      this.countLabel.fontFamily = 'e_bullet';
      this.countLabel.fontFamily = 'def';
      this.countLabel.scaleY = 0;



      this.expBonus = Label('').addChildTo(this);
      this.expBonus.fill = '#FFFFFF'; // 色を変更
      this.expBonus.strokeWidth = 8;
      this.expBonus.fontSize = 23; // フォントサイズを変更
      this.expBonus.y = 115;
      this.expBonus.fontFamily = 'def';
      this.expBonus.value = 0;

      this.itemBonus = DisplayElement().addChildTo(this);
      this.itemBonus.value = 0;
      this.itemBonus.alpha = 0;
      this.itemBonus.y = 160;
      this.itemBonus.icon = Sprite('treasure').addChildTo(this.itemBonus);
      this.itemBonus.icon.x = -30;
      this.itemBonus.anim = FrameAnimation('treasureSS').attachTo(this.itemBonus.icon);
      this.itemBonus.anim.gotoAndPlay('close');
      this.itemBonus.anim.fit = false;
      this.itemBonus.label = Label().addChildTo(this.itemBonus);
      this.itemBonus.label.x = 40; // 色を変更
      this.itemBonus.label.fill = '#FFFFFF'; // 色を変更
      this.itemBonus.label.strokeWidth = 8;
      this.itemBonus.label.fontSize = 23; // フォントサイズを変更
      this.itemBonus.label.fontFamily = 'def';


      this.timer = 0;

    },
  
    update: function() {

      if(this.comboCount > 0){
        this.comboTimer++;
        if(this.comboTimer > this.comboRemit){
          this.resetCombo();
        }
      }
  
    },
    
    addCombo:function(){

      this.comboCount++;

      this.comboTimer = 0;

      this.comboLabel.text='COMBO';
      this.countLabel.text=this.comboCount;
      this.countLabel.scaleY = 0;

      this.setBonus();

      this.countLabel.tweener.clear()
      .to({scaleY:1},200,'easeOutBack');

    },

    resetCombo:function(){

      if(this.comboMax < this.comboCount){
        this.comboMax = this.comboCount;
      }

      this.comboCount = 0;
      this.comboTimer = 0;    
      this.comboLabel.text = "";
      this.countLabel.text = "";
      this.expBonus.text= "";
      this.expBonus.value = 0;
      this.itemBonus.alpha= 0;
      this.itemBonus.value = 0;

    },

    setBonus:function(){



      if(this.comboCount % 20 == 0){

        this.itemBonus.value+=10;
        this.itemBonus.alpha = 1;
        this.itemBonus.x = 400;
        this.itemBonus.label.text = "+" + this.itemBonus.value + "%"
        this.itemBonus.tweener.clear()
        .to({x:0},250,'easeOutBack');



    //  }else if(this.comboCount % 10 == 0){
      }if(this.comboCount % 10 == 0){


        this.expBonus.value += 20;

        this.expBonus.text = "EXP +" + this.expBonus.value +"%";
        this.expBonus.x = 400;

        this.expBonus.tweener.clear()
        .to({x:0},200,'easeOutBack');

        
      }

    }
    
  });