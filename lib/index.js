'use strict';

class LRU {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0)
      throw new TypeError(`Invalid capacity: ${capacity}`);
    this.capacity = capacity;
    this.size = 0;
    this.head = null;
    this.tail = null;
    this.items = Object.create(null);
  }
  _refresh(val) {
    if (val[0] !== null) {
      // Update right pointer of left entry
      val[0][1] = val[1];
    }
    if (val[1] !== null) {
      // Update left pointer of right entry
      val[1][0] = val[0];
    }
    if (this.tail === val) {
      // Update tail if we are refreshing the tail
      this.tail = val[0];
    }
    val[0] = null;
    val[1] = this.head;
    this.head[0] = val;
    this.head = val;
  }
  get(key) {
    const val = this.items[key];
    if (val === undefined)
      return;
    this._refresh(val);
    return val[3];
  }
  set(key, data) {
    let val = this.items[key];
    if (val !== undefined) {
      val[3] = data;
      this._refresh(val);
      return;
    }

    if (this.size < this.capacity) {
      ++this.size;
      val = [null, this.head, key, data];
      if (this.head !== null)
        this.head[0] = val;
      else
        this.tail = val;
      this.head = val;
    } else {
      // Evict/Reuse
      val = this.tail;
      delete this.items[val[2]];
      val[2] = key;
      val[3] = data;
      this._refresh(val);
    }
    this.items[key] = val;
  }
}
module.exports = LRU;
