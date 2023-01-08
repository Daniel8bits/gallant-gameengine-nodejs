import { Vector2, Vector3, Matrix3, Matrix4 } from "@math.gl/core";
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number;
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never;
export type Tuple<T extends any[]> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
    [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>;
};
export type operand = number | Matrix3 | Matrix4 | Vector2 | Vector3;
export {};
//# sourceMappingURL=MathTypes.d.ts.map