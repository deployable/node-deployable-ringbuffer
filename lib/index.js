// # RingBuffer

const debug = require('debug')('dply:ringbuffer')
//const class_uid = require('deployable-classuid')
const crypto = require('crypto')


// ## class RingBuffer

module.exports = class RingBuffer{

  // `new RingBuffer(size)`
  constructor ( size ) {
    //class_uid('rb', this)
    this.class_uid = 'rbuf-'+crypto.randomBytes(8).toString('hex')
    this.size = size
    this.sizei = size - 1
    this.buffer = new Array(size)
    this.pointer = 0
    debug('%s created RingBuffer size %s', this.class_uid, this.size)
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
    debug('%s clearing RingBuffer', this.class_uid)
    this.buffer = new Array(this.size)
    this.pointer = 0
    return true
  }

  // Return a write stream that uses the ring buffer (deployable-log/pino)
  writeStream(cb){
    if ( this.stream ) return this.stream
    debug('%s creating stream RingBuffer', this.class_uid)
    return this.stream = new require('stream').Writable({
      write: (chunk, enc, next)=> {
        try {
          if ( typeof cb === 'function' ) cb(chunk)
          this.add(chunk)
        } catch (err) {
          next(err)
        }
        next()
      }
    })
  }

}

