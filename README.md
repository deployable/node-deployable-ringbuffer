# [deployable-ringbuffer](https://github.com/deployable/deployable-ringbuffer)

Circular buffer stored in an array

### Install
 
    npm install deployable-ringbuffer --save

    yarn add deployable-ringbuffer

### Usage

```javascript

const RingBuffer = require('deployable-ringbuffer')
const rb = new RingBuffer(5)

// Add items
rb.add('one')
rb.add('two')
rb.add('three')
rb.add('four')
rb.add('five')

// Get the last item
rb.last() // => 'five'

// Get the entire array
rb.toArray() // => [ 'one', 'two', 'three', 'four', 'five' ]

// Oldest on the left will be overwritten
rb.add('six')
rb.toArray() // => [ 'two', 'three', 'four', 'five', 'six' ]

// Clear the buffer down
rb.clear()
rb.toArray() // => [ , , , , ]

```

### License

deployable-ringbuffer is released under the MIT license.
Copyright 2016 Matt Hoyle Deployable Ltd

https://github.com/deployable/deployable-ringbuffer

