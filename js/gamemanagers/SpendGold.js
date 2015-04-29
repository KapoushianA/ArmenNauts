game.SpendGold = Object.extend({
   init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
   },
   
   update: function(){
       this.now = new Date().getTime();
       //checks if you pressed the buy key so you could go shopping
       if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
           this.lastBuy = this.now;
           if(!this.buying){
               //makes you buy
               this.startBuying();
           }else{
               //stops you from buying
               this.stopBuying();
           }
           
       }
       //it checks the buy keys
       this.checkBuyKeys();
       
       return true;
   },
   
   startBuying: function(){
       this.buying = true;
       //it pauses  the gaame
       me.state.pause(me.state.play);
       game.data.pausePos = me.game.viewport.localToWorld(0, 0);
       //it pulls the buyscreen background
       game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
       game.data.buyscreen.updateWhenPaused = true;
       //makes the buy screen see through
       game.data.buyscreen.setOpacity(0.8);
       me.game.world.addChild(game.data.buyscreen, 34);
       game.data.player.body.setVelocity(0, 0);
       me.state.pause(me.state.PLAY);
       //it inputs the keys for you to buy powerup
       me.input.bindKey(me.input.KEY.F1, "F1", true);
       me.input.bindKey(me.input.KEY.F2, "F2", true);
       me.input.bindKey(me.input.KEY.F3, "F3", true);
       me.input.bindKey(me.input.KEY.F4, "F4", true);
       me.input.bindKey(me.input.KEY.F5, "F5", true);
       me.input.bindKey(me.input.KEY.F6, "F6", true);
       this.setBuyText();
   },
   
   setBuyText: function(){
         game.data.buytext = new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                        this.font = new me.Font("Arial", 23, "white");
                        this.updateWhenPaused = true;
                        this.alwaysUpdate = true;
                    },
                    //sets the keys to do stuff like buying some MLG POWER UPS
                    draw: function(renderer){
                       this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                       this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + "Cost: " +((game.data.skill1 + 1) * 10), this.pos.x + 150, this.pos.y + 50);
                       this.font.draw(renderer.getContext(), "Skill 2: Run Faster. Current Level: " + game.data.skill2 + "Cost: " + ((game.data.skill2+1) * 10), this.pos.x + 160, this.pos.y + 100);
                       this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level " + game.data.skill3 + "Cost: " + ((game.data.skill3+1) * 10), this.pos.x + 170, this.pos.y + 150);
                       this.font.draw(renderer.getContext(), "Q Ability: Speed Burst Current Level: " + game.ability1 + "Cost: " + ((game.data.ability1+1) * 10), this.pos.x + 180, this.pos.y + 200);
                       this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health. Current Level: " + game.data.ability2 + "Cost: " + ((game.data.ability2+1) * 10), this.pos.x + 190, this.pos.y + 250);
                       this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear Current Level: " + game.ability3 + "Cost: " + ((game.data.ability3+1) * 10), this.pos.x + 200, this.pos.y + 300);
                    }
                }));
                me.game.world.addChild(game.data.buytext, 35);
   },
   
   stopBuying: function(){
       this.buying = false;
       //unpauses the game
       me.state.resume(me.state.play);
       //sets it so you could move again
       game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
       //removes the buy screen
       me.game.world.removeChild(game.data.buyscreen);
       //unbinds the keys
       me.input.unbindKey(me.input.KEY.F1, "F1", true);
       me.input.unbindKey(me.input.KEY.F2, "F2", true);
       me.input.unbindKey(me.input.KEY.F3, "F3", true);
       me.input.unbindKey(me.input.KEY.F4, "F4", true);
       me.input.unbindKey(me.input.KEY.F5, "F5", true);
       me.input.unbindKey(me.input.KEY.F6, "F6", true);
       me.game.world.removeChild(game.data.buytext);
   },
   //check if you bought stuff
   checkBuyKeys: function(){
       if(me.input.isKeyPressed("F1")){
           if(this.checkCost(1)){
               this.makePurchase(1);
           }
       }else if(me.input.isKeyPressed("F2")){
        if(this.checkCost(2)){
               this.makePurchase(2);
           }
       }else if(me.input.isKeyPressed("F3")){
            if(this.checkCost(3)){
               this.makePurchase(3);
           }
       }else if(me.input.isKeyPressed("F4")){
                if(this.checkCost(4)){
               this.makePurchase(4);
           }
       }else if(me.input.isKeyPressed("F5")){
                   if(this.checkCost(5)){
               this.makePurchase(5);
           }
       }else if(me.input.isKeyPressed("F6")){
            if(this.checkCost(6)){
               this.makePurchase(6);
           }
       }
   },
   //changes the price of the power up
   checkCost: function(skill){
      if(skill ===1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))){
          return true;
      }else if(skill ===2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))){
          return true;
      }else if(skill ===3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))){
          return true;
      }else if(skill ===4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))){
          return true;
      }else if(skill ===5 && (game.data.gold >= ((game.data.ability2 + 1) * 10))){
          return true;
      }else if(skill ===6 && (game.data.gold >= ((game.data.ability3 + 1) * 10))){
          return true;
       }else{
          return false;
       }
   },
   //sets the price for the power up
   makePurchase: function(skill){
      if(skill === 1){
      game.data.gold -= ((game.data.skill1 + 1) * 10);
      game.data.skill1 += 1;
      game.data.player.attack += 1;
  }else if(skill ===2){
       game.data.gold -= ((game.data.skill2 + 1) * 10);
      game.data.skill1 += 1;
  }else if(skill ===3){
       game.data.gold -= ((game.data.skill3 + 1) * 10);
      game.data.ability1 += 1;
  }else if(skill ===4){
       game.data.gold -= ((game.data.ability1 + 1) * 10);
      game.data.skill1 += 1;
  }else if(skill ===5){
       game.data.gold -= ((game.data.ability2 + 1) * 10);
      game.data.ability2 += 1;
  }else if(skill ===6){
   game.data.gold -= ((game.data.ability3 + 1) * 10);
      game.data.ability3 += 1;
  }
   }
});


