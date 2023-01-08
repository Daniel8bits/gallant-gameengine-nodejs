import { Matrix4, Vector3 } from "@math.gl/core";
import Orientation from "./Orientation";
declare class TransformStruct {
    translation: Vector3;
    rotation: Orientation;
    scale: Vector3;
    constructor(translation?: Vector3, rotation?: Orientation, scale?: Vector3);
    toMatrix(): Matrix4;
    toMatrixIgnoringZ(): Matrix4;
    toInversePositionMatrix(): Matrix4;
    private _toMatrix;
}
export default TransformStruct;
//# sourceMappingURL=TransformStruct.d.ts.map