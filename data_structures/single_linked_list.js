function Node(data) {
    this.data = data;
    this.next = null;
}
 
function SinglyList() {
    this._length = 0;
    this.head = null;
}
 
SinglyList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;
 
    // 1st use-case: an empty list
    if (!currentNode) {
        this.head = node;
        this._length++;
 
        return node;
    }
 
    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    this._length++;
     
    return node;
};
 
SinglyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};

SinglyList.prototype.printList = function() {
  let current = this.head;
  while(current) {
    console.log(current.data)
    current = current.next
  }
}

  SinglyList.prototype.removeDuplicates = function() {
        let prev = this.head;
        let counter = 0
        let current = this.head.next;
        let hash = {};
        while(current) {
            if(!hash[current.data]) {
                hash[current.data] = true;
                prev = current;
            current = current.next;
            } else {
                prev.next = current.next;
                nodeToDelete = current
                current = current.next.next;
                nodeToDelete = null
                this._length--;
            }
            counter++;
           
        }
    }
    
    SinglyList.prototype.removeDuplicatesNoBuffer = function() {
        ptr1 = this._head;
        while(ptr1 != null) {
            ptr2 = ptr1;
            while(ptr2.next != null) {
                if(ptr1.data == ptr2.next.data) {
                    ptr2.next = ptr2.next.next;
                    this._size--;
                } else {
                    ptr2 = ptr2.next;
                }
            }
            ptr1 = ptr1.next;
        }
    }
 
 
 SinglyList.prototype.kthToLast = function(k) {
  if (k === 0 || k < 0) {
    return this.searchNodeAt(this._length).data;
  }
  let pos = this._length - k
  let count = 0;
  let currentNode = this.head;
  while(currentNode) {
    if (count === pos) {
      return currentNode.data
    } else {
      count++;
      currentNode = currentNode.next;
    }
  }
 }
 
 SinglyList.prototype.removeMiddleNode = function(node) {
  let prev = this.head
  let currentNode = prev.next;
  while (currentNode) {
    if (currentNode.data === node) {
      prev.next = currentNode.next
      currentNode = null;
      break;
    }
    currentNode = currentNode.next; 
    prev = prev.next
  }
 }
 
SinglyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;
         
        return deletedNode;
    }
 
    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
 
    return deletedNode;
};

SinglyList.prototype.reverseInPlace = function(node) {
  let next, last = null;
  let curr = node;
  if(curr === null)
    return null;

  while (curr && curr.next !== null && curr.next !== curr){
    next = curr.next;
    curr.next = last;
    last = curr;
    curr = next;
  }
  curr.next = last;
  this.head = curr;
  return curr;
}

SinglyList.prototype.rotateByKthNode = function(k) {
   let prevHead = this.head,
       previous = this.head, 
       current = this.head,
       i = 1;
   while(current.next){
     if(i == k + 1){
       this.head = current;
       previous.next = null;
     }
     previous = current;
     current = current.next;
     i++;
  }
  current.next = prevHead;
  return this;
}


SinglyList.prototype.rotateInner = function(start, end) {
  let next, last = null;
  let curr = this.head;
  let prev = this.head;
  let i = 0;
  //Edge cases exist for when start or end include the head or the tail of the list
  while (i < start) {
    if (curr != prev) {
      prev = prev.next
    }
    curr = curr.next
    i++;
  }
  let inner_head = curr;
  while (i <= end && curr.next && curr) {
    next = curr.next;
    curr.next = last;
    last = curr;
    curr = next;
    i++;
  }
  inner_head.next = next;
  prev.next = last;
  this.printList();
}

let myList = new SinglyList();
myList.add(1)
myList.add(2)
myList.add(2)
myList.add(3)
myList.add(4)
myList.add(5)
myList.add(6)
myList.rotateByKthNode(2)
myList.printList();
