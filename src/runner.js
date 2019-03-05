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
    this.results      = []
    this.runs         = []
  }
  runTests(){
    let cnt = 0
    while (cnt < this.iterartions){
      let start = performance.now()

      // execution of the function to be tested
      this.results.push(this.dietPlanner.planDay())

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
    this.dietPlanner.saveOutput(this.results)
  }
}
/*
"use strict"

import Benchmark from 'benchmark'

/**
 * runs the benchmarks then updates the console after all the tests have
 * ran.
 *
function runBenchmarks(nameOfTest, testLoader, onCycle) {
  var suite = Benchmark.Suite(nameOfTest)
  var results = []
  testLoader(suite)

  // Runs the benchmarks
  var suiteRunner = suite.
  on('cycle', function(event) {
    results.push(event)
    //console.log(String(event.target));
  }).
  on('error', function(e) {

    // Do we want some form of exit or logging?
    console.log(e)
    //process.exit(1)
  }).
  on('complete', function() {

    // for CSV style output.
    // TODO: We could include a lot more information.
    // Perhaps something we should consider is a range instead of
    // a single number being returned.
    var sum = results.reduce(function(s, event) {
      return s + event.target.hz
    }, 0)
    var average = sum / results.length
    console.log([nameOfTest].concat(average).join(','))
    //console.log('Fastest is ' + this.filter('fastest').map('name'));
  })

  // If there is a onCycle function provided, then we will attach the
  // extra listener.
  if (onCycle) {
    suite.on('cycle', onCycle)
  }

  suiteRunner.run({ 'async': true })
}

/**
 * silly convience function for adding the same tests a bunch.
 *
function buildNTests(count, title, suite, fn) {
  for (var i = 0; i < count; i++) {
    suite.add(title + ':' + i, fn)
  }
}
export { runBenchmarks, buildNTests }
*/