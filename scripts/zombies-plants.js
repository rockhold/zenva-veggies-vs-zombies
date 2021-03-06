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

    Q.plantTypes = {
        carnivorous: {
            asset: "carnivorousplant.png",
            cost: 100,
            energy: 10,
            isShooter: true,
            shootingFrequency: 3,
            damage: 2
        },
        corn: {
            asset: "corn.png",
            cost: 150,
            energy: 20,
            isShooter: true,
            shootingFrequency: 5,
            damage: 3
        },
        chilli: {
            asset: "chilli.png",
            cost: 50,
            energy: 10,
            isExploding: true,
            damage: 50
        },
        sunflower: {
            asset: "sunflower.png",
            cost: 75,
            energy: 15,
            isSunProducer: true,
            sunFrequency: 10
        }
    };

    Q.Sprite.extend("Plant", {
        init: function(p) {
            this._super(p, {
                type: Q.SPRITE_PLANT
            });

            this.add("2d");

            if (this.p.isShooter) {
                this.p.timeToShoot = this.p.shootingFrequency;
            }

            if (this.p.isSunProducer) {
                this.p.timeToSun = this.p.sunFrequency;
            }
        },

        step: function(dt) {
            if (this.p.isShooter) {
                this.p.timeToShoot -= dt;

                if (this.p.timeToShoot <= 0) {
                    this.p.timeToShoot = this.p.shootingFrequency;

                    // create bullet
                    this.stage.insert(new Q.Bullet({
                        x: this.p.x,
                        y: this.p.y,
                        damage: this.p.damage
                    }));
                }
            }

            if (this.p.isSunProducer) {
                this.p.timeToSun -= dt;

                if (this.p.timeToSun <= 0) {
                    this.p.timeToSun = this.p.sunFrequency;

                    Q.stage(1).insert(new Q.Sun({
                        x: this.p.x - 50 + 100 * Math.random(),
                        y: this.p.y,
                        finalY: this.p.y,
                        vy: 0
                    }));
                }
            }

            if (this.p.energy <= 0) {
                this.destroy();
            }
        },

        takeDamage: function(damage) {
            this.p.energy -= damage / 50;
        }
    });

    Q.Sprite.extend("Bullet", {
        init: function(p) {
            this._super(p, {
                type: Q.SPRITE_BULLET,
                asset: "bullet.png",
                vx: 300
            });

            this.add("2d");
            console.log("In Bullet ctor...");
        },

        step: function(dt) {
            // destroy if out of range
            if (this.p.x >= 1110) {
                this.destroy();
            }
        }
    });
};