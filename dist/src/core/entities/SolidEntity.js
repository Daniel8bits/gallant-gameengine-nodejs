import Entity from "./Entity";
class SolidEntity extends Entity {
    _hitbox;
    constructor(name, hitbox, vao, material, renderer) {
        super(name, vao, material, renderer);
        this._hitbox = hitbox;
    }
    setHitbox(hitbox) {
        this._hitbox = hitbox;
    }
    getHitbox() {
        return this._hitbox;
    }
}
export default SolidEntity;
