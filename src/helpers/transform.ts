import {ObjectPoint} from '../index.d'

export const gameObjectsToObjectPoints = (gameObjects: unknown[]): ObjectPoint[] => {
    return gameObjects.map(gameObject => gameObject as ObjectPoint);
};