"use strict"

import { dietPlanner_1 } from './../diet_planner/cPlanner_1.js'
import { dietPlanner_2 } from './../diet_planner/cPlanner_2.js'
import runner from './runner.js'


export default class benchmarking {
  constructor(clients){
    console.log("dafug")
    this.clients = clients
  }

  testBaseline() {
    console.log("testBaseline")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new dietPlanner_1(client))
      benchmarks.push(new runner(`baseline-c_${client.id}`, dietPlanners[dietPlanners.length - 1]))
      benchmarks[benchmarks.length - 1].runTests()
      benchmarks[benchmarks.length - 1].saveResults()
    })
  }
  testDietPlanner_2() {
    console.log("testBaseline")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new dietPlanner_2(client))
      benchmarks.push(new runner(`baseline-c_${client.id}`, dietPlanners[dietPlanners.length - 1]))
      benchmarks[benchmarks.length - 1].runTests()
      benchmarks[benchmarks.length - 1].saveResults()
    })
  }
}