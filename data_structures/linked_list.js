export default class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList {
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

  searchNodeAt(position) {
    let currentNode = this.head;
    let len = this._length;
    let count = 1;
    let message = {failure: "No such node."};

    if (len === 0 || position < 1 || position > len) {
      throw new Error(message.failure);
    }

    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  printList() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }

  // Use hash table, runs in O(n) time and space.
  deDup() {
    let prev = this.head;
    let counter = 0;
    let currentNode = this.head.next;
    let nodeToDelete = null;
    let hash = {};

    while (currentNode) {
      if (!hash[currentNode.data]) {
        hash[currentNode.data] = true;
        prev = currentNode;
        currentNode = currentNode.next;
      } else {
        prev.next = currentNode.next;
        nodeToDelete = currentNode;
        currentNode = currentNode.next.next;
        nodeToDelete = null;
        this._length--;
      }
      counter++;
    }
    return this;
  }

  // Recursive solution, O(n^2) time.
  deDupNoBuffer() {
    let currentNode = this.head;

    while (currentNode.next) {
      if (this.head.data === currentNode.next.data) {
        currentNode.next = currentNode.next.next
      } else {
        currentNode = currentNode.next;
      }
    }

    if (this.head.next){
      deDupNoBuffer(this.head.next);
    }

    return head;
  }


  kthToLast(k) {

    // Return the first node 
    if (k === 0 || k < 0 ) {
      return this.searchNodeAt(this._length).data;
    }

    let pos = this._length - k;
    let count = 0;
    let currentNode = this.head;

    while (currentNode) {
      if (count === pos) {
        return currentNode.data
      } else {
        count++;
        currentNode = currentNode.next;
      }
    }
  }

  removeMiddle(node) { 
    let prev = this.head;
    let currentNode = prev.next;
    while (currentNode) {
      if (currentNode.data === node) {
        prev.next = currentNode.next;
        currentNode = null;
        break;
      }
      currentNode = currentNode.next;
      prev = prev.next
    }

  }

  remove(position) {
    let currentNode = this.head;
    let length = this._length;
    let count = 1;
    let message = {failure: 'No such node.'};
    let beforeNodeToDelete = null;
    let nodeToDelete = null;
    let deletedNode = null;

    // Check if position is valid
    if (position < 0 || position > length) {
      throw new Error(message.failure);
    }

    // Edge-case: the first node is removed
    if (position === 1) {
      this.head = currentNode.next;
      deletedNode = currentNode;
      currentNode = null;
      this._length--;
      return deletedNode;
    }

    // Any other case
    while (count < position) {
      beforeNodeToDelete = currentNode;
      nodeToDelete = currentNode.next;
      currentNode = currentNode.next;
      count++;
    }

    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
    return deletedNode;
  }

  reverseInPlace(node) {
    let next, last = null;
    let currentNode = node;
    if (currentNode === null) {
      return null; 
    }

    while (currentNode && currentNode.next !== null && currentNode.next !== currentNode) {
      next = currentNode.next;
      currentNode.next = last;
      last = currentNode;
      currentNode = next;
    }

    currentNode.next = last;
    this.head = currentNode;
    return currentNode;
  }

  rotateByKthNode(k) {
    let prevHead = this.head;
    let previous = this.head;
    let currentNode = this.head;
    let i = i;
    while (currentNode.next) {
      if (i === k + 1) {
        this.head = currentNode;
        previous.next = null;
      }
      previous = currentNode;
      currentNode = currentNode.next;
      i++;
    }
    currentNode.next = prevHead;
    return this;

  }

  rotateInnerSegment(start, end) {
    let next, last = null;
    let currentNode = this.head;
    let prev = this.head;
    let i = 0;

    while (i < start) {
      if (currentNode != prev) {
        prev = prev.next;
      }
      currentNode = currentNode.next;
      i++;
    } 
    // Keep track of the 'head' of the inner segment for pointer managment later
    let inner_head = currentNode;
    while (i <= end && currentNode.next && currentNode) {
      next = currentNode.next;
      currentNode.next = last;
      last = currentNode;
      currentNode = next;
      i++;
    }
    inner_head.next = next;
    prev.next = last;
    return this;
  }

  isPalindrome() {
    if (!this.head || !this.head.next) {
      console.log('Empty or single element List.');
      return;
    }
    let temp = JSON.stringify(this);
    let deepCopy = JSON.parse(temp);
    deepCopy.reverseInPlace();

    let l2 = deepCopy.head;
    let l1 = this.head;

    while (l2) {
      if (l2.data !== l1.data) {
        return false;
      }
      l2 = l2.next;
      l1 = l1.next;
    }
    return true;
  }

  partition(value) {
    let lhs = new LinkedList();
    let rhs = new LinkedList();
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.data < value) {
        lhs.add(currentNode.data);
      } else if (currentNode.data >= value) {
        rhs.add(currentNode.data);
      }
      currentNode = currentNode.next;
    }

    // Combine lists
    let currentNode = lhs.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = rhs.head;

    return lhs;
  }

}