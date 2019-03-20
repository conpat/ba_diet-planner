"use strict"

import { PerformanceObserver, performance } from "perf_hooks"
import _ from "lodash"
import helper from "./../src/class/cHelper.js"
import {plannerParams} from "./../data/planner_parameters.js"
import mealCollection from "./../src/class/cMealCollection.js"
import nutritionalValue from "./../src/class/cNutritionalValue.js"

export class dietPlanner {
  constructor(client) {
    this.helper = new helper()
    this.params = plannerParams
    this.client = client
    this.mealCollection = new mealCollection
    this.timerStart
    this.timeOuts = 0
  }
  generatePlan(){
    console.log("super.generatePlan")
  }
  startTimer(){
    this.timerStart = performance.now()
  }
  getRunningTime(){
    return performance.now() - this.timerStart
  }
  isTimeLeft(){
    if(this.params.timeoutPerDay >= this.getRunningTime()){
      return true
    }
    this.timeOuts++
    console.log("timeout")
    return false
  }
  sumUpNutritionalValue(mealPlan){
    let nV = new nutritionalValue(0, 0, 0, 0, 0)
    return mealPlan.reduce((nV, meal) => {
      nV.kcalories += meal.total_kcal
      nV.protein += meal.total_protein
      nV.fat += meal.total_fat
      nV.carbs += meal.total_carbs
      nV.fibres += meal.total_fibre
      return nV
    }, nV)
  }
  withinTolerance(nutritionalValues, nutritionalValueRequirement){
    //console.log(nutritionalValueRequirement)
    return _.every(nutritionalValueRequirement, (requiredValue, nutrient) => {
      if(!(requiredValue > 0)){
        if(requiredValue < 0) throw "ERROR: this should not be!"
        return true
      }
      return (Math.abs(1 - (nutritionalValues[nutrient] / requiredValue ))) <= this.params.dailyPlanTolerance
    })
  }
  saveOutput(plannerVersion, output){
    //this.helper.makeDir(`./diet_planner/results/${plannerVersion}/meal_plan`)
    
    this.helper.writeObject2File(`./diet_planner/results/${plannerVersion}/meal_plan/client${this.client.id}-mealplan.json`, this.prepareMealPlanOutput(output))
  }
  prepareMealPlanOutput(output){
    let mealPlanOutput = {client: this.client, recurrence: {}, mealPlanValues: []}
    
    mealPlanOutput.timeOuts = this.timeOuts
    if(this.timeOuts >0){
      console.log(this.plannerVersion)
      console.log(this.client.id)
      console.log(this.timeOuts)
    }
    mealPlanOutput.recurrence = this.countRecurrence(output)

    mealPlanOutput.mealPlanValues = output.map(dayPlan => {
      const mealPlanNutritionalValue = this.sumUpNutritionalValue(dayPlan)
      mealPlanNutritionalValue.divergence = this.calcMealPlanDivergence(mealPlanNutritionalValue)
      return mealPlanNutritionalValue
    })

    return mealPlanOutput
  }
  calcMealPlanDivergence(nutritionalValue){
    const kCalories          = nutritionalValue.kcalories - this.client.dailyKiloCalories
    const caloriesPercentage = kCalories / this.client.dailyKiloCalories
    const proteinInG         = nutritionalValue.protein - this.client.dailyProteinInG
    const proteinPercentage  = proteinInG / this.client.dailyProteinInG
    const fatInG             = nutritionalValue.fat - this.client.dailyFatInG
    const fatPercentage      = fatInG / this.client.dailyFatInG
    const carbsInG           = nutritionalValue.carbs - this.client.dailyCarbsInG
    const carbsPercentage    = carbsInG / this.client.dailyCarbsInG
    const fibreInG           = nutritionalValue.fibres - this.client.dailyFibreInG
    const firbrePercentage   = fibreInG / this.client.dailyFibreInG
    return {
      kCalories:          kCalories,
      caloriesPercentage: caloriesPercentage,
      proteinInG:         proteinInG,
      proteinPercentage:  proteinPercentage,
      fatInG:             fatInG,
      fatPercentage:      fatPercentage,
      carbsInG:           carbsInG,
      carbsPercentage:    carbsPercentage,
      fibreInG:           fibreInG,
      firbrePercentage:   firbrePercentage,
    }
  }
  countRecurrence(mealPlan){
    let dailyMealRecurrence = {}
    let mealRecurrence = mealPlan.reduce((mealRecurrence, dayPlan) => {
      let dayRecurrence = {}
      dayPlan.forEach(meal => {
        dayRecurrence[meal.id] = dayRecurrence[meal.id] === undefined ? 1 : dayRecurrence[meal.id] + 1
        /* testing the dailyRecurrence
        dayRecurrence["k"] = dayRecurrence["k"] === undefined ? 1 : dayRecurrence["k"] + 1
        dayRecurrence["l"] = dayRecurrence["l"] === undefined ? 2 : dayRecurrence["l"] + 2*/
        mealRecurrence[meal.id] = mealRecurrence[meal.id] === undefined ? 1 : mealRecurrence[meal.id] + 1
      })
      //summing up for daily Recurrence
      if(Object.keys(dayRecurrence).length > dayPlan.length){
        let tmp = this.helper.filterObject(dayRecurrence, (mealCount => mealCount > 1))
        Object.keys(tmp).forEach(key => {
          dailyMealRecurrence[key] = dailyMealRecurrence[key] === undefined ? tmp[key] : dailyMealRecurrence[key] + tmp[key]
        })
      }
      return mealRecurrence
    },{})
    return [mealRecurrence, dailyMealRecurrence]
  }
}