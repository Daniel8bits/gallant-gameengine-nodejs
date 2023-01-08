import { Vector3 } from "@math.gl/core";
declare class Orientation extends Vector3 {
    constructor(pitch?: number, yaw?: number, roll?: number);
    add(orientation: Orientation): this;
    get pitch(): number;
    get yaw(): number;
    get roll(): number;
    set pitch(x: number);
    set yaw(y: number);
    set roll(z: number);
}
export default Orientation;
//# sourceMappingURL=Orientation.d.ts.map