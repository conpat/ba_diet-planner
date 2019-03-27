"use strict"

import {DietPlanner} from "./cPlanner.js"
import NutritionalValue from "./../src/class/cNutritionalValue.js"

export class DietPlanner_1 extends DietPlanner {
  constructor(client, dayPlanDefinition, timeOut, dailyPlanTolerance) {
    super("diet-planner_1", client, dayPlanDefinition, timeOut, dailyPlanTolerance)
  }
  generatePlan(){
  }
  planDay(){
    //console.log("alöksdlkasdjflkasdjflkasjf")
    super.startTimer()
    let dayPlan
    let nutritionalValueRequirement = new NutritionalValue(this.client.dailyKiloCalories)
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
        break
      }

    //} while(!gotIt)
    } while(super.isTimeLeft())
    return dayPlan
  }
  saveOutput(output){
    super.saveOutput(this.plannerVersion, output)
  }
}