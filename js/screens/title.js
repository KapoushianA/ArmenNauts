game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	
                me.input.bindKey(me.input.KEY.ENTER, "start");
                
                me.game.world.addChild(new (me.Renderable.extend({
                    //sets the font size, color and placement
                    init: function(){
                        this._super(me.Renderable, 'init', [510, 30, 250, 50]);
                        this.font = new me.Font("Arial", 46, "white");
                    },
                    // it creates a start game option that you can select using the pointer
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    // sets the game state to new and set the exp to 0
                    newGame: function(){
                        me.input.releasePointerEvent('pointerdown', this);
                        me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});
                        me.state.change(me.state.NEW);
                    }
                    
                })));
                
  me.game.world.addChild(new (me.Renderable.extend({
                    // sets font size, color and placement
                    init: function(){
                        this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                        this.font = new me.Font("Arial", 46, "white");
                    },
                    
                    draw: function(renderer){
                        // it creates a contine option once you click
                        this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                        
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    
                    newGame: function(){                      
                        me.input.releasePointerEvent('pointerdown', this);
                        me.state.change(me.state.LOAD);
                    }
                    
                })));
                        
                
        },

	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            }
});
