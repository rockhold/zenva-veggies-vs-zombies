Quintus.ZombiesPlants = function(Q) {
    Q.Sprite.extend("Sun", {
        init: function(p) {
            this._super(p, {
                asset: "sun.png",
                type: Q.SPRITE_SUN,
                x: 300 + Math.random() * (1080 - 360),
                y: 400
            });

            this.add("2d");

            this.on("touch");
        },

        touch: function(touch) {
            Q.state.inc("sun", 25);
            this.destroy();
        }
    });
};