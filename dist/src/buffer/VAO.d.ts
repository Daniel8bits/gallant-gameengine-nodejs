import IResource from '../appearance/IResource';
import VBO from './VBO';
export interface VAOType {
    name: string;
    objectData: string | VBO[] | (() => VAO);
}
declare class VAO implements IResource {
    private _vboList;
    private _ibo;
    private _vertexCoordsOffset;
    constructor(vboList: VBO[], vertexCoordsOffset?: number);
    addEmpty(n: number): void;
    create(): void;
    private _createVBO;
    bind(): void;
    unbind(): void;
    destroy(): void;
    private _setAttributePointer;
    getVbo(i: number): VBO;
    getIbo(): VBO;
    getLength(): number;
}
export default VAO;
//# sourceMappingURL=VAO.d.ts.map