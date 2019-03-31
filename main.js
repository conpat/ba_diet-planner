"use strict"

import Helper from "./src/class/cHelper.js"
import Clients from "./src/clients.js"
import Benchmarking from "./src/benchmarking.js"
import Data from "./src/dataPreparator.js"
import MealCollection from "./src/class/cMealCollection.js"
import NutritionalValue from "./src/class/cNutritionalValue.js"
import _ from "lodash"

//The following imports are just here to make the demo
import { configParameters } from "./data/config.js"
import { DietPlanner_3 } from "./diet_planner/cPlanner_3.js"

//global extension of the standard Math Object
Math.avg = function(arr) {
  let sum = arr.reduce((sum, el) => {
    sum += el
    return sum
  })
  return sum / arr.length
}

class main {
  constructor() {
    this.debug = true
    this.helper = new Helper(this.debug)
    this.inputParams = {
      command: "",
      options: []
    }

    this.clients = new Clients()

    this.init()
  }

  async init() {
    this.preprocessInputParams()
    this.executeCommand()
  }

  executeCommand(command = this.inputParams.command, options = this.inputParams.options) {
    try {
      switch (command) {
        case "clients":
          this.clients.calculateNutritionalRequirements()
          console.log(this.clients.clients)
          break
        case "test":
          this.clients.calculateNutritionalRequirements()
          let bench = new Benchmarking(this.clients.clients)
          if (options.includes("-1")) {
            bench.testDietPlanner(1)
          } else if (options.includes("-2")) {
            bench.testDietPlanner(2)
          } else if (options.includes("-3")) {
            bench.testDietPlanner(3)
          } else {
            bench.testDietPlanner()
          }
          bench.logElepsedTime()
          break
        case "data":
          let data = new Data()
          if (options.includes("--mealsStatistics")) {
            let mealCollection = new MealCollection()
            data.writePresetDataToFile("mealsData", mealCollection.getDataForStatisticalAnalAnalyses())
          } else if (options.includes("--clientsStatistics")) {
            this.clients.calculateNutritionalRequirements()
            data.writePresetDataToFile("clientsData", this.clients.getDataForStatisticalAnalAnalyses())
          } else if (options.includes("-1")) {
            data.prepareBenchmarkData("diet-planner_1")
          } else if (options.includes("-2")) {
            data.prepareBenchmarkData("diet-planner_2")
          } else if (options.includes("-3")) {
            data.prepareBenchmarkData("diet-planner_3")
          } else data.prepareBenchmarkData()
          break
        case "demo":
          // setting the planner version to the planner version array position
          options[0] -= 1
          // parsing the dayPlanDefType to the dayPlanDefinition array position
          options[1] = options[1] === "A" ? 0 : 1
          // setting the client ID to the client array position
          options[2] -= 1

          this.clients.calculateNutritionalRequirements()
          const dietPlanner = new configParameters.dietPlannerVersions[options[0]](this.clients.clients[options[2]], configParameters.dayPlanDefinitions[options[1]], configParameters.timeoutPerDay, configParameters.dailyPlanTolerance)
          const dayPlan = dietPlanner.planDay()
          console.log(dietPlanner.client)
          console.log(dayPlan)
          console.log(dietPlanner.sumUpNutritionalValue(dayPlan))
          console.log(options)
          break
        default:
          console.log(`"${command}" is not a valid command.
          `)
        case "--help":
        case "?":
        case "-h":
          this.printHelp()
      }

    } catch (err) {
      this.helper.handleErrors(err)
    }

  }
  preprocessInputParams() {
    this.inputParams.command = process.argv[2]
    this.inputParams.options = process.argv.slice(3)
  }
  printHelp() {
    let helpMsg = `
Usage: node index.js <command> <options>

The following <commands> are in use:
  clients, test, data, demo

node index.js <-h/--help/?>                                        quick help on index.js

node index.js clients                                              calculate the nutritional requirements for each client and writes them to the console

node index.js test <options>                                       test all planner versions
                   -1/-2/-3                                        just testing 1st, 2nd or 3rd planner

node index.js data <options>                                       prepare the generated data for further analyses in R
                   -1/-2/-3                                        just prepare data from 1st, 2nd or 3rd planner
                   --mealsStatistics                               get information about the used meals
                   --clientsStatistics                             get information about the used clients

node index.js demo <plannerVersion, dayPlanDefType, clientID>      plans and shows one day with the chosen options
                   [1,2,3] [A,B] [1-217]                           this are the possible options; the order is important; by using an corrupt option, it will throw an TypeError`
    console.log(helpMsg)
  }
}

let app = new main()