game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            //loads the screen for the new profile
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
	        document.getElementById("input").style.visibility = "visible";
                document.getElementById("register").style.visibility = "visible";
                
                //unbinds the keys to prevent the use for these keys.
                me.input.unbindKey(me.input.KEY.B);
                me.input.unbindKey(me.input.KEY.Q);
                me.input.unbindKey(me.input.KEY.E);
                me.input.unbindKey(me.input.KEY.W);
                me.input.unbindKey(me.input.KEY.A);
                
                me.game.world.addChild(new (me.Renderable.extend({
                    //sets the color, font, size, and area for the texts
                    init: function(){
                        this._super(me.Renderable, 'init', [10, 10, 250, 50]);
                        this.font = new me.Font("Arial", 23, "white");
                    },
                    //it loads the texts
                    draw: function(renderer){
                       this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", this.pos.x, this.pos.y);
                   }
                })));
                       
        },

	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
                document.getElementById("register").style.visibility = "hidden";
        }
});



