phina.globalize();

var MAJOR_VERSION = 1;
var MINOR_VERSION = 2;
var BUILD_VERSION = 1;

var SCREEN_WIDTH    = 900;
var SCREEN_HEIGHT   = 1400;
var Group;
var ObjectGroup;
var EffectGroup;

var StartFloor = 1;

var ColisionGroup;

var GameMain;

var LIGHTMAX = 155;

var SPEED;

var FRICTION = 0.99;

var ASSETS = {
  image: {
    'slime': 'img/slime.png',
    'slimeB': 'img/slimeB.png',
    'slimeR': 'img/slimeR.png',

    //'shield': 'img/shield.png',
    'shield': 'img/tetushield.png',
    'spikeshield': 'img/spikeshield.png',
    'holyshield': 'img/holyshield.png',

    'hero': 'img/hero.png',
    'back': 'img/back3.png',
    'wall': 'img/wall2.png',
    'hit' : 'img/hit_1.png',
    'hitr' : 'img/hit_1r.png',

    'kaiten' : 'img/kaiten.png',
    'kaiten2' : 'img/kaiten2.png',
    'kaitenred' : 'img/kaitenred.png',
    'sord' : 'img/sord.png',
    'redsord' : 'img/redsord.png',
    'axe' : 'img/axe.png',
    'coin' : 'img/coin.png',
    'treasure' : 'img/treasure.png',
    'window' : 'img/window.png',
    'yazirushi' : 'img/0071.png',
    'katana' : 'img/katana.png',
    'golem' : 'img/golem.png',
    'magician' : 'img/magician.png',
    'fireball' : 'img/fireball.png',
    'knight' : 'img/knight.png',
    'slash' : 'img/slash.png',
    'hit2' : 'img/hit2.png',
    'hit2r' : 'img/hit2r.png',
    'parry' : 'img/hit3.png',
    'sankaku' : 'img/sankaku.png',
    'irongolem' : 'img/irongolem.png',
    'daimagician' : 'img/daimagician.png',
    'blackknight' : 'img/blackknight.png',
    'redgem' : 'img/redgem.png',
    'bluegem' : 'img/bluegem.png',
    'purplegem' : 'img/purplegem.png',
    'tizyou' : 'img/tizyou.png',
    'sora' : 'img/sora1.png',
    'heart' : 'img/heart.png',
    'zimen' : 'img/zimen1.png',
    'kabe1' : 'img/kabe1.png',
    'ido1' : 'img/ido1.png',
    'logo1' : 'img/logo1.png',
    'logo2' : 'img/logo2.png',
    'yubi' : 'img/0058_4.png',
    'window_yoko' : 'img/window_yoko.png',
    'tweet' : 'img/Tweet.png',
    'cacha' : 'img/cacha.png',
    

    'maskman' : 'img/maskman.png',

    'googlePlay':'img/google-play-badge.png',

  },

  spritesheet: {
    'hero_SS': 'spriteSS/heroSS.ss',
    'maskmanSS': 'spriteSS/maskManSS.ss',
    'hitSS': 'spriteSS/hitSS.ss',
    'coinSS': 'spriteSS/coinSS.ss',
    'treasureSS': 'spriteSS/treasureSS.ss',
    'slimeSS': 'spriteSS/slimeSS.ss',
    'golemSS': 'spriteSS/golemSS.ss',
    'magicianSS': 'spriteSS/magicianSS.ss',
    'fireballSS': 'spriteSS/fireballSS.ss',
    'knightSS': 'spriteSS/knightSS.ss',
    'slashSS': 'spriteSS/slashSS.ss',
    'hit2SS': 'spriteSS/hit2SS.ss',
  },

  font:{
//    'def': './font/FAMania.ttf',
    'def': './font/FAMania.woff',
  },


  sound: {
    'Bgm':'sound/8bit-Dungeon02_loop_03.mp3',
    'damage':'sound/se_attacksword_4.mp3',
    'attack':'sound/attack2.mp3',
    'tame':'sound/tame.mp3',
    'syu':'sound/sya.mp3',
    'magic':'sound/magic.mp3',
    'fire':'sound/fire.mp3',

    'kaiten':'sound/kaiten2.mp3',
    'daikaiten':'sound/daikaiten.mp3',
    'parry':'sound/kakin.mp3',


    'get':'sound/get.mp3',
    'open':'sound/ME015-100125-get02-wav.mp3',

    'sobi':'sound/sobi.mp3',
    'playerDamage':'sound/playerDamage.mp3',


    'gameover':'sound/ME047-151031-gameover06-wav.mp3',
    'levelup':'sound/ME028-110124-get03-wav.mp3',

    'up':'sound/up.wav',
    'exp':'sound/exp.wav',



  },


};

var myscenes =  [
  {
    label: "Loading",
    className: "LoadingScene", 
    nextLabel:"Tijou",
  },
  {
    label: "Tijou",
    className: "TijouScene", 
    nextLabel:"Tutorial",
  },
  {
    label: "Tutorial",
    className: "TutorialScene", 
    nextLabel:"CountDown",
  },
  {
    label: "CountDown", 
    className: "CountDownScene", 
    nextLabel:"Main",
  },
  {
    label: "Main",
    className: "MainScene",

  },
  {
    label: "ExTutorial",
    className: "ExTutorialScene",
    nextLabel:"CountDown",
  },
];

phina.main(function() {
  var app = GameApp({
    startLabel : 'Tijou',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    scenes: myscenes,
    exitType: "auto",
    backgroundColor: "#000000",


  });
  //app.replaceScene(SceneSequence());
  app.run();
});


phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(options) {

    this.superInit(options);

    var self = this;
    // this.backgroundColor = "#F1E6EF";

    // view
    var baseLayer = DisplayElement(options).addChildTo(this);

    // ラベル
    var label = Label({
      text: "NOW LOADING...",
    })
    .addChildTo(baseLayer)
    .setPosition(this.width*0.5, this.height*0.5)
    label.tweener.clear()
    .setLoop(1)
    .to({alpha:0}, 500)
    .to({alpha:1}, 500)
    ;
    label.fill = "white";
    label.fontSize = 40;


    


  }

});






phina.define('ResultScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();
  },
});
