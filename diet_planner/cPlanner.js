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
  sumUpNutritionalValue(dayPlan){
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
    let mealPlanOutput = {client: this.client, recurrence: {}, mealPlanValue: []}
    
    mealPlanOutput.recurrence = this.countRecurrence(this.mealPlan)

    mealPlanOutput.mealPlanValue = this.mealPlan.map(dayPlan => {
      return this.sumUpNutritionalValue(dayPlan)
    })

    return mealPlanOutput
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