import { Matrix4, toRadians, Vector3 } from "@math.gl/core";
import Orientation from "./Orientation";
class TransformStruct {
    translation;
    rotation;
    scale;
    constructor(translation, rotation, scale) {
        this.translation = translation ?? new Vector3();
        this.rotation = rotation ?? new Orientation();
        this.scale = scale ?? new Vector3(1, 1, 1);
    }
    toMatrix() {
        return this._toMatrix(this.translation.clone().negate());
    }
    toMatrixIgnoringZ() {
        return this._toMatrix(new Vector3(this.translation.x, this.translation.y, 0).negate());
    }
    toInversePositionMatrix() {
        return this._toMatrix(this.translation.clone());
    }
    _toMatrix(translationVector) {
        const translation = new Matrix4().translate(translationVector);
        const rotationX = new Matrix4().rotateX(toRadians(this.rotation.pitch));
        const rotationY = new Matrix4().rotateY(toRadians(this.rotation.yaw));
        const rotationZ = new Matrix4().rotateZ(toRadians(this.rotation.roll));
        const rotation = rotationX.multiplyRight(rotationY.multiplyRight(rotationZ));
        const scale = new Matrix4().scale(this.scale);
        return translation.multiplyRight(rotation.multiplyRight(scale));
    }
}
export default TransformStruct;
