"use strict"

import helper from './class/cHelper.js'
import fileSystem from 'fs'
import clientRaw from "./../data/client.json"

export default class data {
  constructor() {
    console.log("start data")
    this.helper = new helper
    this.plannerVersionToExport
    this.benchmarkDataPath = "./diet_planner/results/"
    this.rDataPath = "./R/data/"
    this.benchmarkDataRaw = {}
    this.benchmarkData = {}
  }
  preparePresetData(dataType, data){
    this.helper.writeObject2File(`${this.rDataPath}${dataType}.json`, data)
  }
  prepareBenchmarkData(plannerVersionToExport = 0){

    let data = []
    console.log("parse it")
    fileSystem.readdirSync(this.benchmarkDataPath).forEach(plannerVersion => {
      if(plannerVersion !== plannerVersionToExport && plannerVersionToExport !== 0){
        return
      }
      console.log("----")
      this.helper.defineProperty(this.benchmarkDataRaw, plannerVersion, new Object())
      fileSystem.readdirSync(`${this.benchmarkDataPath}${plannerVersion}/performance`).forEach(clientFile => {
        if(!clientFile.startsWith("client")){
          return
        }
        let clientID = this.parseFileName2ClientID(clientFile)
        let fileContent = fileSystem.readFileSync(`${this.benchmarkDataPath}${plannerVersion}/performance/${clientFile}`)
        //console.log(`${this.benchmarkDataPath}${plannerVersion}/performance/${clientFile}`)
        fileContent = JSON.parse(fileContent)
        this.helper.defineProperty(this.benchmarkDataRaw[plannerVersion], clientID, fileContent)
        let tmp = fileContent.map(dataPoint => {
          return this.dataTemplate(plannerVersion, clientID, dataPoint)
        })
        data = data.concat(tmp)
      })
    })
    this.helper.writeObject2File(`${this.rDataPath}benchmarks-${this.createUniqueFileVersion()}.json`, data)
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
    return parseInt(fileName.slice(0, -5).slice(-3))
  }
  createUniqueFileVersion() {
    let now = new Date()
    let secOfDay = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds()
    let dd = now.getDate()
    let mm = now.getMonth() + 1 //January is 0!
    let yyyy = now.getFullYear()
    if (dd < 10) {
      dd = "0" + dd
    }
    if (mm < 10) {
      mm = "0" + mm
    }
    return `${yyyy}-${mm}-${dd}-${secOfDay}`
  }
}