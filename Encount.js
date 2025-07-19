phina.define('Encount', {
    superClass: 'Sprite',
  
  /**
   * @param (data) 出現オブジェクト
   * @param (posX) 出現Ｘ座標
   */
    init: function(data,posX) {
      this.superInit('sankaku');
      this.setSize(60, 60);

      this.scaleX = 0;
      this.scaleY = 0;

      var popWidth = 100;
      
      this.obj = data;
      
      if(posX == "random"){
        this.x = Math.randint(popWidth /2, GameMain.gridX.width - popWidth);
      }else{
        this.x = posX;
      }

      this.y = GameMain.gridY.center(5);

      var moveY = GameMain.gridY.center(7.5);

      this.tweener.clear()
      .to({scaleX:1,scaleY:1,y:moveY},1200,"easeOutCubic")
      .to({scaleX:0,scaleY:0,},100,"easeInCubic")
      .call(function() {
          this.createObj();
          this.remove();
      }, this)
      ;


    },
  
    update:function(){

    },

    createObj:function(){
      var Obj = this.obj.addChildTo(GameMain.enemyGroup);
      Obj.x = this.x;
      Obj.y = SCREEN_HEIGHT + Obj.height;
      
    },



  });