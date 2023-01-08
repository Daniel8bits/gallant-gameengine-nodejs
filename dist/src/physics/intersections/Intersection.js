class Intersection {
    _solid1;
    _solid2;
    constructor(solid1, solid2) {
        this._solid1 = solid1;
        this._solid2 = solid2;
    }
    getSolid1() {
        return this._solid1;
    }
    getSolid2() {
        return this._solid2;
    }
}
export default Intersection;
