import { Vector2 } from "@math.gl/core";
export interface LineEquation {
    a: number;
    b: number;
    c: number;
}
export interface CircunferenceEquation {
    a: number;
    b: number;
    r: number;
}
export interface PairPoints {
    p1: Vector2;
    p2: Vector2;
}
export interface BhaskaraResult {
    v1: number;
    v2: number;
}
export type SecondDegreeFunction = LineEquation;
export declare const toRadians: (angle: number) => number;
export declare const toDegrees: (radian: number) => number;
export declare const distanceBetweenPointAndLine: (point: Vector2, line: LineEquation) => number;
export declare const intersectionPointsBetweenLineAndCircunference: (line: LineEquation, circunference: CircunferenceEquation) => PairPoints;
export declare const lineEquationOf: (p1: Vector2, p2: Vector2) => LineEquation;
export declare const circunferenceEquationOf: (p1: Vector2, r: Vector2 | number) => CircunferenceEquation;
export declare const functionOfXFromLineEquation: (line: LineEquation, x: number) => number;
export declare const functionOfYFromLineEquation: (line: LineEquation, y: number) => number;
export declare const bhaskara: (f: SecondDegreeFunction) => BhaskaraResult;
//# sourceMappingURL=math.d.ts.map