class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1')
    }

    preload() {
        this.load.image('play', './Assets/play.png')
    }
    create() {
        let button = this.add.image(180, 180, 'play').setScale(2)
        button.setInteractive().on('pointerdown', () => {
            this.scene.switch('Scene2')
        })
    }
}
////////////////////////////////////////////
class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2')
    }

    preload() {

        this.load.image('BAP', './Assets/BAP.png')
        this.load.image('bitGame', './Assets/BitGame.png')
    }

    create() {

        this.add.image(180, 70, 'BAP')
        let button = this.add.image(180, 280, 'bitGame')
        button.setInteractive().on('pointerdown', () => {
            this.scene.switch('Scene3')
        })
    }
}
////////////////////////////////////////////
class Scene3 extends Phaser.Scene {
    constructor() {
        super('Scene3');
    }

    preload() {

        this.load.image('characterSelection', './Assets/CharacterSelect.png')
        this.load.image('boy', './Assets/character_select_boy.png')
        this.load.image('girl', './Assets/character_select_girl.png')
    }

    create() {

        this.add.image(180, 50, 'characterSelection')
        let boy = this.add.image(100, 200, 'boy').setScale(0.2)
        let girl = this.add.image(260, 200, 'girl').setScale(0.2)

        boy.setInteractive().on('pointerdown', () => {
            this.scene.switch('GameScene')
        })

        girl.setInteractive().on('pointerdown', () => {
            this.scene.switch('GameScene2')
        })
    }
}
////////////////////////////////////////////
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {

        this.load.image('tiles', './Assets/TileSets/game.png')
        this.load.tilemapTiledJSON('map', 'Scripts/JSON/untitled.json')
        // this.load.image('npc', 'Assets/character_select_boy.png')
        this.load.image('healthbar', './Assets/RedBar.png')

        this.load.spritesheet('character', './Assets/Sprite/characters.png', {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.coins
        this.coinScore = 0;
        this.healthbar
    }

    create() {
        //setUpMap
        const map = this.make.tilemap({key: 'map'})
        const tileSet = map.addTilesetImage('game', 'tiles')

        //setUpLayer
        const lastLayer = map.createStaticLayer('lastLayer', tileSet, 0, 0)
        const tileCollision = map.createStaticLayer('tileCollision', tileSet, 0, 0)
        const firstLayer = map.createStaticLayer('firstLayer', tileSet, 0, 0)
        const building = map.createStaticLayer('building', tileSet, 0, 0)
        const textures = map.createStaticLayer('textures', tileSet, 0, 0)
        const midLayer = map.createStaticLayer('midLayer', tileSet, 0, 0)
        const midLayer1 = map.createStaticLayer('midLayer1', tileSet, 0, 0)
        const midLayer2 = map.createStaticLayer('midLayer2', tileSet, 0, 0)
        const midLayer3 = map.createStaticLayer('midLayer3', tileSet, 0, 0)
        const inDepthLayer1 = map.createStaticLayer('inDepthLayer1', tileSet, 0, 0)
        const inDepthLayer2 = map.createStaticLayer('inDepthLayer2', tileSet, 0, 0)
        const inDepthLayer3 = map.createStaticLayer('inDepthLayer3', tileSet, 0, 0)

        const portal = map.findObject("objectLayer", obj => obj.name === "portal")

        this.newPortal = new Phaser.Geom.Rectangle(portal.x, portal.y,
            portal.width, portal.height)
        console.log(portal)
        this.player1 = new Player1(this, 500, 200, 'character').setScale(1.2)

        // this.npc = new NPC(this, 200, 300, 'npc')

        //configLayer
        lastLayer.setCollisionByProperty({collide: true})
        tileCollision.setCollisionByProperty({collide: true})
        building.setCollisionByProperty({collide: true})
        textures.setCollisionByProperty({collide: true})
        midLayer1.setCollisionByProperty({collide: true})
        midLayer2.setCollisionByProperty({collide: true})
        midLayer3.setCollisionByProperty({collide: true})
        inDepthLayer1.setDepth(10)
        inDepthLayer2.setDepth(10)
        inDepthLayer3.setDepth(10)

        //setUpCollision
        this.physics.add.collider(this.player1, lastLayer)
        this.physics.add.collider(this.player1, tileCollision)
        this.physics.add.collider(this.player1, building)
        this.physics.add.collider(this.player1, textures)
        this.physics.add.collider(this.player1, midLayer1)
        this.physics.add.collider(this.player1, midLayer2)
        this.physics.add.collider(this.player1, midLayer3)

        this.physics.world.bounds.width = 640
        this.physics.world.bounds.height = 640

        //setUpCamera
        this.cameras.main.startFollow(this.player1)
        this.cameras.main.setBounds(0, 0, 640, 640)

        //scoretext
        this.coinText = this.add.text(10, 30,'Score:'+this.coinScore,{font: '15px', fill:'#000'}).setScrollFactor(0)

        /////healthbar
        // this.healthbar = new Healthbar(this, 1, 5, 100)
        this.add.image(65, 20, 'healthbar').setScrollFactor(0).setScale(0.6)

        // const debug = this.add.graphics().setAlpha(0.5)
        // tileCollision.renderDebug(debug, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,50,255),
        //     faceColor: new Phaser.Display.Color(0,255,0,255)
        // })

    }

    update() {
        this.player1.update()
        if (this.newPortal.contains(this.player1.x + this.player1.width / 2,
            this.player1.y + this.player1.height / 2)) this.scene.switch('GameScene3')
    }
    
}
////////////////////////////////////////////
class GameScene2 extends Phaser.Scene {
    constructor() {
        super('GameScene2')
    }

    preload() {

        this.load.image('tiles2', './Assets/TileSets/game.png')
        this.load.tilemapTiledJSON('map2', 'Scripts/JSON/GameTileDemo.json')

        this.load.spritesheet('character', './Assets/Sprite/characters.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.coins
        this.coinScore = 0;
        this.healthbar
    }

    create() {
        //setUpMap
        const map2 = this.make.tilemap({key: 'map2'})
        const tileSet2 = map2.addTilesetImage('game', 'tiles2')

        const belowLayer = map2.createStaticLayer('belowLayer', tileSet2, 0, 0)
        const worldLayer = map2.createStaticLayer('worldLayer', tileSet2, 0, 0)
        const aboveLayer = map2.createStaticLayer('aboveLayer', tileSet2, 0, 0)

        this.player1 = new Player1(this, 200, 200, 'character')

        //setUpLayers
        worldLayer.setCollisionByProperty({collides: true})
        aboveLayer.setDepth(10)
        //setUpCollision
        this.physics.add.collider(this.player1, worldLayer)
        this.physics.world.bounds.width = 400
        this.physics.world.bounds.height = 400

        //setUpCamera
        this.cameras.main.startFollow(this.player1)
        this.cameras.main.setBounds(0, 0, 400, 400)

        // const debug = this.add.graphics().setAlpha(0.5)
        // worldLayer.renderDebug(debug, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,50,255),
        //     faceColor: new Phaser.Display.Color(0,255,0,255)
        // })

    }

    update() {
        this.player1.update()
    }
}
/////////////////////////////////////////////
class GameScene3 extends Phaser.Scene {

    //Creates the level
    constructor() {
        super('GameScene3')
    }

    //Loads the assets
    preload() {

        // Level tiles and data
        this.load.image('tiles3', './Assets/TileSets/schooltile.png')
        this.load.tilemapTiledJSON('map3', 'Scripts/JSON/BitGame.json')
        this.load.image('healthbar', './Assets/RedBar.png')

        // Player sprite
        this.load.spritesheet('character', './Assets/Sprite/characters.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.coins
        this.coinScore = 0;
        this.healthbar

    }

    create() {

        // Make map of level 1.
        this.map3 = this.make.tilemap({key: "map3"})

        // Define tiles used in map.
        const tileSet3 = this.map3.addTilesetImage("schooltile",  "tiles3", 16, 16)

        // The map layers.
        const floorLayer = this.map3.createStaticLayer("floor", tileSet3)
        const wallsLayer = this.map3.createStaticLayer("walls", tileSet3)
        const itemsLayer = this.map3.createStaticLayer("items", tileSet3)
        const aboveLayer = this.map3.createStaticLayer("above_player", tileSet3)


        // Set physics boundaries from map width and height.
        this.physics.world.setBounds(0, 0, this.map3.widthInPixels, this.map3.heightInPixels)

        // Collisions based on layer.
        wallsLayer.setCollisionByProperty({collides: true})

        // Set the above player layer higher than everything else.
        aboveLayer.setDepth(10)

        // Setup things in this level.
        this.rooms = []
        this.stairs = this.physics.add.group()

        // Loop through all the objects.
        this.map3.findObject('Objects', function(object) {

            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object)
            }

            // stairs
            if (object.name === 'Stairs') {
                this.stairs.add(new Entity (this, object.x, object.y))
            }

            //spawnPoints
            if (object.type === 'Spawn') {
                if (object.name === 'Player') {
                    this.player1 = new Player1(this, object.x, object.y, 'character').setScale(1.2)
                }
            }

        }, this)

        // adds collisions
        this.physics.add.collider(this.player1, wallsLayer)
        this.physics.add.overlap(this.player1, this.stairs,     function() {
            this.player1.onStairs = true
        }, null, this)

        //scoretext
        this.coinText = this.add.text(10, 30,'Score:'+this.coinScore,{font: '15px', fill:'#000'}).setScrollFactor(0)

        this.add.image(65, 20, 'healthbar').setScrollFactor(0).setScale(0.6)

        // start camera
        // this.cameras.main.setZoom(2.0)
        this.cameras.main.setBounds(this.rooms[this.player1.currentRoom].x,
                                    this.rooms[this.player1.currentRoom].y,
                                    this.rooms[this.player1.currentRoom].width,
                                    this.rooms[this.player1.currentRoom].height,
            true)

        this.cameras.main.startFollow(this.player1)

        this.cameras.main.fadeIn(2000, 0, 0, 0)

        // listener for gamepad detection
        // this.input.gamepad.once('down', function (pad, button, index) {
        //     this.gamepad = pad;
        // }, this)
    }

    //Update called every tick
    update(time, delta) {

        this.player1.update()

        this.cameras.main._ch = this.map3.heightInPixels
        this.cameras.main._cw = this.map3.widthInPixels


        if (this.player1.roomChange) {

            this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress) {
                this.player1.canMove = false
                if (progress === 1) {
                    // Changes the camera boundaries when fade out is done
                    this.cameras.main.setBounds(this.rooms[this.player1.currentRoom].x,
                                                this.rooms[this.player1.currentRoom].y,
                                                this.rooms[this.player1.currentRoom].width,
                                                this.rooms[this.player1.currentRoom].height,
                        true)

                    // Fades back in with new boundaries
                    this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
                        if (progress === 1) {
                            this.player1.canMove = true
                            this.roomStart(this.player1.currentRoom)
                        }
                    }, this);
                }
            }, this);
        }
    }

    roomStart(roomNumber) {
    }
}





