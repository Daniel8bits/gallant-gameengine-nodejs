import { Vector3 } from '@math.gl/core';
import DynamicEntity from '../core/entities/DynamicEntity';
import StaticEntity from '../core/entities/StaticEntity';
import CircleHitbox from './hitboxes/CircleHitbox';
import EdgeHitbox from './hitboxes/EdgeHitbox';
import CircleCircleIntersection from './intersections/CircleCircleIntersection';
import CircleEdgeIntersection from './intersections/CircleEdgeIntersection';
class Physics {
    _solidEntities;
    _staticEntities;
    _dynamicEntities;
    _intersections;
    constructor() {
        this._solidEntities = [];
        this._staticEntities = [];
        this._dynamicEntities = [];
        this._intersections = [];
    }
    add(entity) {
        this._solidEntities.push(entity);
        if (entity instanceof StaticEntity) {
            this._staticEntities.push(entity);
        }
        else if (entity instanceof DynamicEntity) {
            this._dynamicEntities.push(entity);
        }
    }
    remove(entity) {
        this._solidEntities = this._solidEntities.filter(e => e.getName() !== entity.getName());
        if (entity instanceof StaticEntity) {
            this._staticEntities = this._staticEntities.filter(e => e.getName() !== entity.getName());
        }
        else if (entity instanceof DynamicEntity) {
            this._dynamicEntities = this._dynamicEntities.filter(e => e.getName() !== entity.getName());
        }
    }
    applyPhysics(entity, sceneProperties, delta) {
        entity.updateSpeed(delta);
        if (entity.getTransform().getY() < sceneProperties.defaultFakeFloor) {
            entity.getSpeed().add(new Vector3(0, sceneProperties.gravity * delta, 0));
        }
        entity.getSpeed().add(new Vector3(entity.getSpeed())
            .multiplyByScalar(-sceneProperties.airFrictionCoefficient * delta));
        entity.getTransform().setTranslation(entity.getTransform().getTranslation().add(entity.getSpeed()));
        if (entity.getTransform().getY() > sceneProperties.defaultFakeFloor) {
            entity.getSpeed().y = 0;
            entity.getTransform().setY(sceneProperties.defaultFakeFloor);
        }
    }
    reapplyPhysics(sceneProperties, delta) {
        this._dynamicEntities.forEach(entity => this.applyPhysics(entity, sceneProperties, delta));
    }
    anyCollisionDetected() {
        this._intersections = [];
        this._dynamicEntities.forEach((dynamicEntity) => {
            if (dynamicEntity.getHitbox().isCollisionDisabled()) {
                return;
            }
            this._solidEntities
                .filter((entity) => !entity.getHitbox().isCollisionDisabled() &&
                dynamicEntity.getName() !== entity.getName() &&
                dynamicEntity.getTransform().getTranslation().distanceTo(entity.getTransform().getTranslation()) < (entity instanceof DynamicEntity ? 5 : 50))
                .forEach((entity) => {
                const intersection = this._test(dynamicEntity, entity);
                if (intersection) {
                    this._intersections.push(intersection);
                }
            });
        });
        return this._intersections.length > 0;
    }
    _test(dynamicEntity, entity) {
        if (dynamicEntity.getHitbox() instanceof CircleHitbox &&
            entity.getHitbox() instanceof CircleHitbox) {
            return CircleCircleIntersection.test(dynamicEntity, entity);
        }
        if (dynamicEntity.getHitbox() instanceof CircleHitbox &&
            entity.getHitbox() instanceof EdgeHitbox) {
            return CircleEdgeIntersection.test(dynamicEntity, entity);
        }
    }
    distributeForces() {
        this._intersections.forEach((intersection) => {
            const dynamicEntity = intersection.getSolid1();
            intersection.solve();
            dynamicEntity.getSpeed().x = 0;
            dynamicEntity.getSpeed().z = 0;
        });
    }
}
export default Physics;
