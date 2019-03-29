"use strict"

import { DietPlanner } from "./cPlanner.js"
import NutritionalValue from "./../src/class/cNutritionalValue.js"

export class DietPlanner_2 extends DietPlanner {
  constructor(client, dayPlanDefinition, timeOut, dailyPlanTolerance) {
    super("diet-planner_2", client, dayPlanDefinition, timeOut, dailyPlanTolerance)
  }
  planDay(){
    super.startTimer()
    let dayPlan
    let gotIt = false
    let nutritionalValueRequirement = new NutritionalValue(this.client.dailyKiloCalories, this.client.dailyProteinInG)
    do {
      dayPlan = []
      this.dayPlanDefinition.forEach(mealDef => {
        dayPlan.push(this.mealCollection.getRandomMeal(mealDef.mealType))
      })
      if(super.withinTolerance(super.sumUpNutritionalValue(dayPlan), nutritionalValueRequirement)){
        break
      }
    } while(super.isTimeLeft())
    return dayPlan
  }
  saveOutput(output) {
    super.saveOutput(this.plannerVersion, output)
  }
}