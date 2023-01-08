import { Vector2 } from "@math.gl/core";
import Hitbox from "./HitBox";
export class Line {
    _p;
    _q;
    constructor(p, q) {
        this._p = p;
        this._q = q;
    }
    getP() {
        return this._p;
    }
    getQ() {
        return this._q;
    }
}
class EdgeHitbox extends Hitbox {
    _lines;
    constructor(vertices, indices) {
        super();
        this._lines = [];
        for (let i = 0; i < indices.length; i += 2) {
            const ax = vertices[indices[i] * 2];
            const az = vertices[indices[i] * 2 + 1];
            const bx = vertices[indices[i + 1] * 2];
            const bz = vertices[indices[i + 1] * 2 + 1];
            this._lines.push(new Line(new Vector2(ax, az), new Vector2(bx, bz)));
        }
    }
    getLines() {
        return this._lines;
    }
}
export default EdgeHitbox;
