export interface IMutableComponent<T> {
  setOption(key: keyof T, value: T[keyof T]): void;
}
