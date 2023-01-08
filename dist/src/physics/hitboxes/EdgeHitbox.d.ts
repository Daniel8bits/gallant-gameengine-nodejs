import { Vector2 } from "@math.gl/core";
import Hitbox from "./HitBox";
export declare class Line {
    private _p;
    private _q;
    constructor(p: Vector2, q: Vector2);
    getP(): Vector2;
    getQ(): Vector2;
}
declare class EdgeHitbox extends Hitbox {
    private _lines;
    constructor(vertices: number[], indices: number[]);
    getLines(): Line[];
}
export default EdgeHitbox;
//# sourceMappingURL=EdgeHitbox.d.ts.map