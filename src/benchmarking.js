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

/*
function benchmarking2(clients) {

  testBaseline(clients)
  //testDietPlanner_2(clients)

  return

  console.log("dafug")
  let baseline = function () {testBaseline(clients)}
  let dietPlanner_2 = function () {testDietPlanner_2(clients)}
  
  let benchmarkBaseline = new runner.runner("baseline", baseline)
  benchmarkBaseline.runTests()
  console.log(benchmarkBaseline.getResults())
  let benchmarkBaseline2 = new runner.runner("dietPlanner_2", dietPlanner_2)
  benchmarkBaseline2.runTests()
  console.log(benchmarkBaseline2.getResults())

/*
  runner.runBenchmarks('baseline', function(suite) {
    runner.buildNTests(1, 'baseline', suite, baseline)
  })

  runner.runBenchmarks('dietPlanner_2', function(suite) {
    runner.buildNTests(1, 'dietPlanner_2', suite, dietPlanner_2)
  })*
}

function testBaseline(clients) {
  clients.forEach(client => {
    let dietPlanner = new dietPlanner_1(client)
    dietPlanner.planDay()
  //  console.log("dietPlanner.planDay()")
  })
}

function testDietPlanner_2(clients) {
  clients.forEach(client => {
    let dietPlanner = new dietPlanner_2(client)
  //  console.log("dietPlanner.planDay()")
  })
}*/
