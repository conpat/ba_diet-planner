"use strict"

import {dietPlanner} from "./cPlanner.js"
import nutritionalValue from "./../src/class/cNutritionalValue.js"

export class dietPlanner_1 extends dietPlanner {
  constructor(client) {
    super(client)
    this.plannerVersion = "diet-planner_1"
  }
  generatePlan(){
  }
  planDay(){
    super.startTimer()
    let dayPlan
    let nutritionalValueRequirement = new nutritionalValue(this.client.dailyKiloCalories)
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
        break
      }

    //} while(!gotIt)
    } while(isTimeLeft())
    return dayPlan
  }
  saveOutput(output){
    super.saveOutput(this.plannerVersion, output)
  }
}