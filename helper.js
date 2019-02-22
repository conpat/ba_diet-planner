"use strict"
import util from 'util'

export default class helper {
  constructor(debug = true) {
    this.debug = debug
    this.debug || console.log(`Construct Helper`) //1
  }

  clone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  consoleLog(msg, depth = 3) {
    if (this.debug) {
      if (typeof(msg) === "object") {
        console.log(util.inspect(msg, { colors: true, depth: depth }))
      } else {
        console.log(msg)
      }
    }
  }

  handleErrors(error) {
    console.error(error)
  }

  //https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
  randomizeArray(array) {
    let ctr = array.length
    let temp
    let index

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr)
      ctr--
      temp = array[ctr]
      array[ctr] = array[index]
      array[index] = temp
    }
  }

  digitToBoolean(value) {
    return !!+value
  }

  defineProperty(theObject, key, value, writable = true, enumerable = true, configurable = true) {
    Object.defineProperty(theObject, key, {
      value: value,
      writable: writable,
      enumerable: enumerable,
      configurable: configurable
    })
  }

  // https://jack.ofspades.com/es6-const-not-immutable/index.html
  constantize (obj) {
    // constantizes the first level of properties of the object.
    Object.freeze(obj)
    // iterates over the properties of the object and constantizes them recursively.
    Object.keys(obj).forEach( (key, value) => {
      if ( typeof obj[key] === 'object' ) {
        this.constantize( obj[key] )
      }
    })
  }
}