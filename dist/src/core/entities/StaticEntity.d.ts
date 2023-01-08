import Material from "../../appearance/material/Material";
import VAO from "../../buffer/VAO";
import Hitbox from "../../physics/hitboxes/HitBox";
import Renderer from "../../renderer/Renderer";
import SolidEntity from "./SolidEntity";
declare abstract class StaticEntity extends SolidEntity {
    private _friction;
    constructor(name: string, hitbox: Hitbox, friction: number, vao?: VAO, material?: Material, renderer?: Renderer);
    setFriction(friction: number): void;
    getFriction(): number;
}
export default StaticEntity;
//# sourceMappingURL=StaticEntity.d.ts.map