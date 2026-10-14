class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashNumber = 0;
    let primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashNumber =
        (primeNumber * hashNumber + key.charCodeAt(i)) % this.capacity;
    }
    return hashNumber;
  }

  entryChecker(key, bucket) {
    for (let e of bucket) {
      if (e.key === key) {
        return e;
      }
    }
    return null;
  }

  set(key) {
    let bucket = this.buckets[this.hash(key)];
    let keycheck = this.entryChecker(key, bucket);
    for (let e of bucket) {
      if (keycheck) {
        return;
      }
    }
    bucket.push([key]);
  }
}
