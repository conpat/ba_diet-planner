"use strict"

import {dietPlanner} from "./cPlanner.js"

export class dietPlanner_2 extends dietPlanner {
  constructor(client) {
    super(client)
    this.plannerVersion = "diet-planner_2"
  }
  generatePlan(){
  }
  planDay(){
    let dayPlan
    let gotIt = false
    let nutritionalValueRequirement = {
      kalories: this.client.daily_kilokalories
    }
    super.startTimer()
    for (var i = 0; i < 10000; i++) {
      let varThis = i * i
    }
    do {
      //console.log(`do It ${super.getRunningTime()}`)
      dayPlan = []
      dayPlan.push(this.mealCollection.getRandomBreakfast())
      dayPlan.push(this.mealCollection.getRandomSnack())
      dayPlan.push(this.mealCollection.getRandomfullMeal())
      dayPlan.push(this.mealCollection.getRandomSnack())
      dayPlan.push(this.mealCollection.getRandomfullMeal())
      if(super.withinTolerance(super.sumUpNutritionalValue(dayPlan), nutritionalValueRequirement)){
        //console.log("did ITTTT")
        //console.log(dayPlan[1].name)
        gotIt = true
      }

    } while(!gotIt && super.isTimeLeft())
    this.mealPlan.push(dayPlan)
    return dayPlan

  }
  savePlan(){
    super.savePlan("baseline")
  }
  saveOutput(output){
    super.saveOutput(this.plannerVersion, output)
  }
}