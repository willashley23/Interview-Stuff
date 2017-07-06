class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this._length = 0;
    this.head = null;
  }

  add(value) {
    let node = new Node(value)
    let currentNode = this.head;

    if (!currentNode) {
      this.head = node;
      this._length++;

      return node;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;
    this._length++;
    return node;
  }
}
  
 // ==========================


class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = new Array(size);
  }
  
  hash(key) {
    // Hash the key based on its position in the alphabet. Good for demonstration purposes
    // but a terrible hash function in real life. 
    return key.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  
  add(key) {
    // Make sure to check if key is present already before inserting dups!
    if (!this.lookup(key)) {
        let index = this.hash(key);
        if (!this.buckets[index]) {
          // place in the bucket
          this.buckets[index] = key;
        }
        else if(this.buckets[index] instanceof LinkedList) {
          // add to the list
          this.buckets[index].add(key);
        }
        else {
          // create the list
          let list = new LinkedList();
          list.add(key);
          list.add(this.buckets[index]);
          this.buckets[index] = list;
        }
    }
    else {
        return "Key already in hash table";
    }
  }
  
  lookup(key) {
    let index = this.hash(key);
    if (this.buckets[index] instanceof LinkedList) {
      // Separate Chaining
      let temp = this.buckets[index].head;
      while(temp) {
        if (temp.data === key) {
          // could return something more meaningful, like a phone number, if present.
          return true;
        }
        temp = temp.next;
      }
      return false;
    } 
    else if (this.buckets[index] === key) {
      return true;
    } 
    else {
      return false;
    }
  }
  
  // So you can see what the table looks like.
  print() {
    console.log(this.buckets);
  }
}


var table = new HashTable(26);
table.add("will");
table.add("james");
table.add("ann");
table.add("walton");
table.add("walberg");