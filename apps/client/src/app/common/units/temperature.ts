import { IUnit } from './unit';
import { Measurement } from './measurement';

export class Temperature extends Measurement<number> {
    constructor(value: number, unit: IUnit<number>) {
        super(value, unit);
    }

    toString() {
        return '' + (this._value | 0);
    }
}

export class Kelvin implements IUnit<number>{
    toBase(value: number) {
        return value;
    }

    fromBase(value: number) {
        return value;
    }

    toString() {
        return 'K';
    }
}

export class Celsius implements IUnit<number>{
    toBase(value: number) {
        return value + 273.15;
    }

    fromBase(value: number) {
        return value - 273.15;
    }

    toString() {
        return '°C';
    }
}


