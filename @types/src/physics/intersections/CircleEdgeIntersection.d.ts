import SolidEntity from "../../core/entities/SolidEntity";
import Intersection from "./Intersection";
declare class CircleEdgeIntersection extends Intersection {
    private _intersectedLine;
    private constructor();
    static test(solid1: SolidEntity, solid2: SolidEntity): CircleEdgeIntersection;
    solve(): void;
    private static _isInsideLine;
}
export default CircleEdgeIntersection;
//# sourceMappingURL=CircleEdgeIntersection.d.ts.map