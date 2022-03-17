import { GameObjects, Scene } from 'phaser';

export class LoadingScene extends Scene {
    private star!: GameObjects.Sprite

    constructor() {
        super('loading-scene');
    }

    init(data: any) {
        console.log('Loading scene init game.scenes.add(dataForInit) or game.scenes.start(dataForInit).', data)
    }

    preload() {
        console.log('Loading scene preload');

        this.load.image('king', 'assets/king.png');
        // 精灵集
        this.load.atlas('sheets-king', 'assets/sheets-king.png', 'assets/sheets-king.json');

        this.load.image('tileimg', 'assets/tile-16-16.png');
        this.load.tilemapTiledJSON('tilejson', 'assets/tile.json');

        this.load.spritesheet('tiles_spr', 'assets/tile-16-16.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create(): void {
        console.log('Loading scene was created');
        // this.star = this.add.sprite(100, 100, 'star');
        // // const star = new GameObjects.Sprite(this, 150, 100, 'star')
        // console.log('this====', this)
        // this.make.sprite({
        //     x: 150, 
        //     y: 100, 
        //     key: 'star',
        //     add: true
        // });

        // 加载指定scene
        this.scene.start('level-1-scene');
        this.scene.start('ui-scene');
    }

    // update(time: number, delta: number) {
    //     console.log('every render frame')
    // }
}