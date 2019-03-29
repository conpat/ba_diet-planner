"use strict"
import util from 'util'
import fileSystem from 'fs'

export default class Helper {
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

  getRandomIndexArray(arrayLength){
    let indexArray = []
    for(let i = 0; i < arrayLength; i++){
      indexArray.push(i)
    }
    return this.randomizeArray(indexArray)
  }

  //https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
  randomizeArray(array) {
    let cntr = array.length
    let temp
    let index

    while (cntr > 0) {
      index = Math.floor(Math.random() * cntr)
      cntr--
      temp = array[cntr]
      array[cntr] = array[index]
      array[index] = temp
    }
    return array
  }

  getRandomPosition(lengthOfArray) {
    return Math.floor(this.getRandomNumber(lengthOfArray))
  }

  getRandomNumber(maxima) {
    return Math.random() * maxima
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
  filterObject(obj, callback){
    return Object.keys(obj)
      .filter(key => callback(obj[key]))
      .reduce((res, key) => {
        res[key] = obj[key]
        return res
      }, {})
  }
  writeObject2File(filePath, data) {
    fileSystem.writeFileSync(filePath, JSON.stringify(data, null, "  "), "utf8")
    console.log("File Completed: " + filePath)
  }
}