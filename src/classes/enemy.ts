import { Math, Scene } from 'phaser';
import { Actor } from './actor';
import { Player } from './player';
import { EVENTS_NAME } from '../conf';

export class Enemy extends Actor {
    private target: Player;
    // 在AGRESSOR_RADIUS范围内敌人才开始追击
    private AGRESSOR_RADIUS = 100;
    private attackHandler: () => void;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        target: Player,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);
        this.target = target;
        // ADD TO SCENE
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // PHYSICS MODEL
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);

        this.attackHandler = () => {
            if (
                Phaser.Math.Distance.BetweenPoints(
                    { x: this.x, y: this.y },
                    { x: this.target.x, y: this.target.y },
                ) < this.target.width
            ) {
                this.getDamage();
                this.disableBody(true, false);
                
                this.scene.time.delayedCall(300, () => {
                    this.destroy();
                });
            }
        }

        this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
        this.on('destroy', () => {
            this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
        });
    }

    // GameObjects内置钩子, 重新渲染游戏帧之前都会触发它
    preUpdate(): void {
        if (
            Phaser.Math.Distance.BetweenPoints(
                { x: this.x, y: this.y },
                { x: this.target.x, y: this.target.y },
            ) < this.AGRESSOR_RADIUS
        ) {
            this.getBody().setVelocityX(this.target.x - this.x);
            this.getBody().setVelocityY(this.target.y - this.y);
        } else {
            this.getBody().setVelocity(0);
        }
    }

    public setTarget(target: Player): void {
        this.target = target;
    }
}