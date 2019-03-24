export class Calc {
    static inRad(num: number): number {
        return (num * Math.PI) / 180;
    }
    static getCoordinateQuarter(val: number): number {
        const coordinateQuarter: Array<number> = [90, 180, 270, 360];
        if (val > 90) {
            let quarter: number = 0;
            coordinateQuarter.forEach((el, i) => {
                const next: number = i + 1;
                if (coordinateQuarter[next] === undefined) return next;
                if (val > el && val <= coordinateQuarter[next]) {
                    return (quarter = next);
                }
            });
            return quarter;
        } else {
            return 0;
        }
    }
}
