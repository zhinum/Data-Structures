class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.tracker = 0;
  }

  capacityResize() {
    let loadCheck = this.tracker / this.capacity;
    if (loadCheck >= this.loadFactor) {
      const oldData = this.buckets;
      this.capacity *= 2;
      const newData = new Array(this.capacity).fill(null).map(() => []);

      this.buckets = newData;
      this.tracker = 0;

      oldData.forEach((bucket) =>
        bucket.forEach((item) => this.set(item.key, item.value)),
      );
    } else return;
  }

  hash(key) {
    let hashNumber = 0;
    let primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashNumber =
        (primeNumber * hashNumber + key.charCodeAt(i)) % this.capacity;
    }
    if (hashNumber < 0 || hashNumber >= this.buckets.length)
      throw new Error("Trying to access index out of bounds");
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
    this.tracker += 1;
    this.capacityResize();
  }
}
