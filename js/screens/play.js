game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                //it loads the level
                me.levelDirector.loadLevel("level01");   
                //resets the player location
                this.resetPlayer(0, 420);
                //checks the other files
               
                //checks the game timer manager
                var gameTimerManager = me.pool.pull("GameTimerManager",0, 0, {});
                me.game.world.addChild(gameTimerManager, 0);
                //checks the hero death manager
                var heroDeathManager = me.pool.pull("HeroDeathManager",0, 0, {});
                me.game.world.addChild(heroDeathManager, 0);
                //checks the experience manager
                var experienceManager = me.pool.pull("ExperienceManager",0, 0, {});
                me.game.world.addChild(experienceManager, 0);
                //checks the spend gold
                 var spendGold = me.pool.pull("SpendGold",0, 0, {});
                me.game.world.addChild(spendGold, 0);
                
                //inputs the keys for the use
                me.input.bindKey(me.input.KEY.B, "buy");
                me.input.bindKey(me.input.KEY.Q, "skill1");
                me.input.bindKey(me.input.KEY.W, "skill2");
                me.input.bindKey(me.input.KEY.E, "skill3");
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function() {
            //spawns you in as the player
            game.data.player = me.pool.pull("player", 0, 420, {});
            me.game.world.addChild(game.data.player, 5);
        }
        
});
