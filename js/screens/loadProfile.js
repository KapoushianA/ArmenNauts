game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            //loads the load-screen for the background screen
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO
	        document.getElementById("input").style.visibility = "visible";
                document.getElementById("load").style.visibility = "visible";
        
                //unbinds the keys to provent the use
                me.input.unbindKey(me.input.KEY.B);
                me.input.unbindKey(me.input.KEY.Q);
                me.input.unbindKey(me.input.KEY.E);
                me.input.unbindKey(me.input.KEY.W);
                me.input.unbindKey(me.input.KEY.A);
                
                me.game.world.addChild(new (me.Renderable.extend({
                    //sets the font, color, size and area of the text, like i already said
                    init: function(){
                        this._super(me.Renderable, 'init', [10, 10, 250, 50]);
                        this.font = new me.Font("Arial", 23, "white");
                    },
                    //says ENTER USERNAME AND PASSWORD on the screen
                    draw: function(renderer){
                       this.font.draw(renderer.getContext(), "ENTER USERNAME AND PASSWORD", this.pos.x, this.pos.y);
                   }
                })));
                       
        },

	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("load").style.visibility = "hidden";
        }
});

