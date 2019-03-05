"use strict"

import helper from './class/cHelper.js'
import fileSystem from 'fs'
import clientRaw from "./../data/client.json"

export default class data {
  constructor() {
    console.log("start data")
    this.helper = new helper
    this.dataPath = './diet_planner/results/'
    this.benchmarkDataRaw = {}
    this.benchmarkData = {}
    this.prepareBenchmarkData()
    //this.manipulateBenchmarkData()
  }

  prepareBenchmarkData() {
    let data = []
    console.log("parse it")
    fileSystem.readdirSync(this.dataPath).forEach(plannerVersion => {
      this.helper.defineProperty(this.benchmarkDataRaw, plannerVersion, new Object())
      fileSystem.readdirSync(`${this.dataPath}${plannerVersion}/benchmark`).forEach(clientFile => {
        let clientId = this.parseFileName2ClientID(clientFile.slice(0, -5))
        let fileContent = fileSystem.readFileSync(`${this.dataPath}${plannerVersion}/benchmark/${clientFile}`)
        fileContent = JSON.parse(fileContent)
        this.helper.defineProperty(this.benchmarkDataRaw[plannerVersion], clientId, fileContent)
        let tmp = fileContent.map(dataPoint => {
          return this.dataTemplate(plannerVersion, clientId, dataPoint)
        })
        data = data.concat(tmp)
      })
    })
    this.helper.writeObject2File("./R/benchmarks.json", data)
  }
  manipulateBenchmarkData() {

    Object.keys(this.benchmarkDataRaw).forEach(plannerVersion => {
      this.helper.defineProperty(this.benchmarkData, plannerVersion, new Object())
      Object.keys(this.benchmarkDataRaw[plannerVersion]).forEach(clientID => {
        let avg = Math.avg(this.benchmarkDataRaw[plannerVersion][clientID])
        console.log(avg)
      })
    })
  }
  dataTemplate(plannerVersion, clientId, time) {
    return {
      plannerVersion: plannerVersion,
      clientID: clientId,
      time: time
    }
  }
  parseFileName2ClientID(fileName) {
    return parseInt(fileName.slice(-3))
  }
}