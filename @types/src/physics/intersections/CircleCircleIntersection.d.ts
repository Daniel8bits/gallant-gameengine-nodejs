import { Vector3 } from "@math.gl/core";
import SolidEntity from "../../core/entities/SolidEntity";
import Intersection from "./Intersection";
declare class CircleCircleIntersection extends Intersection {
    static test(solid1: SolidEntity, solid2: SolidEntity): CircleCircleIntersection;
    getAccelerationOnSolid1(): Vector3;
    getAccelerationOnSolid2(): Vector3;
    private _getAccelerationOnSolid;
    solve(): void;
}
export default CircleCircleIntersection;
//# sourceMappingURL=CircleCircleIntersection.d.ts.map