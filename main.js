"use strict"

import Helper from './src/class/cHelper.js'
import Clients from './src/clients.js'
import Benchmarking from './src/benchmarking.js'
import Data from './src/dataPreparator.js'
import _ from 'lodash'

//global extension of the standard Math Object
Math.avg = function(arr){
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

  executeCommand(command = this.inputParams.command, options = this.inputParams.options){
    try {
      switch (command){
        case "client":
          if(options.includes("-cnr") || options.includes("--calculateNutritionalRequirements")){
            this.clients.calculateNutritionalRequirements(this.helper)
          } else this.printHelp()
          break
        case "test":
          // creat Clients-Date which are needed to test 
          this.executeCommand("client", ["-cnr"])
          let bench = new Benchmarking(this.clients.clients)
          bench.testBaseline()
          bench.testDietPlanner_2()
          //benchmarking()
          //test.runBenchmark()
          break
        case "data":
          if(options.includes("-psd") || options.includes("--prepareStatisticalData")){
            
            let data = new Data()

          } else this.printHelp()
          break
/*


        case "recipesToolBox":
          this.toolBoxRecipes = new recipesToolBox(this)
          let recipesVariations = this.toolBoxRecipes.calcRecipesVariations()
          console.log(`\nVariations Sum`)
          console.table(recipesVariations)
          break
        case "test":
          this.algoTest = new algoTest(this,this.args[1])
          this.algoTest.initTest()
          break
        case "nutReq":
          this.nutritionalRequirements = new nutritionalRequirementsCalculator()
          break*/
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
  preprocessInputParams(){
    this.inputParams.command = process.argv[2]
    this.inputParams.options = process.argv.slice(3)
  }
  printHelp(){
    let helpMsg = `
Usage: node index.js <command> <options>

The following <commands> are in use:
  client, test, data

node index.js <-h/--help/?>                                        quick help on index.js

node index.js client <options>                                     client specific operations
                    -cnr, --calculateNutritionalRequirements       calculate the rutritional requirements for each client

node index.js test                                                 test stuff
node index.js data <options>                                       manipulate the generated data
                  -psd, --prepareStatisticalData                   prepare the generated data for further analyses in R`
    console.log(helpMsg)
  }
}

let app = new main()