"use strict"

import helper from './helper.js'
import clients from './clients.js'
import test from './test.js'

class main {
  constructor() {
    this.debug = true
    this.helper = new helper(this.debug)
    this.inputParams = {
      command: "",
      options: []
    }

    this.clients = new clients()

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
          }
          break
        case "test":
          // creat Clients-Date which are needed to test 
          this.executeCommand("client", ["-cnr"])
          new test(this.clients.clients)
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
  printHelp(specifier){
    let helpMsg = ``

    switch(specifier) {
      case "client":
        helpMsg = `node main.js client 
        `
        break
      default:
        helpMsg = `The following commands are in use:
Usage: node main.js <command> <options>

Where <command> is one of:
  client, test

node main.js <-h/--help/?>                                        quick help on main.js

node main.js client <options>                                     client specific operations
                    -cnr, --calculateNutritionalRequirements      calculate the rutritional requirements for each client

node main.js test <options>                                       test stuff`
    }
    console.log(helpMsg)
  }
}

let app = new main()