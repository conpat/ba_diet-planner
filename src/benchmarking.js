"use strict"

/*
  in this file the benchmarking get handled
    - configurate a single benchmark
    - organize benchmarks
    - save benchmark results
 */


import helper from './../src/class/cHelper.js'
import { dietPlanner_1 } from './../diet_planner/cPlanner_1.js'
import { dietPlanner_2 } from './../diet_planner/cPlanner_2.js'
import runner from './runner.js'


export default class benchmarking {
  constructor(clients){
    console.log("dafug")
    this.helper = new helper()
    this.clients    = clients
    this.iterations = 50
  }

  testBaseline() {
    console.log("testBaseline")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new dietPlanner_1(client))
      benchmarks.push(new runner(`baseline-c_${client.id}`, dietPlanners[dietPlanners.length - 1], this.iterations))
      benchmarks[benchmarks.length - 1].runTests()
      this.saveBenchmarkResult(benchmarks[benchmarks.length - 1])
    })
  }
  testDietPlanner_2() {
    console.log("testDietPlanner2")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new dietPlanner_2(client))
      benchmarks.push(new runner(`dietPlaner_2-c_${client.id}`, dietPlanners[dietPlanners.length - 1], this.iterations))
      benchmarks[benchmarks.length - 1].runTests()
      this.saveBenchmarkResult(benchmarks[benchmarks.length - 1])
    })
  }
  saveBenchmarkResult(benchmark){
    this.helper.writeObject2File(`./diet_planner/results/${benchmark.dietPlanner.plannerVersion}/performance/client${benchmark.dietPlanner.client.id}.json`, benchmark.performance)
    benchmark.dietPlanner.saveOutput()
  }
}