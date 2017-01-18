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

  // Add a new item
  add (item) {
    this.buffer[this.pointer] = item
    this.pointer = ( this.size + this.pointer + 1 ) % this.size
    return true
  }

  // Get any index
  get (i) {
    return this.buffer[i]
  }

  // Last entry added, one before pointer
  last () {
    let index = ( this.size + this.pointer - 1 ) % this.size
    return this.buffer[index]
  }

  // Chop the array at pointer forward (oldest).
  // Append the array from pointer back (newest).
  toArray(){
    let res = this.buffer.slice(this.pointer, this.size)
    if ( this.pointer > 0 )
      res = res.concat(this.buffer.slice(0, this.pointer))
    return res
  }

  // Clear/reset the ring buffer
  clear(){
    this.buffer = new Array(this.size)
    this.pointer = 0
    return true
  }

  // Return a write stream that uses the ring buffer (deployable-log/pino)
  writeStream(){
    if ( this.stream ) return this.stream
    return this.stream = new require('stream').Writable({
      write: (chunk, enc, next)=> {
        try {
          this.add(chunk)
        } catch (err) {
          next(err)
        }
        next()
      }
    })
  }

}

