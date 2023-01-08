import DynamicEntity from '../core/entities/DynamicEntity';
import SolidEntity from '../core/entities/SolidEntity';
import { PhysicsSceneProperties } from '../core/scenes/PhysicsScene';
declare class Physics {
    private _solidEntities;
    private _staticEntities;
    private _dynamicEntities;
    private _intersections;
    constructor();
    add(entity: SolidEntity): void;
    remove(entity: SolidEntity): void;
    applyPhysics(entity: DynamicEntity, sceneProperties: PhysicsSceneProperties, delta: number): void;
    reapplyPhysics(sceneProperties: PhysicsSceneProperties, delta: number): void;
    anyCollisionDetected(): boolean;
    private _test;
    distributeForces(): void;
}
export default Physics;
//# sourceMappingURL=Physics.d.ts.map