"use strict"

//import Benchmark from 'benchmark'
import { PerformanceObserver, performance } from 'perf_hooks'
import helper from './class/cHelper.js'

export default class runner {
  constructor (title, instance){
    this.helper       = new helper()
    this.title        = title
    // It is necessary to deliver the whole class instance, in order to call the function without context issues
    this.dietPlanner  = instance
    this.iterartions  = 50
    //this.results      = []
    this.runs         = []
  }
  runTests(){
    let cnt = 0
    while (cnt < this.iterartions){
      let start = performance.now()

      // execution of the function to be tested
      //this.results.push(this.dietPlanner.planDay())
      this.dietPlanner.planDay()

      var duration = performance.now() - start
      this.runs.push(duration)
      cnt++
    }
  }
  getResults(){
    return this.runs
  }
  saveResults(){
    //this.helper.makeDir(`./diet_planner/results/${this.dietPlanner.plannerVersion}/benchmark`)
    this.helper.writeObject2File(`./diet_planner/results/${this.dietPlanner.plannerVersion}/benchmark/client${this.dietPlanner.client.id}.json`, this.runs)
    this.dietPlanner.saveOutput()
  }
}