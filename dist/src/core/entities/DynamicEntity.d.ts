import { Vector3 } from "@math.gl/core";
import Material from "../../appearance/material/Material";
import VAO from "../../buffer/VAO";
import Hitbox from "../../physics/hitboxes/HitBox";
import Renderer from "../../renderer/Renderer";
import SolidEntity from "./SolidEntity";
declare abstract class DynamicEntity extends SolidEntity {
    private _mass;
    private _force;
    private _speed;
    constructor(name: string, hitbox: Hitbox, mass: number, vao?: VAO, material?: Material, renderer?: Renderer);
    updateSpeed(delta: number): void;
    updateSpeedByAcceleration(acceleration: Vector3): void;
    setMass(mass: number): void;
    getMass(): number;
    setForce(force: Vector3): void;
    getForce(): Vector3;
    setSpeed(speed: Vector3): void;
    getSpeed(): Vector3;
}
export default DynamicEntity;
//# sourceMappingURL=DynamicEntity.d.ts.map