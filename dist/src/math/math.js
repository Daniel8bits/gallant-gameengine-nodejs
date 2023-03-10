import { Vector2 } from "@math.gl/core";
export const toRadians = (angle) => (angle * Math.PI) / 180;
export const toDegrees = (radian) => (radian * 180) / Math.PI;
export const distanceBetweenPointAndLine = (point, line) => Math.abs(line.a * point.x + line.b * point.y + line.c) / Math.sqrt(line.a ** 2 + line.b ** 2);
export const intersectionPointsBetweenLineAndCircunference = (line, circunference) => {
    if (line.a === line.b) {
        throw new Error('The points are equal');
    }
    if (line.a !== 0 && line.b !== 0) {
        const m = -line.a / line.b;
        const n = -line.c / line.b;
        const a = 1 + m ** 2;
        const b = -2 * circunference.a - 2 * circunference.b * m + 2 * m * n;
        const c = circunference.a ** 2 + circunference.b ** 2 - circunference.r ** 2 + n ** 2 - 2 * circunference.b * n;
        const intersectionX = bhaskara({ a, b, c });
        if (!intersectionX) {
            return null;
        }
        const y1 = functionOfXFromLineEquation(line, intersectionX.v1);
        return {
            p1: new Vector2(intersectionX.v1, y1),
            p2: new Vector2(intersectionX.v2, intersectionX.v1 === intersectionX.v2 ? y1 : functionOfXFromLineEquation(line, intersectionX.v2)),
        };
    }
    else if (line.a === 0 && line.b !== 0) {
        const n = -line.c / line.b;
        const a = 1;
        const b = -2 * circunference.a;
        const c = circunference.a ** 2 + circunference.b ** 2 - circunference.r ** 2 + n ** 2 - 2 * circunference.b * n;
        const intersectionX = bhaskara({ a, b, c });
        if (!intersectionX) {
            return null;
        }
        const y1 = functionOfXFromLineEquation(line, intersectionX.v1);
        return {
            p1: new Vector2(intersectionX.v1, y1),
            p2: new Vector2(intersectionX.v2, intersectionX.v1 === intersectionX.v2 ? y1 : functionOfXFromLineEquation(line, intersectionX.v2)),
        };
    }
    const n = -line.c / line.a;
    const a = 1;
    const b = -2 * circunference.b;
    const c = circunference.a ** 2 + circunference.b ** 2 - circunference.r ** 2 + n ** 2 - 2 * circunference.a * n;
    const intersectionY = bhaskara({ a, b, c });
    if (!intersectionY) {
        return null;
    }
    const x1 = functionOfYFromLineEquation(line, intersectionY.v1);
    return {
        p1: new Vector2(x1, intersectionY.v1),
        p2: new Vector2(intersectionY.v1 === intersectionY.v2 ? x1 : functionOfYFromLineEquation(line, intersectionY.v2), intersectionY.v2),
    };
};
export const lineEquationOf = (p1, p2) => ({
    a: p1.y - p2.y,
    b: p2.x - p1.x,
    c: p1.x * p2.y - p1.y * p2.x
});
export const circunferenceEquationOf = (p1, r) => ({
    a: p1.x,
    b: p1.y,
    r: r instanceof Vector2 ? p1.distanceTo(r) : r
});
export const functionOfXFromLineEquation = (line, x) => (-line.a * x - line.c) / line.b;
export const functionOfYFromLineEquation = (line, y) => (-line.b * y - line.c) / line.a;
export const bhaskara = (f) => {
    const delta = f.b ** 2 - 4 * f.a * f.c;
    if (delta < 0)
        return null;
    const rDelta = Math.sqrt(delta);
    const x1 = (-f.b + rDelta) / (2 * f.a);
    const x2 = delta === 0 ? x1 : (-f.b - rDelta) / (2 * f.a);
    return { v1: x1, v2: x2 };
};
