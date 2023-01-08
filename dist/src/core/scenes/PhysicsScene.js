import Physics from "../../physics/Physics";
import DynamicEntity from "../entities/DynamicEntity";
import SolidEntity from "../entities/SolidEntity";
import Scene from "./Scene";
class PhysicsScene extends Scene {
    _properties;
    _physics;
    constructor(name) {
        super(name);
        this._physics = new Physics();
        this._properties = {
            gravity: 9.807,
            airFrictionCoefficient: 5,
            defaultFakeFloor: 0
        };
    }
    add(entity, visible = true) {
        super.add(entity, visible);
        if (entity instanceof SolidEntity && visible) {
            this._physics.add(entity);
        }
        return this;
    }
    remove(entity) {
        if (entity instanceof SolidEntity && this.hasInVisible(entity)) {
            this._physics.remove(entity);
        }
        super.remove(entity);
        return this;
    }
    setVisibility(entity, visible) {
        super.setVisibility(entity, visible);
        if (entity instanceof SolidEntity && visible) {
            this._physics.add(entity);
        }
        else if (entity instanceof SolidEntity && !visible) {
            this._physics.remove(entity);
        }
        return this;
    }
    update(time, delta, updater) {
        this.forEachVisible((entity) => {
            entity.update(time, delta, this, updater);
            if (entity instanceof DynamicEntity) {
                this._physics.applyPhysics(entity, this._properties, delta);
            }
        });
        if (this._physics.anyCollisionDetected()) {
            this._physics.distributeForces();
        }
    }
    getProperties() {
        return this._properties;
    }
}
export default PhysicsScene;
