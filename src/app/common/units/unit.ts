export interface IUnit<T> {
    toBase(value: T): T;
    fromBase(value: T): T;
}