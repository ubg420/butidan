phina.define('Player', {
superClass: 'DisplayElement',

init: function() {
    this.superInit();
    this.index = 1;
    this.vx = 0;
    this.vy = 0;
    this.setSize(30,30);

    this.mode = 'normal';

    this.defalutHp = 10;
    this.defalutStr = 11;

    this.defalutDef = 1;

    this.levelUpStrValue = 1.5;
    this.levelUpHpValue = 3;
    this.levelUpDefValue = 1;

    this.speedMax = 50;
    this.attackSpeed = 45;
    this.kaitenHitAcceleration = 1.3;

    //アクションで消費するスタミナ値
    this.kaitenStCost = 23;
    this.attackStCost = 5;
    this.tameAttackStCost = 20;
    //ダメージを与えたときのスタミナ回復値
    this.hitCureSt = 8;

    this.parryFLG = false;

    //
    this.kaitenTime = 600;
    this.tameAttackLimit = 30;
    this.parryLimit = 6;

    //ダメージ無敵時間上限
    this.damageMutekiRemit = 45;
    this.damageTimer = 0;
    this.tameTimer = 0;
    this.TAMELIMIT = 5;

    this.damageFLG = false;

    //スピード減少率
    //this.friction  = 0.995;
   // this.friction  = 0.998;
    //this.friction  = 0.99;
    this.friction  = 0.995;


    //レベルと装備のセット
    /*
    this.level = 1;
    this.exp = 0;
    */
    this.loadLevel();
    this.expCount = 0;
    this.setStatus(this.level);
    this.hp = this.maxHp;
    this.maxSt = 100;
    this.st = this.maxSt;

    this.wepon = null;
    this.shield = null;
    this.gem = null;


    this.weponSprite = Sprite('sord').addChildTo(this);
    this.weponSprite.setSize(158, 158);
    this.weponSprite.x = 54;
    this.weponSprite.origin.set(0.5,0.9);
    this.loadWepon();
    /*
    var _wepon = Item(ITEMDATA[0],1);
    this.setWepon(_wepon);
    */
    this.sprite = Sprite('hero').addChildTo(this);
    this.spriteSS= FrameAnimation('hero_SS')
    this.spriteSS.attachTo(this.sprite);
    this.spriteSS.gotoAndPlay('fall');
    this.spriteSS.fit = false;
    this.sprite.setSize(158, 158);


    this.shieldSprite = Sprite('shield').addChildTo(this);
    this.shieldSprite.alpha = 0;
    this.shieldSprite.setSize(100, 100);
    this.shieldSprite.x = -32;
    this.shieldSprite.origin.set(0.5,0.5);
    /*
    var _shield = Item(ITEMDATA[4],1);
    this.setShield(_shield);
    */
    this.loadShield();

    this.loadGem();
    

    this.colision = RectangleShape().addChildTo(this);
    this.colision.width = this.width;
    this.colision.height = this.height;
    this.colision.alpha = 0; //コリジョン可視化 = 1
    this.colision.fill = "red";


},

update: function(app) {
    this.colision.width = this.width;
    this.colision.height = this.height;

    var p = app.pointer;

    switch (this.mode) {
        case 'attack':
            
            break;      
        case 'kaiten':
            
            break;      

        case 'tame':
            this.tameTimer++;              

            var p = app.pointer;
            this.tame(p);
            this.changeSt(0.5);

            break;


        default:
            this.changeSt(0.5);



            break;
    }


    if(this.damageFLG){
        this.damageTimer++;

        if(this.damageTimer % 2 ==0){
            this.sprite.alpha = 0.2;
            this.weponSprite.alpha = 0.2;

        }
        if(this.damageTimer % 4 ==0){
            this.sprite.alpha = 1;
            this.weponSprite.alpha = 1;

        }

        if(this.damageTimer > this.damageMutekiRemit){
            this.damageTimer = 0;
            this.damageFLG = false;
            this.sprite.alpha = 1;
            this.weponSprite.alpha = 1;

        }

    }


    if(this.mode != "die"){
        this.move();
    }
},
  



setWepon:function(item){

    this.wepon = item;
    switch (item.weight) {
        case 0:
            
            this.friction  = 0.9975;
            this.kaitenTime = 600;

            this.kaitenStCost = 16;
            this.attackStCost = 4;
            this.tameAttackStCost = 15;
            this.hitCureSt = 5;

            break;
        case 1:

            this.friction  = 0.993;
            this.kaitenTime = 500;

            this.kaitenStCost = 19;
            this.attackStCost = 4;
            this.tameAttackStCost = 17;
            this.hitCureSt = 8;



            break;
        case 2:
            this.friction  = 0.98;
            this.kaitenTime = 400;

            this.kaitenStCost = 23;
            this.attackStCost = 5;
            this.tameAttackStCost = 20;
            this.hitCureSt = 8;



            break;
    
        default:
            break;
    }


    this.weponSprite.setImage(item.name);
    this.weponSprite.setSize(158, 158);

},

setShield:function(item){


    if(!this.shield){
        this.shieldSprite.alpha = 1;        
    }
    this.shield = item;
    this.shieldSprite.setImage(item.name);
    this.shieldSprite.setSize(100, 100);


},

setGem:function(item){

    this.gem = item;

},

changeSt:function(value){
    this.st += value;
    if(this.st > this.maxSt){
        this.st = this.maxSt;
    }
    if(this.st < 0){
        this.st = 0;
    }
    
    GameMain.mainUI.changeSt(this.maxSt,this.st);
},

damage:function(enemyPower){
    
    SoundManager.play("playerDamage");

    var hiteffect = HitEffect('hitr','hitSS').addChildTo(GameMain.effectGroup);
    hiteffect.x = this.x;
    hiteffect.y = this.y;
    hiteffect.setSize(200, 200);

    
    var hiteffect2 = HitEffect('hit2r','hit2SS').addChildTo(GameMain.effectGroup);
    hiteffect2.x = this.x;
    hiteffect2.y = this.y;
    hiteffect2.setSize(164, 164);

    GameMain.comboUI.resetCombo();
    this.resetMode();

    this.damageFLG = true;
    this.sprite.alpha = 0.5;

    this.vx *= -1.1;
    this.vy *= -1.1;

    var maxSpeed = 10;
    if(this.vx > maxSpeed){
        this.vx = maxSpeed;
    }
    if(this.vx < -maxSpeed){
        this.vx = -maxSpeed;
    }
    if(this.vy > maxSpeed){
        this.vy = maxSpeed;
    }
    if(this.vy < -maxSpeed){
        this.vy = -maxSpeed;
    }


    var randamDamage= Math.floor( Math.random() * 66 ) + 139;

    var def = this.getDefensePower();
   // var def = 3;

    /*
    var damageValue =  Math.round((enemyPower  - def)* (randamDamage /156));
    */
    //(攻撃力 / 2) - (防御力 /4) *乱数
    var damageValue =  Math.round( ((enemyPower /2) - (def /4)) * (randamDamage /156));

    if(damageValue <= 0){
        damageValue = 1;
    }

//    var damageValue = enemyPower;

    this.hp -= damageValue;
    if(this.hp <= 0){
        this.hp = 0;
        this.die();

    }

    var damageLabel = DamageLabel(damageValue,'#ff8c00').addChildTo(GameMain.effectGroup);
    damageLabel.setPosition(this.x,this.y);

    GameMain.mainUI.changeHp(this.maxHp,this.hp);


},

cure:function(cureValue){

    this.hp += cureValue;
    if(this.hp >= this.maxHp){
        this.hp = this.maxHp;
    }

    var damageLabel = DamageLabel(cureValue,'limegreen').addChildTo(GameMain.effectGroup);
    damageLabel.setPosition(this.x,this.y);
    GameMain.mainUI.changeHp(this.maxHp,this.hp);

},

die: function(){
    this.damageFLG = false;
    GameMain.gameoverFLG = true;


    this.sprite.alpha = 1;

    this.mode = "die";
    this.tweener.clear()
    .to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT/2,rotation:360,scaleX:2,scaleY:2},700,"easeOutCubic")
    .to({y:SCREEN_HEIGHT + 300,rotation:180},700,"easeInCubic")
    .call(function() {
        GameMain.gameover();

    }, this);


},

attack: function(p) {
    SoundManager.play("attack");

    this.parryFLG = false;
    this.changeSt(-this.attackStCost);

    var v = Vector2.sub(p, this);
    this.setSize(100,100);
    this.weponSprite.tweener.clear();


    //向きを設定
    var angle = v.toAngle().toDegree();
    if(angle > 90 && angle < 260){
        this.rotation = angle + 180;
        this.sprite.scaleX = -1;

        this.weponSprite.scaleX = -1;
        this.weponSprite.rotation = -90;
        this.weponSprite.x = -54;



    }else{
        this.rotation = angle;
        this.sprite.scaleX = 1;

        this.weponSprite.scaleX = 1;
        this.weponSprite.rotation = 90;
        this.weponSprite.x = 54;



    }


    //進行方向の設定
    /*
    this.dx = this.x - p.x;
    this.dy = this.y - p.y;
    this.vx = -(this.dx / 20);
    this.vy = -(this.dy / 20);
    */

    this.vx = Math.cos(angle * Math.PI / 180) * this.attackSpeed;
    this.vy = Math.sin(angle * Math.PI / 180) * this.attackSpeed;

    this.mode = 'attack';
    this.spriteSS.gotoAndPlay('attack');


    var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
    hiteffect.x = this.x;
    hiteffect.y = this.y;
    hiteffect.setSize(150,150)

    /*
    var self = this;
    this.tweener.clear()
    .wait(500)
    .wait(100)
    .call(function() {
        self.resetMode();

    }, this)
    ;
    */
},


kaiten: function(){
    this.parryFLG = false;

    SoundManager.play("kaiten");

    this.changeSt(-this.kaitenStCost);

    this.mode = "kaiten";

    this.setSize(220,220);

    this.kaitenEffect = Sprite('kaiten2').addChildTo(this);
    this.kaitenEffect.setSize(350, 350);

    var kaitenTime = this.kaitenTime;
    var self = this;
    this.kaitenEffect.tweener.clear()
    .to({
        rotation:kaitenTime /2,
    },kaitenTime)
    .call(function() {
        this.kaitenEffect.remove();
    }, this)
    ;

    this.tweener.clear()
    .by({
        rotation:kaitenTime,
    },kaitenTime)
    .call(function() {
        this.resetMode();
    }, this)
    ;


},



tameAttack: function(p) {
    this.parryFLG = false;
    SoundManager.play("daikaiten");

    this.mode = "kaiten";

    this.changeSt(-this.tameAttackStCost);

    this.setSize(220,220);

    this.kaitenEffect = Sprite('kaiten').addChildTo(this);
    this.kaitenEffect.setSize(350, 350);

    var kaitenTime = 2200;

    var self = this;
    this.kaitenEffect.tweener.clear()
    .to({
        rotation:kaitenTime /2,
    },kaitenTime)
    .call(function() {
        this.kaitenEffect.remove();
    }, this)
    ;

    this.tweener.clear()
    .by({
        rotation:kaitenTime,
    },kaitenTime)
    .call(function() {
        this.resetMode();
    }, this)
    ;





    var v = Vector2.sub(p, this);
    this.weponSprite.tweener.clear();
    var angle = v.toAngle().toDegree();



    //進行方向の設定
    /*
    this.dx = this.x - p.x;
    this.dy = this.y - p.y;
    this.vx = -(this.dx / 20);
    this.vy = -(this.dy / 20);
    */

    this.vx = Math.cos(angle * Math.PI / 180) * (this.attackSpeed * 1.5);
    this.vy = Math.sin(angle * Math.PI / 180) * (this.attackSpeed * 1.5);

    var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
    hiteffect.x = this.x;
    hiteffect.y = this.y;
    hiteffect.setSize(150,150)



    

    /*
    var self = this;
    this.tweener.clear()
    .wait(500)
    .wait(100)
    .call(function() {
        self.resetMode();

    }, this)
    ;
    */
},





resetMode:function(){
    this.weponSprite.tweener.clear();


    if(this.mode==="kaiten"){
        this.kaitenEffect.remove();
        this.tweener.clear();
    }


    this.mode = 'normal';
    this.spriteSS.gotoAndPlay('fall');
    this.rotation = 0;
    this.tameTimer= 0;
    this.weponSprite.rotation = 0;
    if(this.sprite.scaleX > 0){
        this.weponSprite.x = 54;
        this.shieldSprite.x = -34;

    }else{
        this.weponSprite.x = -54;        
        this.shieldSprite.x = 34;

    }

    this.setSize(30,30);

},


tameStart: function(p) {
    this.mode = "tame";

    SoundManager.play("syu");


    this.setRotation(p);
    
    this.spriteSS.gotoAndPlay('attack');

    this.weponSprite.rotation = 0;
    this.weponSprite.x = 0;


    
    var r = 1;
    if(this.sprite.scaleX < 0){
        r  = -1;
    }
    

    
    var slash = Parry('slash','slashSS').addChildTo(this);
    slash.x =100 *r;
    slash.scaleX = r;
    slash.y = -40;

    this.parryFLG = true;


    /*
    this.spriteSS.gotoAndPlay('attack');
    this.setRotation(p);
*/
},

tame: function(p) {
    this.setRotation(p);
    //this.spriteSS.gotoAndPlay('attack');

    if(this.tameTimer >= this.parryLimit){
        this.parryFLG = false;
        this.colision.alpha = 0;
    }

    if(this.tameTimer == this.tameAttackLimit){
        SoundManager.play("tame");

        this.spriteSS.gotoAndPlay('tame1');
    }
},


tameCheck:function(p){
    
    if(this.tameTimer < this.TAMELIMIT){

        if(this.st >= this.kaitenStCost){
            this.kaiten();
          }else{
            this.resetMode();

            var damageLabel = DamageLabel("スタミナぎれ",'yellow').addChildTo(GameMain.effectGroup);
            damageLabel.setPosition(this.x,this.y);


        }


    }else{
        this.attack(p);
        if(this.tameTimer > this.tameAttackLimit){
            this.tameAttack(p);
        }

    }

},

setRotation:function(p){

    var v = Vector2.sub(p, this);

    var angle = v.toAngle().toDegree();

    if(angle > 90 && angle < 260){
        this.rotation = angle + 180;
        this.leftFacing();

    }else{
        this.rotation = angle;
        this.rightFacing();
    }



},

//左向き
leftFacing:function(){
    this.sprite.scaleX = -1;
    this.weponSprite.scaleX = -1;

    this.weponSprite.x = -54;
    this.shieldSprite.x = 34;


    if(this.mode == "tame" || this.mode == "kaiten" || this.mode == "attack"){
        this.weponSprite.rotation = -90;
        this.shieldSprite.x = 4;


    }

},

//右向き
rightFacing:function(){
    this.sprite.scaleX = 1;
    this.weponSprite.scaleX = 1;

    this.weponSprite.x = 54;
    this.shieldSprite.x = -34;


    if(this.mode == "tame" || this.mode == "kaiten" || this.mode == "attack"){
        this.weponSprite.rotation = 90;
        this.shieldSprite.x = -4;

    }

},



//攻撃力計算
getAttackPower:function(){

    var itemAttackHosei = 1.4;

    var attackPower;
    attackPower = this.str  + (this.wepon.attack * itemAttackHosei) ;

    if(this.gem !== null){
        attackPower += this.gem.attack * itemAttackHosei;
    }
    if(this.shield !== null){
        attackPower += this.shield.attack * itemAttackHosei;
    }

    if(attackPower < 1){
        attackPower = 1;
    }

    return attackPower;
},

getDefensePower:function(){
    var defensePower;
    defensePower = this.def;

    defensePower += this.wepon.defense;

    if(this.shield !== null){
        defensePower += this.shield.defense;
    }
    if(this.gem !== null){
        defensePower += this.gem.defense;
    }

    if(defensePower < 0){
        defensePower = 0;
    }


    return defensePower;
},


move:function(app){
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.friction ;
    this.vy *= this.friction ;

    if (this.left < 0 && this.vx < 0) {
        this.left = 0;
        this.vx *= -1;

        this.rightFacing();

        this.hitWall();

    }
    else if (this.right > SCREEN_WIDTH && this.vx > 0) {
        this.right = SCREEN_WIDTH;
        this.vx *= -1;

        this.leftFacing();

        this.hitWall();
    }

    if (this.top < 0 && this.vy < 0) {
        this.top = 0;
        this.vy *= -1;

        this.hitWall();
    }
    else if (this.bottom > SCREEN_HEIGHT && this.vy > 0) {
        this.bottom = SCREEN_HEIGHT;
        this.vy *= -1;

        this.hitWall();

    }
},

hitWall:function(){

    if(this.mode == "attack"){
        this.resetMode();
    }

    var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
    hiteffect.x = this.x;
    hiteffect.y = this.y;

},


addExp:function(exp){
    this.exp += exp;
    this.expCount += exp;

    var nextLevelExp = EXPTABLE[this.level+1];
    var levelUpFLG = false;

    //レベルアップ判定
    while (this.exp >= nextLevelExp) {

        if(this.level >= 8000){
            break;
        }

        this.levelUp();
        nextLevelExp = EXPTABLE[this.level+1];
        levelUpFLG = true;
    }

    if(levelUpFLG){
        //レベルアップ表示とUIのレベルの変更
/*
        var levelUpLabel = Label('LevelUP').addChildTo(GameMain.backLayer);
        levelUpLabel.fill = '#ffffff'; // 色を変更
        levelUpLabel.strokeWidth = 8;
        levelUpLabel.fontSize = 80; // フォントサイズを変更
        levelUpLabel.x = this.x;
        levelUpLabel.y = this.y;
        levelUpLabel.scaleX = 0;
        levelUpLabel.scaleY = 0;
        levelUpLabel.fontFamily = 'def';
    
        levelUpLabel.tweener.clear()
        .to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT/2,scaleX:1,scaleY:1},700,"easeOutCubic")
        .to({scaleY:0},300,"easeInCubic")
        .call(function() {
            levelUpLabel.remove();
        }, this);
*/


        var levelUpLabel = Label('LEVEL').addChildTo(GameMain.backLayer);
        levelUpLabel.fill = '#ffffff'; // 色を変更
        levelUpLabel.strokeWidth = 8;
        levelUpLabel.fontSize = 60; // フォントサイズを変更
        levelUpLabel.x = this.x;
        levelUpLabel.y = this.y;
        levelUpLabel.scaleX = 0;
        levelUpLabel.scaleY = 0;
        levelUpLabel.fontFamily = 'def';
    
        levelUpLabel.tweener.clear()
        .to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT/2 -200,scaleX:2,scaleY:2},500,"easeOutBack")
        .wait(500)
        .to({scaleY:0,scaleX:4},300,"easeOutCubic")
        .call(function() {
            levelUpLabel.remove();
        }, this);

        var levelUpLabel2 = Label('UP').addChildTo(GameMain.backLayer);
        levelUpLabel2.fill = '#ffffff'; // 色を変更
        levelUpLabel2.strokeWidth = 8;
        levelUpLabel2.fontSize = 60; // フォントサイズを変更
        levelUpLabel2.x = this.x;
        levelUpLabel2.y = this.y;
        levelUpLabel2.scaleX = 0;
        levelUpLabel2.scaleY = 0;
        levelUpLabel2.fontFamily = 'def';
    
        levelUpLabel2.tweener.clear()
        .wait(200)
        .to({x:SCREEN_WIDTH/2,y:SCREEN_HEIGHT/2,scaleX:3,scaleY:3},500,"easeOutBack")
        .wait(300)
        .to({scaleY:0,scaleX:6},300,"easeOutCubic")
        
        .call(function() {
            levelUpLabel.remove();
        }, this);




        GameMain.mainUI.levelCountLabel.text = this.level;

        //レベルアップで増加したHPゲージ変更
        GameMain.mainUI.changeHp(this.maxHp,this.hp);

    }

},

levelUp:function(){
    SoundManager.play("levelup");

    this.level++;
    this.setStatus(this.level);
    this.hp += this.levelUpHpValue;
    if(this.maxHp < this.hp){
        this.hp = this.maxHp;      
    }
},

setStatus:function(level){
    this.maxHp = this.defalutHp + level * this.levelUpHpValue;
    this.str = this.defalutStr + level * this.levelUpStrValue;
    this.def = this.defalutDef + level * this.levelUpDefValue;

    
},

loadLevel:function(){

    var level = localStorage.getItem("level");
    var exp = localStorage.getItem("exp");

    if(!level){
        this.level = 1;
        this.exp = 0;
    }else{
        this.level = parseInt(level);
        this.exp = parseInt(exp);
    }
    
},

loadWepon:function(){

    var weponId = localStorage.getItem("weponId");
    var weponLevel = localStorage.getItem("weponLevel");

    if(!weponId){
        this.setWepon(Item(ITEMDATA[0],1));
    }else{
        this.setWepon(Item(ITEMDATA[parseInt(weponId)],parseInt(weponLevel)));
    }
    
},

loadShield:function(){

    var shieldId = localStorage.getItem("shieldId");
    var shieldLevel = localStorage.getItem("shieldLevel");

    if(!shieldId){

    }else{
        this.setShield(Item(ITEMDATA[parseInt(shieldId)],parseInt(shieldLevel)));
    }
    
},
loadGem:function(){

    var gemId = localStorage.getItem("gemId");
    var gemLevel = localStorage.getItem("gemLevel");

    if(!gemId){

    }else{
        this.setGem(Item(ITEMDATA[parseInt(gemId)],parseInt(gemLevel)));
    }
    
},

});


phina.define('Parry', {
    superClass: 'Sprite',
    
        init: function(img,ss) {
            this.superInit(img);

    
            this.anim = FrameAnimation(ss).attachTo(this);
            this.anim.gotoAndPlay('run');
            this.anim.fit = false;

            
            this.width = 150;
            this.height = 150;




            
            

        },
    
        update: function(app) {
            
            if (this.anim.finished) { 
                this.remove();
            }

    
        },
    
        hitCheck: function(){



            GameMain.enemyGroup.children.each(function(enemy) {

                switch (enemy.mode) {

                  case "fire":
                  
                    if (this.hitTestElement(enemy)) {
                      if(GameMain.player.mode === "tame"){

                        enemy.vx *= -1;
                        enemy.vy *= -1;

                      }
                    }
          
                    break;
          
                  case "attack":
                  /*
                    if (this.player.hitTestElement(enemy)) {
          
                      if(this.player.mode == "attack" ){
                        enemy.kakiin();
                        this.player.vx *= -1;
                        this.player.vy *= -1;
                        this.player.resetMode();
          
                        
                        var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
          
                        hiteffect.x = enemy.x;
                        hiteffect.y = enemy.y;
                        hiteffect.setSize(164, 164);
          
                      }
                      else if(this.player.mode == "kaiten"){
                        enemy.kakiin();
          
                        this.player.vx *= -1;
                        this.player.vy *= -1;
          
                        var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
          
                        hiteffect.x = enemy.x;
                        hiteffect.y = enemy.y;
                        hiteffect.setSize(164, 164);
          
                      }
                      else if(this.player.mode !== "die"){
                        if(!this.player.damageFLG){
                          this.player.damage(enemy.attack);
                        }
                      }
                    }
                    */
                    break;
          
                  default:
          
          
                    break;
                }
          
                if(enemy.mode !== "knockBack"){
          
                }
              }, this);
          
          


        },
    
});