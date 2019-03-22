"use strict"

import Helper from "./src/class/cHelper.js"
import Clients from "./src/clients.js"
import Benchmarking from "./src/benchmarking.js"
import Data from "./src/dataPreparator.js"
import MealCollection from "./src/class/cMealCollection.js"
import _ from "lodash"

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
        case "client":
          if (options.includes("-cnr") || options.includes("--calculateNutritionalRequirements")) {
            this.clients.calculateNutritionalRequirements(this.helper)
          } else this.printHelp()
          break
        case "test":
          // creat Clients-Date which are needed to test 
          this.executeCommand("client", ["-cnr"])

          let bench = new Benchmarking(this.clients.clients)
          if (options.includes("-1")) {
            bench.testDietPlanner_1()
          } else if (options.includes("-2")) {
            bench.testDietPlanner_2()
          } else if (options.includes("-3")) {
            bench.testDietPlanner_3()
          } else {
            bench.testDietPlanner()
            bench.logElepsedTime()
            /*
            bench.testDietPlanner_3()
            bench.testDietPlanner_1()
            bench.testDietPlanner_2()
            */
          }
          break
        case "data":
          let data = new Data()
          if (options.includes("--mealsStatiscs")) {
            let mealCollection = new MealCollection()
            data.writePresetDataToFile("mealsData", mealCollection.getDataForStatisticalAnalAnalyses())
          } else if (options.includes("--clientsStatisc")) {
            this.clients.calculateNutritionalRequirements()
            data.writePresetDataToFile("clientsData", this.clients.getDataForStatisticalAnalAnalyses())
          } else if (options.includes("-1")) {
            data.prepareBenchmarkData("diet-planner_1")
          } else if (options.includes("-2")) {
            data.prepareBenchmarkData("diet-planner_2")
          } else if (options.includes("-3")) {
            data.prepareBenchmarkData("diet-planner_3")
          } else if (options.includes("-psd") || options.includes("--prepareStatisticalData")) {
            data.prepareBenchmarkData()
          } else this.printHelp()
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
  client, test, data

node index.js <-h/--help/?>                                        quick help on index.js

node index.js client <options>                                     client specific operations
                    -cnr, --calculateNutritionalRequirements       calculate the rutritional requirements for each client

node index.js test <options>                                       test all Planner
                   -1/-2/-3                                        just testing 1st, 2nd or 3rd Planner

node index.js data <options>                                       manipulate the generated data
                   -1/-2/-3                                        just exporting dateo from 1st, 2nd or 3rd Planner
                   -psd, --prepareStatisticalData                  prepare the generated data for further analyses in R
                   --mealsStatiscs                                 get Information about the used meals
                   --clientsStatistics                             get Information about the used clients`
    console.log(helpMsg)
  }
}

let app = new main()