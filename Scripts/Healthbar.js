class Healthbar{
    constructor(scene, x, y, health){
        this.scene = scene
        this.currentHealth = health
        this.x = x
        this.y = y

        this.graphics = this.scene.add.graphics()
        this.newGraphics = this.scene.add.graphics()
        const healthbarBackground = new Phaser.Geom.Rectangle(x=5, y, 104, 12)
        const healthbarFill = new Phaser.Geom.Rectangle(x=7, y = 7, this.currentHealth,  8)

        this.graphics.fillStyle(0xffffff, 0.5)
        this.graphics.fillRectShape(healthbarBackground)
        this.newGraphics.fillStyle(0x3587e2, 1)
        this.newGraphics.fillRectShape(healthbarFill)
        
        this.scene.add.text(x, y=7, 'Health', {fontSize:'8px', fill: '#fff'})

    }

    updateHealth(health){
        this.newGraphics.clear()
        this.currentHealth = health
        const healthbarFill = new Phaser.Geom.Rectangle(this.x=7, this.y = 7, this.currentHealth,  8)
        this.newGraphics.fillRectShape(healthbarFill)
    }

}