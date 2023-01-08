import Material from "../../appearance/material/Material";
import VAO from "../../buffer/VAO";
import Hitbox from "../../physics/hitboxes/HitBox";
import Renderer from "../../renderer/Renderer";
import Entity from "./Entity";
declare abstract class SolidEntity extends Entity {
    private _hitbox;
    constructor(name: string, hitbox: Hitbox, vao?: VAO, material?: Material, renderer?: Renderer);
    setHitbox(hitbox: Hitbox): void;
    getHitbox(): Hitbox;
}
export default SolidEntity;
//# sourceMappingURL=SolidEntity.d.ts.map