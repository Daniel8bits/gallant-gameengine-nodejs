import Orientation from "./Orientation";
import { Vector3, Matrix4 } from "@math.gl/core";
import { toRadians } from "./math";
import Scene from "../core/scenes/Scene";
import TransformStruct from "./TransformStruct";
class Transform {
    _entity;
    _globalTransform;
    _localTransform;
    _children;
    _parent;
    constructor(translation, rotation, scale) {
        this._globalTransform = new TransformStruct(translation, rotation, scale);
        this._localTransform = new TransformStruct();
    }
    setEntity(entity) {
        this._entity = entity;
        this._children = new Scene(entity.getName() + "_children");
    }
    get children() {
        return this._children;
    }
    set parent(parent) {
        this._parent = parent;
    }
    get parent() {
        return this._parent;
    }
    getTranslation() {
        return new Vector3(this._globalTransform.translation.x, this._globalTransform.translation.y, this._globalTransform.translation.z);
    }
    setTranslation(translation) {
        this._globalTransform.translation.x = translation.x;
        this._globalTransform.translation.y = translation.y;
        this._globalTransform.translation.z = translation.z;
    }
    setX(x) {
        this._globalTransform.translation.x = x;
    }
    setY(y) {
        this._globalTransform.translation.y = y;
    }
    setZ(z) {
        this._globalTransform.translation.z = z;
    }
    getX() {
        return this._globalTransform.translation.x;
    }
    getY() {
        return this._globalTransform.translation.y;
    }
    getZ() {
        return this._globalTransform.translation.z;
    }
    getRotation() {
        return new Orientation(this._globalTransform.rotation.pitch, this._globalTransform.rotation.yaw, this._globalTransform.rotation.roll);
    }
    setRotation(rotation) {
        this._fixRotation(rotation.pitch, (v) => { this._globalTransform.rotation.pitch = v; });
        this._fixRotation(rotation.yaw, (v) => { this._globalTransform.rotation.yaw = v; });
        this._fixRotation(rotation.roll, (v) => { this._globalTransform.rotation.roll = v; });
    }
    setPitch(pitch) {
        this._fixRotation(pitch, (v) => { this._globalTransform.rotation.pitch = v; });
    }
    setYaw(yaw) {
        this._fixRotation(yaw, (v) => { this._globalTransform.rotation.yaw = v; });
    }
    setRoll(roll) {
        this._fixRotation(roll, (v) => { this._globalTransform.rotation.roll = v; });
    }
    getPitch() {
        return this._globalTransform.rotation.pitch;
    }
    getYaw() {
        return this._globalTransform.rotation.yaw;
    }
    getRoll() {
        return this._globalTransform.rotation.roll;
    }
    _fixRotation(v, set) {
        if (v >= 360) {
            v %= 360;
            v -= 360;
        }
        if (v <= -360) {
            v %= 360;
            v += 360;
        }
        set(v);
    }
    getScale() {
        return new Vector3(this._globalTransform.scale.x, this._globalTransform.scale.y, this._globalTransform.scale.z);
    }
    setScale(scale) {
        this._globalTransform.scale = scale;
    }
    toMatrix() {
        return this._globalTransform.toMatrix().multiplyRight(this._localTransform.toMatrix());
    }
    toMatrixIgnoringZ() {
        return this._globalTransform.toMatrixIgnoringZ().multiplyRight(this._localTransform.toMatrixIgnoringZ());
    }
    toInversePositionMatrix() {
        return this._globalTransform.toInversePositionMatrix().multiplyRight(this._localTransform.toInversePositionMatrix());
    }
    worldMatrix() {
        const localMatrix = this.toMatrix();
        let worldMatrix = localMatrix.clone();
        if (this._parent) {
            worldMatrix = this._parent.worldMatrix().multiplyRight(localMatrix);
        }
        return worldMatrix;
    }
    worldMatrixIgnoringZ() {
        const localMatrix = this.toMatrixIgnoringZ();
        let worldMatrix = localMatrix.clone();
        if (this._parent) {
            worldMatrix = this._parent.worldMatrixIgnoringZ().multiplyRight(localMatrix);
        }
        return worldMatrix;
    }
    worldMatrixFrom(transform) {
        const translation = new Matrix4().translate(transform.getTranslation());
        const rotationX = new Matrix4().rotateX(toRadians(transform.getPitch()));
        const rotationY = new Matrix4().rotateY(toRadians(transform.getYaw()));
        const rotationZ = new Matrix4().rotateZ(toRadians(transform.getRoll()));
        const rotation = rotationX.multiplyRight(rotationY.multiplyRight(rotationZ));
        const scale = new Matrix4().scale(transform.getScale());
        return translation.multiplyRight(rotation.multiplyRight(scale));
    }
    worldTranslation() {
        let worldTranslation = this._globalTransform.translation.clone().add(this._localTransform.translation);
        if (this._parent) {
            worldTranslation = this._parent.worldTranslation().add(worldTranslation);
        }
        return worldTranslation;
    }
    getLocalTransform() {
        return this._localTransform;
    }
}
export default Transform;
