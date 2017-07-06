class ringBuffer {
  constructor(maxLength) {
    this.maxLength = maxLength;
    this.buffer = new Array(maxLength - 1);
  }
  
  push(element) {
    this.buffer.push(element);
    while (this.buffer.length > this.maxLength) {
      this.buffer.shift();
    }
  }
}