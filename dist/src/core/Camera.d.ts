import { Vector3, Matrix4 } from "@math.gl/core";
import Orientation from "../math/Orientation";
import Transform from "../math/Transform";
declare class Camera {
    private _transform;
    private static _mainCamera;
    constructor(translation: Vector3, rotation: Orientation);
    static get Main(): Camera;
    static setMainCamera(camera: Camera): void;
    getTransform(): Transform;
    getView(): Matrix4;
}
export default Camera;
//# sourceMappingURL=Camera.d.ts.map