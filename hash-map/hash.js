class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
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

      oldData.forEach((bucket) =>
        bucket.forEach((item) => this.set(item.key, item.value)),
      );
    } else return;
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
    return null;
  }

  set(key, value) {
    let bucket = this.buckets[this.hash(key)];
    console.log(bucket);
    let keyCheck = this.checker(key, bucket);

    for (const e of bucket) {
      if (keyCheck) {
        e.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.tracker += 1;
    console.log(this.tracker);
    this.capacityResize();
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
      this.tracker = this.tracker - 1;
      return true;
    }
    return false;
  }
  //there are two methods in getting total number of keys in a hash map
  // 1 looping
  lengthLoop() {
    let total = 0;
    this.buckets.forEach((bucket) =>
      bucket.forEach((item) => {
        if (item.key) {
          total++;
        }
      }),
    );
    return total;
  }

  lengthTrack() {
    return this.tracker;
  }

  // two ways to clear
  clearLoop() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }
  }

  instantClear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }
  // two ways
  //using forEach
  keys() {
    let keyArray = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((item) => keyArray.push(item.key));
    });
    return keyArray;
  }

  values() {
    let valueArray = [];
    this.buckets.forEach((bucket) =>
      bucket.forEach((item) => valueArray.push(item.value)),
    );
    return valueArray;
  }

  entries() {
    let entriesArray = [];
    this.buckets.forEach((bucket) =>
      bucket.forEach((item) => entriesArray.push([item.key, item.value])),
    );
    return entriesArray;
  }
  // using flatMap ps. a method that maps the buckets then removes the array by one level

  keyFlat() {
    return this.buckets.flatMap((bucket) => bucket.map((item) => item.key));
  }

  valueFlat() {
    return this.buckets.flatMap((bucket) => bucket.map((item) => item.value));
  }

  entriesFlat() {
    return this.buckets.flatMap((bucket) =>
      bucket.map((item) => [item.key, item.value]),
    );
  }
}
let map = new HashMap();
console.log(map.hash("France"));
console.log(map.buckets);
map.set("France", "paris");
console.log(map.lengthTrack());
let bucket = map.buckets[map.hash("France")];
console.log(bucket);
console.log(map.checker("France", bucket));

map.set("Nigeria", "Abuja");
let buckt = map.get("Nigeria");

module.exports = { HashMap };
