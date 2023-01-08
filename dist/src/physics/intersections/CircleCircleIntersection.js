import { Vector2, Vector3 } from "@math.gl/core";
import Intersection from "./Intersection";
class CircleCircleIntersection extends Intersection {
    static test(solid1, solid2) {
        const p = new Vector2(solid1.getTransform().getTranslation().x, solid1.getTransform().getTranslation().z);
        const q = new Vector2(solid2.getTransform().getTranslation().x, solid2.getTransform().getTranslation().z);
        const totalRadius = solid1.getHitbox().getRadius() +
            solid2.getHitbox().getRadius();
        if (q.distanceTo(p) < totalRadius) {
            return new CircleCircleIntersection(solid1, solid2);
        }
        return null;
    }
    getAccelerationOnSolid1() {
        return this._getAccelerationOnSolid(this.getSolid1(), this.getSolid2());
    }
    getAccelerationOnSolid2() {
        return this._getAccelerationOnSolid(this.getSolid2(), this.getSolid1());
    }
    _getAccelerationOnSolid(solid1, solid2) {
        const p = new Vector2(solid1.getTransform().getTranslation().x, solid1.getTransform().getTranslation().z);
        const q = new Vector2(solid2.getTransform().getTranslation().x, solid2.getTransform().getTranslation().z);
        const qp = new Vector2(q).subtract(p);
        const pq = new Vector2(p).subtract(q);
        const pRadius = solid1.getHitbox().getRadius();
        const qRadius = solid2.getHitbox().getRadius();
        const pk = new Vector2(p).add(qp.multiplyByScalar(pRadius).divideScalar(qp.magnitude()));
        const qk = new Vector2(q).add(pq.multiplyByScalar(qRadius).divideScalar(pq.magnitude()));
        const acceleration = qk.subtract(pk);
        return new Vector3(acceleration.x, 0, acceleration.y);
    }
    solve() {
        const p = new Vector2(this.getSolid1().getTransform().getTranslation().x, this.getSolid1().getTransform().getTranslation().z);
        const q = new Vector2(this.getSolid2().getTransform().getTranslation().x, this.getSolid2().getTransform().getTranslation().z);
        const qp = new Vector2(p).subtract(q);
        const totalRadius = this.getSolid1().getHitbox().getRadius() +
            this.getSolid2().getHitbox().getRadius();
        qp.divideScalar(qp.magnitude());
        this.getSolid1().getTransform().setX(this.getSolid2().getTransform().getX() + totalRadius * qp.x);
        this.getSolid1().getTransform().setZ(this.getSolid2().getTransform().getZ() + totalRadius * qp.y);
    }
}
export default CircleCircleIntersection;
