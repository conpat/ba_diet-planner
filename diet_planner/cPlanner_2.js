"use strict"

import { DietPlanner } from "./cPlanner.js"
import NutritionalValue from "./../src/class/cNutritionalValue.js"

export class DietPlanner_2 extends DietPlanner {
  constructor(client, dayPlanDefinition, timeOut, dailyPlanTolerance) {
    super("diet-planner_2", client, dayPlanDefinition, timeOut, dailyPlanTolerance)
  }
  generatePlan() {}
  planDay(){
    super.startTimer()
    let dayPlan
    let gotIt = false
    let nutritionalValueRequirement = new NutritionalValue(this.client.dailyKiloCalories, this.client.dailyProteinInG)
    //console.log(nutritionalValueRequirement)
    /*console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(this.client.id)
    console.log(nutritionalValueRequirement)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")*/
    do {
      //console.log(`###########${super.getRunningTime()}`)
      dayPlan = []
      this.dayPlanDefinition.forEach(mealDef => {
        //console.log("mealDef.mealType")
        //console.log(mealDef.mealType)
        dayPlan.push(this.mealCollection.getRandomMeal(mealDef.mealType))
      })
      
      if(super.withinTolerance(super.sumUpNutritionalValue(dayPlan), nutritionalValueRequirement)){
        //console.log("did ITTTT")
        //console.log(super.sumUpNutritionalValue(dayPlan).kcalories)
        //gotIt = true
        break
      }

    //} while(!gotIt)
    } while(super.isTimeLeft())
    return dayPlan
  }
  saveOutput(output) {
    super.saveOutput(this.plannerVersion, output)
  }
}