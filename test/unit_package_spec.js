const expect = require('chai').expect
const RingBuffer = require('../')


describe('Unit::deployable-ringbuffer', function(){

  describe('Something does something', function(){

    it('should create a RingBuffer', function(){
      expect( new RingBuffer(5) ).to.be.ok
    })

    it('should get the last added value with no arg', function(){
      let rb = new RingBuffer(4)
      rb.add('zero')
      rb.add('one')
      expect( rb.last() ).to.equal('one')
    })

    it('should get the last added value on the boundary', function(){
      let rb = new RingBuffer(3)
      rb.add('zero')
      rb.add('one')
      rb.add('two')
      expect( rb.last() ).to.equal('two')
    })

    it('should get the last added value over the boundary', function(){
      let rb = new RingBuffer(2)
      rb.add('zero')
      rb.add('one')
      rb.add('two')
      expect( rb.last() ).to.equal('two')
    })

    it('should get the last added when added', function(){
      let rb = new RingBuffer(100)
      rb.add('first')
      expect( rb.last() ).to.equal('first')
      rb.add('second')
      expect( rb.last() ).to.equal('second')
    })

    it('should get undefined when there is no last', function(){
      let rb = new RingBuffer(3)
      expect( rb.last() ).to.equal( undefined )
    })

    it('should create an array when buffer not full', function(){
      let rb = new RingBuffer(3)
      rb.add('zero')
      rb.add('one')
      expect( rb.toArray() ).to.eql([ , 'zero','one' ])
    })

    it('should create an array when buffer full', function(){
      let rb = new RingBuffer(3)
      rb.add('zero')
      rb.add('one')
      rb.add('two')
      expect( rb.toArray() ).to.eql(['zero','one', 'two'])
    })

    it('should create an array when buffer is over', function(){
      let rb = new RingBuffer(3)
      rb.add('zero')
      rb.add('one')
      rb.add('two')
      rb.add('three')
      rb.add('four')
      expect( rb.toArray() ).to.eql(['two','three','four'])
    })

    it('should clear a buffer', function(){
      let rb = new RingBuffer(2)
      rb.add('zero')
      rb.add('one')
      rb.clear()
      expect( rb.last() ).to.be.undefined
      expect( rb.toArray() ).to.eql([,,])
    })

    it('should return a write stream', function(){
      let rb = new RingBuffer(2)
      let ws = rb.writeStream()
      ws.write('test')
      expect( rb.last().toString() ).to.equal( 'test' )
    })

    it('should write many times to stream', function(){
      let rb = new RingBuffer(2)
      let ws = rb.writeStream()
      ws.write('test')
      ws.write('testa')
      ws.write('testb')
      expect( rb.last().toString() ).to.equal( 'testb' )
    })

  })

})
