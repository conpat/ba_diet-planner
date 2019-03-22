"use strict"

/*
  in this file the benchmarking get handled
    - configurate a single benchmark
    - organize benchmarks
    - save benchmark results
 */


import { PerformanceObserver, performance } from "perf_hooks"
import {configParameters} from "./../data/config.js"
import Helper from "./../src/class/cHelper.js"
import { DietPlanner_1 } from "./../diet_planner/cPlanner_1.js"
import { DietPlanner_2 } from "./../diet_planner/cPlanner_2.js"
import { DietPlanner_3 } from "./../diet_planner/cPlanner_3.js"
import Runner from "./runner.js"


export default class Benchmarking {
  constructor(clients){
    this.helper = new Helper()
    this.clients    = clients
    this.iterations = 1000
    this.timerStart = performance.now()
  }
  getRunningTime(factor = 1){
    return (performance.now() - this.timerStart) / factor
  }
  logElepsedTime(){
    console.log(`~~~~Time: ${this.getRunningTime(1000)}~~~~`)
  }
  testDietPlanner(){
    configParameters.dietPlannerVersions.forEach((dietPlanner, i) => {
      console.log(`## Start Benchmark with Planner: ${i}`)
      configParameters.dayPlanDefinitions.forEach(dayPlanDefinition => {
        console.log(`#### Start ${dietPlanner.plannerVersion} with dayPlanDefinition: ${configParameters.dayPlanDefType(dayPlanDefinition)}`)
        let dietPlanners = []
        let benchmarks = []
        this.clients.forEach(client => {
          console.log(`###### Start Benchmark for Client: ${client.id}`)
          dietPlanners.push(new dietPlanner(client, dayPlanDefinition, configParameters.timeoutPerDay, configParameters.dailyPlanTolerance))
          benchmarks.push(new Runner(dietPlanners[dietPlanners.length - 1], configParameters.benchmarkingInterations))
          benchmarks[benchmarks.length - 1].runTests()
          this.saveBenchmarkResult(benchmarks[benchmarks.length - 1])
        })
      })
    })
  }
  testDietPlanner_1() {
    console.log("testDietPlanner_1")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new DietPlanner_1(client))
      benchmarks.push(new Runner(`dietPlaner_1-c_${client.id}`, dietPlanners[dietPlanners.length - 1], this.iterations))
      benchmarks[benchmarks.length - 1].runTests()
      this.saveBenchmarkResult(benchmarks[benchmarks.length - 1])
    })
  }
  testDietPlanner_2() {
    console.log("testDietPlanner2")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new EietPlanner_2(client))
      benchmarks.push(new Runner(`dietPlaner_2-c_${client.id}`, dietPlanners[dietPlanners.length - 1], this.iterations))
      benchmarks[benchmarks.length - 1].runTests()

      this.saveBenchmarkResult(benchmarks[benchmarks.length - 1])
    })
  }
  testDietPlanner_3() {
    console.log("testDietPlanner3")
    let dietPlanners = []
    let benchmarks = []
    this.clients.forEach(client => {
      dietPlanners.push(new DietPlanner_3(client))
      benchmarks.push(new Runner(`dietPlaner_3-c_${client.id}`, dietPlanners[dietPlanners.length - 1], this.iterations))
      benchmarks[benchmarks.length - 1].runTests()
      this.saveBenchmarkResult(benchmarks[benchmarks.length - 1])
    })
  }
  saveBenchmarkResult(benchmark){
    this.helper.writeObject2File(`${configParameters.benchmarkResultsPath}${benchmark.dietPlanner.plannerVersion}/${benchmark.dietPlanner.dayPlanDefTyp}/performance/client${benchmark.dietPlanner.client.id}.json`, benchmark.performance)
    benchmark.dietPlanner.saveOutput(benchmark.mealPlans)
  }
}