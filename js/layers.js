addLayer("s", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FAFAFA",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "seconds", // Name of prestige currency
    baseResource: "time shards", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: .5, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for seconds", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:  {

        11: {
            title: "A Second second",
            description: "Multiply time shard gain for each second owned.",
            cost: new Decimal(2),
            effect() {
                return Math.pow(1.5, player[this.layer].points);
            },        
            effectDisplay() { return "*"+format(this.effect()) }, // Add formatting to the effect
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            branches: [12],
            tooltip: "Effect: * 1.5^s",
        },
        12: {
            title: "Five Second Rule",
            description: "Seconds boost base time shard gain.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).log(5).dividedBy(5);
            },        
            effectDisplay() { return "+"+format(this.effect()) },
            unlocked() { return (hasUpgrade(this.layer, 11))}, // The upgrade is only visible when this is true
            tooltip: "Effect: + log5(1+s)/5",
        },
    },
})
