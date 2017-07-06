class BinaryHeap {
    
    constructor(d) {
        this.content = [d];
    }
    
    add(data) {
        this.content.push(data);
        this.bubbleUp(this.content.length - 1, data);
    }
    
    bubbleUp(length, data) {
        
        if (length > 0) {
            var parentIndex = this.getParentIndex(length);
            var parentData = this.content[parentIndex];
        }
        
        if (this.shouldSwap(data, parentData)) {
            this.content[parentIndex] = data;
            this.content[length] = parentData;
            this.bubbleUp(parentIndex, data);
        }
    }
    
    getParentIndex(idx) {
        return Math.floor((idx - 1) / 2);
    }
    
    shouldSwap(data1, data2) {
        return data1 > data2;
        // Currently represents max heap. Flip > to < to make it a min heap.
    }
    
    print() {
        return this.content;
    }

}

let b = new BinaryHeap(120);
b.add(100);
b.add(50);
b.add(60);
b.add(10);
b.add(5);
b.print();