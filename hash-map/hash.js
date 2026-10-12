class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.capacity = capacity;
  }

  hash(key) {
    let hashCode = 0;
    let primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  checker(key, bucket) {
    for (const e in bucket) {
      if (e.key === key) {
        return e;
      }
    }
    null;
  }

  set(key, value) {
    let bucket = this.hash(key);
    let keyCheck = this.checker(key, bucket);
    for (const e of bucket) {
      if (keyCheck) {
        e.value = value;
        return;
      }
    }
    bucket.push({ key, value });
  }
  get(key) {
    let bucket = this.hash(key);
    let keyCheck = this.checker(key, bucket);
    for (const e of bucket) {
      if (keyCheck) {
        return e.value;
      }
    }
    return undefined;
  }
}
