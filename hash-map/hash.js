class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.tracker = 0;
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
    for (const e of bucket) {
      if (e.key === key) {
        return e;
      }
    }
    null;
  }

  set(key, value) {
    let bucket = this.buckets[this.hash(key)];
    console.log(bucket);
    let keyCheck = this.checker(key, bucket);
    console.log(keyCheck);

    for (const e of bucket) {
      if (keyCheck) {
        e.value = value;
        this.tracker + 1;
        return;
      }
    }

    bucket.push({ key, value });
  }

  get(key) {
    let bucket = this.buckets[this.hash(key)];
    let keyCheck = this.checker(key, bucket);
    for (const e of bucket) {
      if (keyCheck) {
        return e.value;
      }
    }
    return undefined;
  }

  has(key) {
    let bucket = this.buckets[this.hash(key)];
    let keyCheck = this.checker(key, bucket);
    for (const e of bucket) {
      if (keyCheck && e.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];

    let index = bucket.findIndex((item) => item.key === key);
    if (index !== -1) {
      bucket.splice(index, 1);
      this.tracker - 1;
      return true;
    }
    return false;
  }
  //there are two methods in getting total number of keys in a hash map
  // 1 looping
  lengthLoop() {
    let total = 0;
    for (let i = 0; i < this.buckets.length(); i++) {
      total += this.buckets[i];
    }
    return total;
  }

  lenghtTrack() {
    return this.tracker;
  }

  // two ways to clear
  clearLoop() {
    for (let i = 0; i < this.buckets.length(); i++) {
      this.buckets[i] = [];
    }
    return this.buckets;
  }

  instantClear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }
}

let map = new HashMap();
console.log(map.hash("France"));
console.log(map.buckets);

map.set("France", "Paris");

module.exports = { HashMap };
