class Player2 extends Entity {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey, 'Player2');
        //setVariable
        const animFrameRate = 6
        const anims = scene.anims
        //createAnimation
        //player
        anims.create({
            key: 'player-down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 6,
                end: 8
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 18,
                end: 20
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 30,
                end: 32
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 42,
                end: 44
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

        //setIdle
        this.idlePlayer = {
            down: 7,
            left: 19,
            right: 31,
            up: 43
        }
        this.setFrame(this.idlePlayer.down)

        //setKeys
        const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes
        this.keys2 = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })
    }

    update() {
        //setVariable
        const {keys2} = this
        const speed = 120
        const previousVelocity = this.body.velocity.clone()

        this.body.setVelocity(0)
        //movementPlayer
        if (keys2.left.isDown || keys2.a.isDown) {
            this.body.setVelocityX(-speed)
        } else if (keys2.right.isDown || keys2.d.isDown) {
            this.body.setVelocityX(speed)
        }
        if (keys2.up.isDown || keys2.w.isDown) {
            this.body.setVelocityY(-speed)
        } else if (keys2.down.isDown || keys2.s.isDown) {
            this.body.setVelocityY(speed)
        }

        this.body.velocity.normalize().scale(speed)

        //animationPlayer
        if (keys2.left.isDown || keys2.a.isDown) {
            this.anims.play('player-left', true)
        } else if (keys2.right.isDown || keys2.d.isDown) {
            this.anims.play('player-right', true)
        } else if (keys2.up.isDown || keys2.w.isDown) {
            this.anims.play('player-up', true)
        } else if (keys2.down.isDown || keys2.s.isDown) {
            this.anims.play('player-down', true)
        } else {
            this.anims.stop()
        }
        //setIdleAnimation
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            //showIdleAnims
            if (previousVelocity.x < 0) {
                this.setFrame(this.idlePlayer.left)
            } else if (previousVelocity.x > 0) {
                this.setFrame(this.idlePlayer.right)
            } else if (previousVelocity.y < 0) {
                this.setFrame(this.idlePlayer.up)
            } else if (previousVelocity.y > 0) {
                this.setFrame(this.idlePlayer.down)
            }
        }

    }
}


