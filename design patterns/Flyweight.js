class Zombie {
    constructor(lootTable) {
        this.lootTable = lootTable
    }

    getLootTable(){
        return this.lootTable
    }
}


function main(){
    let loot = { "Sword": 2,"Coins": 3}
    let Zombie1 = new Zombie(loot)
    let Zombie2 = new Zombie(loot)

    console.log("Zombie 1 loot:", Zombie1.getLootTable())
    console.log("Zombie 2 loot:", Zombie2.getLootTable())

    Zombie1.getLootTable().Coins = 5
    console.log("After modification:")
    console.log("Zombie 1 loot:", Zombie1.getLootTable())
    console.log("Zombie 1 loot:", Zombie2.getLootTable())
}
main()