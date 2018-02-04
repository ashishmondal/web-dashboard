import { IUnit } from './unit';

export abstract class Measurement<T>{
  public get value() {
    return this._value;
  }

  public get unit() {
    return this._unit;
  }

  constructor(protected _value: T, protected _unit: IUnit<T>) {

  }

  setUnit(unit: IUnit<T>) {
    this._value = unit.fromBase(this._unit.toBase(this._value));
    this._unit = unit;
    return this;
  }

  toString() {
    return '' + this._value;
  }
}