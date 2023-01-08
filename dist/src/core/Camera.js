import { Matrix4 } from "@math.gl/core";
import { toRadians } from "../math/math";
import Transform from "../math/Transform";
class Camera {
    _transform;
    static _mainCamera;
    constructor(translation, rotation) {
        this._transform = new Transform(translation, rotation);
        Camera._mainCamera = this;
    }
    static get Main() {
        return this._mainCamera;
    }
    static setMainCamera(camera) {
        this._mainCamera = camera;
    }
    getTransform() {
        return this._transform;
    }
    getView() {
        const translation = new Matrix4()
            .translate(this._transform.getTranslation()
            .add(this._transform.getLocalTransform().translation).negate());
        const euler = this._transform.getRotation();
        const rotationX = new Matrix4().rotateX(toRadians(euler.pitch));
        const rotationY = new Matrix4().rotateY(toRadians(euler.yaw));
        const rotationZ = new Matrix4().rotateZ(toRadians(euler.roll));
        const rotation = rotationZ.multiplyRight(rotationY.multiplyRight(rotationX));
        return translation.multiplyRight(rotation).invert();
    }
}
export default Camera;
