// # RingBuffer

// ## class RingBuffer

module.exports = class RingBuffer{

  // `new RingBuffer(size)`
  constructor ( size ) {
    this.size = size
    this.sizei = size - 1
    this.buffer = new Array(size) 
    this.pointer = 0
  }

  add (item) {
    this.buffer[this.pointer] = item
    this.pointer = ( this.size + this.pointer + 1 ) % this.size
  }
  
  get (i) {
    return this.buffer[i]
  }

  last () {
    let index = ( this.size + this.pointer - 1 ) % this.size
    return this.buffer[index]
  }
  
  toArray(){
    let res = this.buffer.slice(this.pointer, this.size)
    if ( this.pointer > 0 )
      res = res.concat(this.buffer.slice(0, this.pointer))
    return res
  } 
  
  clear(){
    this.buffer = new Array(this.size)
    this.pointer = 0
    return true
  }
 
  writeStream(){
    if ( this.stream ) return this.stream
    return this.stream = new require('stream').Writable({ write: (chunk)=> this.add(chunk) })
  }

}

