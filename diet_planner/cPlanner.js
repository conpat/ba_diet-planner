"use strict"

import { PerformanceObserver, performance } from 'perf_hooks'
import _ from 'lodash'
import helper from './../src/class/cHelper.js'
import {plannerParams} from "./../data/planner_parameters.js"
import mealCollection from "./../src/class/cMealCollection.js"

export class dietPlanner {
  constructor(client) {
    this.helper = new helper()
  	this.params = plannerParams
  	this.client = client
  	this.mealCollection = new mealCollection
    this.timerStart
    this.mealPlan = []
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
    return this.params.timeoutPerDay >= this.getRunningTime()
  }
  totUpNutritionalValue(dayPlan){
    let nutritionalValue = {
      kalories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fibres: 0
    }
    return dayPlan.reduce((nutritionalValue, meal) =>{
      nutritionalValue.kalories += meal.total_kcal
      nutritionalValue.kaloproteinries += meal.total_protein
      nutritionalValue.fat += meal.total_fat
      nutritionalValue.carbs += meal.total_carbs
      nutritionalValue.fibres += meal.total_fibre
      return nutritionalValue
    }, nutritionalValue)
  }
  withinTolerance(nutritionalValues, nutritionalValueRequirement){
    return _.every(nutritionalValueRequirement, (requiredValue, nutrient) => {
      return (Math.abs(1 - (nutritionalValues[nutrient] / requiredValue ))) <= this.params.dailyPlanTolerance
    })
  }
  savePlan(plannerVersion){

    //console.log("this.dayPlan[1].name")
    //console.log(this.dayPlan[1].name)
    this.helper.makeDir(`./diet_planner/results/${plannerVersion}`)
    this.helper.writeObject2File(`./diet_planner/results/${plannerVersion}/client${this.client.id}-mealplan.json`, this.mealPlan)
  }
  saveOutput(plannerVersion, output){
    //this.helper.makeDir(`./diet_planner/results/${plannerVersion}/meal_plan`)
    this.helper.writeObject2File(`./diet_planner/results/${plannerVersion}/meal_plan/client${this.client.id}-mealplan.json`, output)
  }
}