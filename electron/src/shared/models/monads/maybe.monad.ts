export class Maybe<T> {
  private constructor(private readonly _val: T | undefined | null) {}

  static lift<T>(value: T | undefined | null) {
    return Maybe.exists(value) ? new Maybe<T>(value) : new Maybe<T>(null);
  }

  private static some<R>(value: R) {
    return Maybe.lift<R>(value);
  }

  private static none<R>() {
    return Maybe.lift<R>(null);
  }

  private static exists<T>(value: T): value is Exclude<T, null | undefined> {
    return value !== undefined && value !== null;
  }

  chain<R>(fn: (arg: T) => Maybe<R>): Maybe<R> {
    return Maybe.exists(this._val) ? fn(this._val) : Maybe.none<R>();
  }

  map<R>(fn: (arg: T) => R): Maybe<R> {
    return Maybe.exists(this._val)
      ? Maybe.some<R>(fn(this._val))
      : Maybe.none<R>();
  }

  unwrap(): T {
    return this._val as T;
  }
}
