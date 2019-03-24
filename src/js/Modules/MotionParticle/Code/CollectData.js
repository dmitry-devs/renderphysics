import { Calc } from '../../../Core/Calc';

export class Data {
    constructor() {
        this.coordinateQuarter = [90, 180, 270, 360];
        this.maxDuration = 15;
        this.maxRadius = 15;
        let angleRotation = Math.PI / 180;
        this.angle = {
            x: angleRotation,
            y: angleRotation,
            z: angleRotation,
        };
    }
    collect({ charge, duration, induction, quantity, size }) {
        const gapsDegrees = 360 / quantity;
        const inductionValue = 5 / induction;
        let degree = 0;
        let options = [];
        for (let i = 0; i < quantity; i++) {
            let degreeThis = (degree += gapsDegrees);
            const quarter = Calc.getCoordinateQuarter(degreeThis);
            const rotateValue = this.getRotateValue(quarter, degreeThis);
            const radius = this.getRadius(duration, inductionValue);
            const { sign, signAngle } = this.getSigns(quarter);
            const aClockwise = charge ? !(sign > 0) : sign > 0;
            const increase = (radius / 180) * (charge ? sign : signAngle);
            options.push({
                charge: charge,
                radius: radius * sign,
                size: size,
                increase: increase,
                aClockwise: aClockwise,
                position: {
                    x: this.getMathSin(degreeThis) * radius,
                    y: 0,
                    z: this.getMathSin(rotateValue) * radius * signAngle,
                },
                rotate: {
                    x: 0,
                    y: -Calc.inRad(rotateValue),
                    z: 0,
                },
                angle: { ...this.angle },
                y: 0,
            });
        }
        return options;
    }
    getRadius(duration, induction) {
        return (duration / this.maxDuration) * this.maxRadius * induction;
    }
    getSigns(quarter) {
        const quarterSign = quarter === 1 || quarter === 3;
        return {
            sign: quarterSign ? 1 : -1,
            signAngle: quarterSign ? -1 : 1,
        };
    }
    getRotateValue(quarter, degreeThis) {
        if (degreeThis > 90) {
            return 90 * (quarter + 1) - (degreeThis - 90 * quarter);
        } else {
            return 90 - degreeThis;
        }
    }
    getMathSin(value) {
        return Math.sin(Calc.inRad(value));
    }
}
