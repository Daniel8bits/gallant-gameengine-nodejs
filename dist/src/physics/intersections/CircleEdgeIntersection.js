import { Vector2, Vector3 } from "@math.gl/core";
import { circunferenceEquationOf, distanceBetweenPointAndLine, intersectionPointsBetweenLineAndCircunference, lineEquationOf } from "../../math/math";
import Intersection from "./Intersection";
class CircleEdgeIntersection extends Intersection {
    _intersectedLine;
    constructor(solid1, solid2, intersectedLine) {
        super(solid1, solid2);
        this._intersectedLine = intersectedLine;
    }
    static test(solid1, solid2) {
        const s1P = new Vector2(solid1.getTransform().getTranslation().x, solid1.getTransform().getTranslation().z);
        const transform = solid2.getTransform().toInversePositionMatrix();
        const circleHitbox = solid1.getHitbox();
        const edgeHitbox = solid2.getHitbox();
        const intersectedLines = [];
        edgeHitbox.getLines().forEach((line) => {
            const p = new Vector3(line.getP().x, 0, line.getP().y).transform(transform);
            const q = new Vector3(line.getQ().x, 0, line.getQ().y).transform(transform);
            const lineEquation = lineEquationOf(new Vector2(p.x, p.z), new Vector2(q.x, q.z));
            const distance = distanceBetweenPointAndLine(s1P, lineEquation);
            if (distance < circleHitbox.getRadius()) {
                const intersectionPoints = intersectionPointsBetweenLineAndCircunference(lineEquation, circunferenceEquationOf(s1P, circleHitbox.getRadius()));
                if (intersectionPoints &&
                    CircleEdgeIntersection._isInsideLine({ p1: new Vector2(p.x, p.z), p2: new Vector2(q.x, q.z) }, intersectionPoints)) {
                    intersectedLines.push({
                        p: new Vector2(p.x, p.z),
                        q: new Vector2(q.x, q.z),
                        distance,
                        intersectionPoints,
                        circleCenter: s1P
                    });
                }
            }
        });
        if (intersectedLines.length > 0) {
            intersectedLines.sort((a, b) => a.distance - b.distance);
            return new CircleEdgeIntersection(solid1, solid2, intersectedLines[0]);
        }
        return null;
    }
    solve() {
        const closestPoint = new Vector2(this._intersectedLine.intersectionPoints.p2)
            .subtract(this._intersectedLine.intersectionPoints.p1)
            .divideScalar(2).add(this._intersectedLine.intersectionPoints.p1);
        const reflectorCircleCenter = new Vector2(closestPoint)
            .subtract(this._intersectedLine.circleCenter)
            .multiplyByScalar(2);
        const qp = new Vector2(reflectorCircleCenter).negate();
        reflectorCircleCenter.add(this._intersectedLine.circleCenter);
        const totalRadius = this.getSolid1().getHitbox().getRadius() +
            closestPoint.distanceTo(reflectorCircleCenter);
        qp.divideScalar(qp.magnitude());
        this.getSolid1().getTransform().setX(reflectorCircleCenter.x + totalRadius * qp.x);
        this.getSolid1().getTransform().setZ(reflectorCircleCenter.y + totalRadius * qp.y);
    }
    static _isInsideLine(line, intersectionPoints) {
        let begin = 0, end = 0;
        if (line.p1.x !== line.p2.x) {
            if (line.p1.x < line.p2.x) {
                begin = line.p1.x;
                end = line.p2.x;
            }
            else {
                begin = line.p2.x;
                end = line.p1.x;
            }
            return (intersectionPoints.p1.x > begin && intersectionPoints.p1.x < end) || (intersectionPoints.p2.x > begin && intersectionPoints.p2.x < end);
        }
        if (line.p1.y < line.p2.y) {
            begin = line.p1.y;
            end = line.p2.y;
        }
        else {
            begin = line.p2.y;
            end = line.p1.y;
        }
        return (intersectionPoints.p1.y > begin && intersectionPoints.p1.y < end) || (intersectionPoints.p2.y > begin && intersectionPoints.p2.y < end);
    }
}
export default CircleEdgeIntersection;
