import Entity from "../entities/Entity";
import Updater from "../updater/Updater";
import Scene from "./Scene";
export interface PhysicsSceneProperties {
    gravity: number;
    airFrictionCoefficient: number;
    defaultFakeFloor: number;
}
declare class PhysicsScene extends Scene {
    private _properties;
    private _physics;
    constructor(name: string);
    add(entity: Entity, visible?: boolean): Scene;
    remove(entity: Entity | string): Scene;
    setVisibility(entity: Entity | string, visible: boolean): Scene | never;
    update(time: number, delta: number, updater: Updater): void;
    getProperties(): PhysicsSceneProperties;
}
export default PhysicsScene;
//# sourceMappingURL=PhysicsScene.d.ts.map