phina.define("Item", {
    // 初期化
    init: function(item,level) {

        this.id = item.id;
        this.level = level;
        this.name = item.name;
        this.type = item.type;


        if(item.attack > 0){
            this.attack = Math.ceil(item.attack * this.level);
        }else{
            this.attack = Math.floor(item.attack * this.level);
        }

        if(item.defense > 0){
            this.defense = Math.ceil(item.defense * this.level);
        }else{
            this.defense = Math.floor(item.defense * this.level);
        }

        this.weight = item.weight;

    },
  });