import SolidEntity from "../../core/entities/SolidEntity";
declare abstract class Intersection {
    private _solid1;
    private _solid2;
    protected constructor(solid1: SolidEntity, solid2: SolidEntity);
    getSolid1(): SolidEntity;
    getSolid2(): SolidEntity;
    abstract solve(): void;
}
export default Intersection;
//# sourceMappingURL=Intersection.d.ts.map