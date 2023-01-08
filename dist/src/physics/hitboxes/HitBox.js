class Hitbox {
    _collisionDisabled;
    constructor() {
        this._collisionDisabled = false;
    }
    isCollisionDisabled() {
        return this._collisionDisabled;
    }
    disableCollision(collisionDisabled) {
        this._collisionDisabled = collisionDisabled;
    }
}
export default Hitbox;
