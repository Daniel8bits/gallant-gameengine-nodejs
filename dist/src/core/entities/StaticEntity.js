import SolidEntity from "./SolidEntity";
class StaticEntity extends SolidEntity {
    _friction;
    constructor(name, hitbox, friction, vao, material, renderer) {
        super(name, hitbox, vao, material, renderer);
        this._friction = friction;
    }
    setFriction(friction) {
        this._friction = friction;
    }
    getFriction() {
        return this._friction;
    }
}
export default StaticEntity;
