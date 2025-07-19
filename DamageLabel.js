phina.define('DamageLabel', {
    superClass: 'Label',
  
    init: function(text,color) {
      this.superInit();

      if(color == null){
        this.fill = '#FFFFFF'; // 色を変更        
      }else{
        this.fill = color; // 色を変更
      }

      this.text = text;
      this.strokeWidth = 8;
      this.fontSize = 73; // フォントサイズを変更
      this.fontFamily = 'def';

      this.scaleX = 0;
      this.scaleY = 0;

      this.tweener.clear()
      .by({y:-110,scaleX:1,scaleY:1},500,'easeOutBack')
      .by({y:-110,scaleX:-1,scaleY:-1},300 ,'easeInCubic')
      .call(function() {
        this.remove();
      }, this);

    },
  
    update: function() {

  
    },
    

    
  });