import { Vector3 } from "@math.gl/core";
class Orientation extends Vector3 {
    constructor(pitch = 0, yaw = 0, roll = 0) {
        super(pitch, yaw, roll);
    }
    add(orientation) {
        super.add(orientation);
        return this;
    }
    get pitch() {
        return this.x;
    }
    get yaw() {
        return this.y;
    }
    get roll() {
        return this.z;
    }
    set pitch(x) {
        this.x = x;
    }
    set yaw(y) {
        this.y = y;
    }
    set roll(z) {
        this.z = z;
    }
}
export default Orientation;
