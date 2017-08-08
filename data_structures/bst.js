/*jshint esversion: 6 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    // constructor
  }
}

class LinkedList {
  constructor() {
    this._length = 0;
    this.head = null;
  }

  add(value) {
    let node = new Node(value);
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

  // partition(value) {
  //   let lhs = new LinkedList();
  //   let rhs = new LinkedList();
  //   let currentNode = this.head;

  //   while (currentNode) {
  //     if (currentNode.data < value) {
  //       lhs.add(currentNode.data);
  //     } else if (currentNode.data >= value) {
  //       rhs.add(currentNode.data);
  //     }
  //     currentNode = currentNode.next;
  //   }

  //   // Combine lists
  //   let currentNode = lhs.head;
  //   while (currentNode.next) {
  //     currentNode = currentNode.next;
  //   }
  //   currentNode.next = rhs.head;

  //   return lhs;
  // }

}

class BinarySearchTree {
    
    constructor() {
        this.head = null;
        this.marked = false;
    }

    createNode(input) {
        
        return {
            left: null,
            right: null,
            data: input,
            marked: false,
        };
    }

    add(input) {
        if (!this.head) {
            this.head = this.createNode(input);
        } 
        else {
            this.insert(this.head, input);
        }
        return this;
    }


    insert(node, input) {
        if (node.data > input) {
            if (node.left === null) {
                node.left = this.createNode(input);
            } 
            else {
                this.insert(node.left, input);
            }
        } 
        else {
            if (node.right === null) {
                node.right = this.createNode(input);
            }
            else {
                this.insert(node.right, input);
            }
        }
        return this;
    }

    getHeight(root) {
        if (root === null) { // Base case
            return 0; 
        }
        return Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
    }

    isBalanced(root = this.head) {
        if (root === null) { // Base case
          return true;
        }
        var heightDifference = Math.abs(this.getHeight(root.left) - this.getHeight(root.right));
        if (heightDifference > 1) {
          return false;
        } else {
          return this.isBalanced(root.left) && this.isBalanced(root.right);
        }
    }


    validateTree(node = this.head) {
        if (node) {
            if (node.left && node.left.data > node.data) {
                return false;
            }
            if (node.right && node.right.data < node.data) {
                return false;
            }
            return this.validateTree(node.left) && this.validateTree(node.right);
        }
        return true;
    }

    dfs(node = this.head, target = 0) {
        if (node) {
            if (node.data === target) {
                return node;
            } 
            return this.dfs(node.left, target) || this.dfs(node.right, target);
        }
        return false;
    }


    bfs(node = this.head, target = 0) {
        let queue = [];
        node.marked = true;
        queue.unshift(node);

        while(queue.length > 0) {

            let temp = queue.pop();
            if (temp.data === target) {
                return temp;
            }
            if (temp.left) {
                if (!temp.left.marked) {
                    temp.left.marked = true;
                    queue.unshift(temp.left);
                }
            }
            if (temp.right) {
                if (!temp.right.marked) {
                    temp.right.marked = true;
                    queue.unshift(temp.right);
                }
            }
        }

        return "No such node.";
    }


  preOrder(node = this.head) {

    console.log(node.data);
    if (node.left) {
      this.preOrder(node.left);
    } 
    if (node.right) {
      this.preOrder(node.right);
    }

  }

  inOrder(node = this.head) {

    if (node.left) {
      this.inOrder(node.left);
    }
    console.log(node.data);
    if (node.right) {
      this.inOrder(node.right);
    }

  }

  postOrder(node = this.head) {

    if (node.left){
      this.postOrder(node.left);
    }
    if (node.right) {
      this.postOrder(node.right);
    }
    console.log(node.data);

  }

  flattenToLinkedList(root = this.head, listsArray = [], level = 0) {
        if (root === null) {
          return;
        }

        let list = null;
        if (listsArray.length === level) {
          list = new List();
          listsArray[level] = list;
        } else {
          list = listsArray[level];
        }

        list.add(root.data);
        flattenToLinkedList(root.left, listsArray, level + 1);
        flattenToLinkedList(root.right, listsArray, level + 1);

    }

    invert(root) {
        if (root) {
            let left = root.left ? root.left : null,
                right = root.right ? root.right : null;
            root.left = this.invert(right);
            root.right = this.invert(left);
        }
        return root;
    }

    maxDepth(root) {
        if(root === undefined || root === null){
            return 0;
        }
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }

    printAllPaths(root = this.head, paths = []) {
        
        // Use DFS, means me need the !root base case. 
        if (!root) {
            return;
        }

        paths.push(root.data);
    
        /* Check if we are at a terminal node, we don't want to keep recursing and use if(!root)
        becuase we will pop twice if we do that */
        if (!root.left && !root.right) {
            console.log(paths.join("-"));
            paths.pop();
            return null;
        }

        this.printAllPaths(root.left, paths);
        this.printAllPaths(root.right, paths);
        
        // Pop once more once both paths have finished because it means we are in an intermediary step
        paths.pop();
        return null;
    }

    printLongestPath(root = this.head, paths = [], finishedPaths = []) {
         
        if (!root) {
            return;
        }

        paths.push(root.data);
    
        // Check if we are at a terminal node, we don't want to keep recursing and use if(!root) becuase we will pop twice if we do that
        if (!root.left && !root.right) {
            //finishedPaths = finishedPaths.concat(paths)
            finishedPaths.push(paths.join("-"));
            paths.pop();
            return null;

            /* Explanation: how does finishedPaths propogate back to the previous 
               level after returning null? In JS, objects are passed by value.. sort of. 
               Arrays are objects. Pushing mutates the array. You are operating over the reference
               to finishedPaths itself, altering what is located at its address in memory. So you 
               don't need to pass it back with a return statement to maintain the changes. However, 
               you cannot assign a new value to an object, that will not be maintained, so the 
               commented out code about concat won't work, and since concat doesn't mutate, you're SOL. */
        }

        this.printLongestPath(root.left, paths, finishedPaths);
        this.printLongestPath(root.right, paths, finishedPaths);
        
        // Pop once more once both paths have finished because it means we are in an intermediary step
        
        paths.pop();
        
        let lengths = finishedPaths.map(el =>{return el.split("-").length});
        let longest = finishedPaths[lengths.indexOf(Math.max.apply(null, lengths))];
        
        return longest;

        /* could do finishedPaths.sort((a,b) => { return a.length <= b.length})[0]; 
           but sorting is an O(n log n) operation! mapping, indexOf, and _max all run seperately on O(n) time */
    }

    hasPathSum(root, sum) {

        if (!root) {
            return false;
        }

        if (!root.left && !root.right) {
            return (root.data == sum);
        } else if (root.data === sum) {
            return true;
        }

        return hasPathSum(root.left, sum - root.data) || hasPathSum(root.right, sum - root.data);
    }

    isSameTree(p, q) 
    {
        if(p === null && q === null) {
            return true;
        }
        if(p === null || q === null) {
            return false;
        }
        if(p.val == q.val) {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }
        return false;
    }

    // sumOfLeftLeaves(root) {
    //     if (!root) {
    //         return 0;
    //     }

    //     var sum = 0;

    //     if (root.left && (!root.left.left && !root.left.right)) {
    //         sum = root.left.val;
    //     }    
    //     return sum + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
    // }

    sumOfLeaves(root = this.head) {
        
        // Just use BFS
        var queue = [];
        var sum = 0;
        root.marked = true;
        queue.unshift(root);
  
        while(queue.length > 0) {
            let temp = queue.pop();
            sum += temp.data;
            if (temp.left) {
                if (!temp.left.marked) {
                    temp.left.marked = true;
                    queue.unshift(temp.left);
                }
            }
            if (temp.right) {
                if (!temp.right.marked) {
                    temp.right.market = true;
                    queue.unshift(temp.right);
                }
            }
        }
        return sum;
    }

    sumOfLeftLeaves(root = this.head) {

        // Just do BFS but mark the right ones and don't count them
        var queue = [];
        var sum = 0;
        root.marked = true;
        queue.unshift(root);
  
        while(queue.length > 0) {
            let temp = queue.pop();
            if (!temp.rightNode) {
                sum += temp.data;
            }

            if (temp.left) {
                if (!temp.left.marked) {
                    temp.left.marked = true;
                    queue.unshift(temp.left);
                }
            }
            if (temp.right) {
                if (!temp.right.marked && temp.right.left) {
                    temp.right.marked = true;
                    temp.right.rightNode = true;
                    queue.unshift(temp.right);
                }
            }  
        }
        return sum - this.head.data;
    }

}



// Test Code

var tree = new BinarySearchTree();
tree.add(20);
tree.add(10);
tree.add(15);
tree.add(5);
tree.add(30);
tree.add(35);
tree.add(25);