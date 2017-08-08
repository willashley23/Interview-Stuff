class BinaryHeap {
    constructor() {
        this.content = [];
    }
    
    // O(log(n)) time.
    add(d) {
        this.content.push(d);
        this.bubbleUp(this.content.length - 1, d);
    }
    
    bubbleUp(length, data) {
        
        if (length > 0) {
            var parentIndex = Math.floor(length - 1 / 2);
            var parentData = this.content[parentIndex];
        }
        
        if (this.shouldSwap(data, parentData)) {
            this.content[parentIndex] = data;
            this.content[length] = parentData;
            this.bubbleUp(parentIndex, data);
        }
    }
    
    shouldSwap(d1,d2) {
        return d1 > d2;
    }
    
    // O(log(n)) time, depends on how many levels you need to bubble down, average O(1);
    extract() {
        let max = this.content[0];
        this.content[0] = this.content.pop();
        this.heapifyDown(0, this.content[0]);
        return max;
    }
    
    heapifyDown(parentIndex, parentData) {
        
        if (parentIndex < this.content.length) {
            
            let targetIndex = parentIndex,
                targetData = parentData,
                leftChildIndex = (parentIndex * 2) + 1,
                rightChildIndex = (parentIndex * 2) + 2;
            
            if (leftChildIndex < this.content.length) {
                
                if (this.shouldSwap(this.content[leftChildIndex], targetData)) {
                    targetIndex = leftChildIndex;
                    targetData = this.content[leftChildIndex];
                }
            }
            
            if (rightChildIndex < this.content.length) {
                
                if (this.shouldSwap(this.content[rightChildIndex], targetData)) {
                    targetIndex = rightChildIndex;
                    targetData = this.content[rightChildIndex];
                }
            }
            
            if (targetIndex !== parentIndex) {
                this.content[parentIndex] = targetData;
                this.content[targetIndex] = parentData;
                this.heapifyDown(targetIndex, parentData);
            }
            
        }
        
    }
    
    print() {
        return this.content;
    }
}


let b = new BinaryHeap();
b.add(100);
b.add(50);
b.add(60);
b.add(120);
b.add(5);
b.print();
b.extract();
b.print();