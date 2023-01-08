import { Vector3 } from "@math.gl/core";
import SolidEntity from "./SolidEntity";
class DynamicEntity extends SolidEntity {
    _mass;
    _force;
    _speed;
    constructor(name, hitbox, mass, vao, material, renderer) {
        super(name, hitbox, vao, material, renderer);
        this._mass = mass;
        this._force = new Vector3(0, 0, 0);
        this._speed = new Vector3(0, 0, 0);
    }
    updateSpeed(delta) {
        if (!this._force.exactEquals([0, 0, 0])) {
            this.updateSpeedByAcceleration(this._force.divideScalar(this._mass).multiplyByScalar(delta));
        }
    }
    updateSpeedByAcceleration(acceleration) {
        this._speed.add(acceleration);
    }
    setMass(mass) {
        this._mass = mass;
    }
    getMass() {
        return this._mass;
    }
    setForce(force) {
        this._force = force;
    }
    getForce() {
        return this._force;
    }
    setSpeed(speed) {
        this._speed = speed;
    }
    getSpeed() {
        return this._speed;
    }
}
export default DynamicEntity;
