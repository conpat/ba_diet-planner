"use strict"

import { dietPlanner } from "./cPlanner.js"
import nutritionalValue from "./../src/class/cNutritionalValue.js"

export class dietPlanner_2 extends dietPlanner {
  constructor(client) {
    super(client)
    this.plannerVersion = "diet-planner_2"
  }
  generatePlan() {}
  planDay(){
    super.startTimer()
    let dayPlan
    let gotIt = false
    let nutritionalValueRequirement = new nutritionalValue(this.client.dailyKiloCalories, this.client.dailyProteinInG)
    //console.log(nutritionalValueRequirement)
    /*console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(this.client.id)
    console.log(nutritionalValueRequirement)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")*/
    do {
      //console.log(`###########${super.getRunningTime()}`)
      dayPlan = []
      this.params.mealDef.forEach(mealDef => {
        //console.log("mealDef.mealType")
        //console.log(mealDef.mealType)
        dayPlan.push(this.mealCollection.getRandomMeal(mealDef.mealType))
      })
      
      if(super.withinTolerance(super.sumUpNutritionalValue(dayPlan), nutritionalValueRequirement)){
        //console.log("did ITTTT")
        //console.log(super.sumUpNutritionalValue(dayPlan).kcalories)
        gotIt = true
      }

    //} while(!gotIt)
    } while(!gotIt && super.isTimeLeft())
    return dayPlan
  }
  saveOutput(output) {
    super.saveOutput(this.plannerVersion, output)
  }
}