export class IO<T> {
  constructor(private readonly _effect: () => T) {}

  private _apply<B>(fn: (a: T) => B | IO<B>): IO<B> {
    const result = fn(this._effect());

    return result instanceof IO ? result : new IO(() => result);
  }

  chain<B>(fn: (a: T) => IO<B> | B): IO<B> {
    return this._apply(fn);
  }

  map<B>(fn: (a: T) => B): IO<B> {
    return this._apply(fn);
  }

  run(): T {
    return this._effect();
  }
}
