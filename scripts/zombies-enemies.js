Quintus.ZombiesEnemies = function(Q) {
    Q.zombieTypes = {
        basic: {
            asset: "zombie1.png",
            vx: -8
        },

        skeleton: {
            asset: "zombie2.png",
            vx: -10
        },

        chicken: {
            asset: "chicken.png",
            vx: -20
        },

        hatzombie: {
            asset: "zombie3.png",
            vx: -9
        }
    };

    Q.Sprite.extend("Zombie", {
        init: function(p) {
            this._super(p, {
                type: Q.SPRITE_ZOMBIE,
                collisionMask: Q.SPRITE_PLANT | Q.SPRITE_BULLET,
            });

            this.add("2d");
        },

        step: function(dt) {
            // If zombie collides with home
            if (this.p.x <= 240) {
                this.destroy();

                // restart the game
                Q.stageScene("level");
            }
        }

    });
};