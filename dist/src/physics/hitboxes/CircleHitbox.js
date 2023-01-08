import Hitbox from "./HitBox";
class CircleHitbox extends Hitbox {
    _radius;
    constructor(radius) {
        super();
        this._radius = radius;
    }
    getRadius() {
        return this._radius;
    }
}
export default CircleHitbox;
