"use strict"

/*
  this file is for running a single benchmark and tracking of its outcome
  it gets called by the benchmarking class
 */

import { PerformanceObserver, performance } from "perf_hooks"
import Helper from "./class/cHelper.js"

export default class Runner {
  constructor (instance, iterations){
    this.helper       = new Helper()
    this.dietPlanner  = instance
    this.iterartions  = iterations
    
    this.mealPlans    = []
    this.performance  = []

  }
  runTests(){
    let cnt = 0
    while (cnt < this.iterartions){
      let start = performance.now()

      // execution of the function to be tested
      this.mealPlans.push(this.dietPlanner.planDay())
      let duration = performance.now() - start
      this.performance.push(duration)
      cnt++
    }
  }
  hrMillis(measure) {
    return (measure[0] * 1000) + (measure[1] / 1e6)
  }
}