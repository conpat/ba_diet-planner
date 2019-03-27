"use strict"

import FileSystem from 'fs'
import Helper from './class/cHelper.js'
import clientRaw from "./../data/client.json"
import { configParameters } from "./../data/config.js"

export default class data {
  constructor() {
    console.log("start data")
    this.helper = new Helper
    this.performanceData = []
    this.nutritionalValuesData = []
    this.mealVarietyData = []
  }
  writePresetDataToFile(dataType, data) {
    this.helper.writeObject2File(`${this.rDataPath}${dataType}.json`, data)
  }
  prepareBenchmarkData(plannerVersionToExport = 0) {
    console.log("parse it")

    //Loop each dietPlannerVersion directory
    FileSystem.readdirSync(configParameters.benchmarkResultsPath).forEach(plannerVersion => {
      console.log(`## Prepare for planner version: ${plannerVersion}`)
      /*if(plannerVersion !== plannerVersionToExport && plannerVersionToExport !== 0){
        return
      }*/
      //Loop each dayPlanDefinitionType directory
      const plannerVersionPath = `${configParameters.benchmarkResultsPath}${plannerVersion}`
      FileSystem.readdirSync(plannerVersionPath).forEach(dayPlanDefType => {
        console.log(`#### Prepare for day plan definition: ${dayPlanDefType}`)
        const dayPlanDefTypePath = `${plannerVersionPath}/${dayPlanDefType}/`
        const performancePath = `${dayPlanDefTypePath}performance/`
        const mealPlanPath = `${dayPlanDefTypePath}meal_plan/`
        //Loop each performance directory
        FileSystem.readdirSync(performancePath).forEach(clientFile => {
          if (clientFile.startsWith("client")) {
            this.prepareClientFileForPerformance(performancePath, clientFile, plannerVersion, dayPlanDefType)
          }
        })
        //Loop each mealPlan directory
        FileSystem.readdirSync(mealPlanPath).forEach(clientFile => {
          if (clientFile.startsWith("client")) {
            this.prepareClientFileForMealPlan(mealPlanPath, clientFile, plannerVersion, dayPlanDefType)
          }
        })
      })
    })
    this.writePreparedDataToFiles()
  }
  writePreparedDataToFiles() {
    this.helper.writeObject2File(`${configParameters.statisticalDataPath}benchmark-performance.json`, this.performanceData)
    this.helper.writeObject2File(`${configParameters.statisticalDataPath}benchmark-nutritional_values.json`, this.nutritionalValuesData)
    this.helper.writeObject2File(`${configParameters.statisticalDataPath}benchmark-meal_variety.json`, this.mealVarietyData)
  }
  prepareClientFileForPerformance(path, clientFile, plannerVersion, dayPlanDefType) {
    let clientID = this.parseFileName2ClientID(clientFile)
    let fileContent = FileSystem.readFileSync(`${path}${clientFile}`)
    if(!(fileContent.length > 0))
      return
    fileContent = JSON.parse(fileContent)
    console.log(`###### PERFORMANCE ${plannerVersion} - ${dayPlanDefType} - ${clientFile}`)
    //Sum up every duration measured
    let timeSum = fileContent.reduce((timeSum, dataPoint) => {
      return timeSum + dataPoint
    })
    let timeMean = timeSum / fileContent.length //calculate the mean of all measured durations
    this.performanceData.push(this.createPerformanceDataPoint(plannerVersion, dayPlanDefType, clientID, timeMean))
  }
  prepareClientFileForMealPlan(path, clientFile, plannerVersion, dayPlanDefType) {
    let clientID = this.parseFileName2ClientID(clientFile)
    let fileContent = FileSystem.readFileSync(`${path}${clientFile}`)
    if(!(fileContent.length > 0))
      return
    console.log(`###### MEALPLAN ${plannerVersion} - ${dayPlanDefType} - ${clientFile}`)
    fileContent = JSON.parse(fileContent)
    this.prepareNutritionalValues(fileContent.mealPlanValues, clientID, plannerVersion, dayPlanDefType)
    this.prepareMealVariety(fileContent.recurrence[0], clientID, plannerVersion, dayPlanDefType)
  }
  prepareNutritionalValues(mealPlanValues, clientID, plannerVersion, dayPlanDefType) {
    let mealPlanDivergenceSum = this.sumUpMealPlanDivergence(mealPlanValues)
    this.nutritionalValuesData.push(this.createNutritionalValueDataPoint(plannerVersion, dayPlanDefType, clientID, mealPlanDivergenceSum))
  }
  prepareMealVariety(mealRecurrence, clientID, plannerVersion, dayPlanDefType) {
    let mealCount = 0
    let dishCount = 0
    let quotient  = 0
    Object.keys(mealRecurrence).forEach(mealID => {
      mealCount += mealRecurrence[mealID]
      dishCount++
    })
    quotient = dishCount / mealCount

    this.mealVarietyData.push(this.createMealVarietyDataPoint(plannerVersion, dayPlanDefType, clientID, mealCount, dishCount, quotient))
  }
  sumUpMealPlanDivergence(mealPlanValues) {
    let mealPlanDivergenceSum = {
      kCalories: 0,
      caloriesPercentage: 0,
      proteinInG: 0,
      proteinPercentage: 0,
      fatInG: 0,
      fatPercentage: 0,
      carbsInG: 0,
      carbsPercentage: 0,
      fibreInG: 0,
      firbrePercentage: 0,
    }
    mealPlanDivergenceSum = mealPlanValues.reduce((divergence, mealValues) => {
      Object.keys(divergence).forEach(value => {
        divergence[value] += mealValues.divergence[value]
      })
      return divergence
    }, mealPlanDivergenceSum)
    return mealPlanDivergenceSum
  }
  createPerformanceDataPoint(plannerVersion, dayPlanDefType, clientId, timeMean) {
    return {
      plannerVersion: plannerVersion.slice(-1),
      dayPlanDefType: dayPlanDefType,
      clientID:       clientId,
      timeMean:       timeMean
    }
  }
  createNutritionalValueDataPoint(plannerVersion, dayPlanDefType, clientId, mealPlanDivergenceSum) {
    return {
      plannerVersion:     plannerVersion.slice(-1),
      dayPlanDefType:     dayPlanDefType,
      clientID:           clientId,
      kCalories:          mealPlanDivergenceSum.kCalories,
      caloriesPercentage: mealPlanDivergenceSum.caloriesPercentage,
      proteinInG:         mealPlanDivergenceSum.proteinInG,
      proteinPercentage:  mealPlanDivergenceSum.proteinPercentage,
      fatInG:             mealPlanDivergenceSum.fatInG,
      fatPercentage:      mealPlanDivergenceSum.fatPercentage,
      carbsInG:           mealPlanDivergenceSum.carbsInG,
      carbsPercentage:    mealPlanDivergenceSum.carbsPercentage,
      fibreInG:           mealPlanDivergenceSum.fibreInG,
      firbrePercentage:   mealPlanDivergenceSum.firbrePercentage,
    }
  }
  createMealVarietyDataPoint(plannerVersion, dayPlanDefType, clientId, mealCount, dishCount, quotient) {
    return {
      plannerVersion: plannerVersion.slice(-1),
      dayPlanDefType: dayPlanDefType,
      clientID:       clientId,
      mealCount:      mealCount,
      dishCount:      dishCount,
      quotient:       quotient,
    }
  }
  parseFileName2ClientID(fileName) {
    return parseInt(fileName.slice(6,9))
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