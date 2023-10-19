type MaybeVal<T> = T | undefined | null;

export class Maybe<T> {
  val: MaybeVal<T>;

  constructor(value: MaybeVal<T>) {
    this.val = value;
  }

  static lift<T>(value: MaybeVal<T>) {
    return Maybe.exists(value) ? new Maybe<T>(value) : new Maybe<T>(null);
  }

  static some<R>(value: R) {
    return Maybe.lift<R>(value);
  }

  static none<R>() {
    return Maybe.lift<R>(null);
  }

  private static exists<T>(val: T): val is Exclude<T, null | undefined> {
    return val !== undefined && val !== null;
  }

  fMap<R>(fn: (arg: T) => Maybe<R>): Maybe<R> {
    return Maybe.exists(this.val) ? fn(this.val) : Maybe.none<R>();
  }

  map<R>(fn: (arg: T) => R): Maybe<R> {
    return Maybe.exists(this.val)
      ? Maybe.some<R>(fn(this.val))
      : Maybe.none<R>();
  }

  unwrap(): T {
    return this.val as T;
  }
}
