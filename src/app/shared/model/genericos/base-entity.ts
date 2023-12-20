export class BaseEntity<K> {
  id?: K;
  constructor(obj?: BaseEntity<K>) {
    Object.assign(this,obj);
  }
}
