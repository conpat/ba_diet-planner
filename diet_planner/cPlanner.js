"use strict"

import { PerformanceObserver, performance } from 'perf_hooks'
import _ from 'lodash'
import helper from './../src/class/cHelper.js'
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
    let nV = new nutritionalValue(0, 0, 0, 0, 0)
    return dayPlan.reduce((nV, meal) =>{
      nV.kalories += meal.total_kcal
      nV.protein += meal.total_protein
      nV.fat += meal.total_fat
      nV.carbs += meal.total_carbs
      nV.fibres += meal.total_fibre
      return nV
    }, nV)
  }
  withinTolerance(nutritionalValues, nutritionalValueRequirement){
    return _.every(nutritionalValueRequirement, (requiredValue, nutrient) => {
      return (Math.abs(1 - (nutritionalValues[nutrient] / requiredValue ))) <= this.params.dailyPlanTolerance
    })
  }
  saveOutput(plannerVersion){
    //this.helper.makeDir(`./diet_planner/results/${plannerVersion}/meal_plan`)
    
    this.helper.writeObject2File(`./diet_planner/results/${plannerVersion}/meal_plan/client${this.client.id}-mealplan.json`, this.prepareMealPlanOutput())
  }
  prepareMealPlanOutput(){
    let mealPlanOutput = {client: this.client, mealPlanValue: []}
    this.mealPlan.map(dayPlan => {
      let nutritionalValueOfDay = new nutritionalValue(0, 0, 0, 0, 0)
      dayPlan.map(meal => {
        nutritionalValueOfDay.kalories += meal.total_kcal
        nutritionalValueOfDay.protein += meal.total_protein
        nutritionalValueOfDay.fat += meal.total_fat
        nutritionalValueOfDay.carbs += meal.total_carbs
        nutritionalValueOfDay.fibres += meal.total_fibre
      })
      mealPlanOutput.mealPlanValue.push(nutritionalValueOfDay)
    })
    return mealPlanOutput
  }
}