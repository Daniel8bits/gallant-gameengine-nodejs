import VAO from '../buffer/VAO';
export interface HitboxesJSON {
    circle: {
        [name: string]: {
            radius: number;
        };
    };
    edge: {
        [name: string]: {
            indices: number[];
            vertices: number[];
        };
    };
}
declare class OBJLoader {
    load(pathname: string): VAO;
    loadHitboxes(pathname: string): HitboxesJSON;
}
export default OBJLoader;
//# sourceMappingURL=OBJLoader.d.ts.map