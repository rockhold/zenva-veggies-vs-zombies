Quintus.ZombiesGUI = function(Q) {
    Q.UI.Container.extend("SidePanel", {
        init: function() {
            this._super({
                fill: "#E1DEB7",
                x: 120/2,
                y: 720/2,
                radius: 0,
                border: 0,
                shadow: 0,
                w: 120,
                h: 720
            });

            this.on("inserted");

            var panel = this;
            Q.state.on("change.sun", function() {
                panel.refreshStats();
            });
        },

        inserted: function() {
            var sun = new Q.Sprite({
                asset: "sun.png",
                x: 60,
                y: 40
            });
            this.stage.insert(sun);

            this.totalSun = new Q.UI.Text({
                x: 60,
                y: 100,
                label: " "
            });
            this.stage.insert(this.totalSun);

            this.refreshStats();
        },

        refreshStats: function() {
            this.totalSun.p.label = Q.state.get("sun") + "";
        }
    });
};