interface DataField {
    range: Range;
    typeValue: string;
}
interface Range {
    min: number;
    max: number;
}

export class Validation {
    public static onlyNumberMask: any = new RegExp(`[^0-9.]`, 'g');
    static getConfines(val: string, { range, typeValue }: DataField) {
        let value = Number(val.replace(this.onlyNumberMask, ''));
        value = this.checkTypeField(value, typeValue);
        if (range) {
            if (value < range.min) value = range.min;
            if (value > range.max) value = range.max;
        }
        return value;
    }
    static checkTypeField(value: number, type: string) {
        switch (type) {
            case 'int':
                return Math.round(value);
            default:
                return value;
        }
    }
}
