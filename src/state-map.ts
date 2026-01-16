export class StateMap<K, V extends object> extends Map {
  update(key: K, values: Partial<V>) {
    const current = this.get(key) ?? {};

    this.set(key, {
      ...current,
      ...values,
    });
  }
}
