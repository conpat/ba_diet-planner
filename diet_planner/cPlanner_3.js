"use strict"

import {DietPlanner} from "./cPlanner.js"
import NutritionalValue from "./../src/class/cNutritionalValue.js"

export class DietPlanner_3 extends DietPlanner {
  constructor(client, dayPlanDefinition, timeOut, dailyPlanTolerance) {
    super("diet-planner_3", client, dayPlanDefinition, timeOut, dailyPlanTolerance)
  }
  planDay() {
    super.startTimer()
    let dayPlan = new Array(this.dayPlanDefinition.length)
    let rndIndexArray = this.helper.getRandomIndexArray(this.dayPlanDefinition.length)

    let remainingNutritionalValue = new NutritionalValue(
      this.client.dailyKiloCalories, 
      this.client.dailyProteinInG,
      this.client.dailyFatInG,
      this.client.dailyCarbsInG)
    let remainingPercentage = 100

    rndIndexArray.forEach((rndIndex, i) => {
      let mealDef = this.dayPlanDefinition[rndIndex]
      // set the kcal for this iteration
      let kcal = remainingNutritionalValue.kcalories / remainingPercentage * mealDef.dailyKaloriesPercentage
      this.mealCollection.setCurrentConfig(mealDef.mealType, (meal, kcal, tolerance) => {
        return(Math.abs(1 - (meal.total_kcal/kcal)) < tolerance)
      }, kcal, this.dailyPlanTolerance)

      if (this.mealCollection.currentPool.length <= 0) {
        throw "ERROR: no recipes available for"
      }

      //create an random nutritional value vector
      let macros
      if (i === this.dayPlanDefinition.length - 1) { // last meal uses all of remaining vector
        macros = remainingNutritionalValue
      } else macros = remainingNutritionalValue.getRandomSplitMacros(2)[0]

      // find Meal with given macro composition within tolerance
      dayPlan[rndIndex] = this.mealCollection.getMeal(macros, 0.9, this) // handle error and handle TimeOut

      // adjust the remaining nutritional values
      remainingNutritionalValue.kcalories -= dayPlan[rndIndex].total_kcal ? dayPlan[rndIndex].total_kcal : 0
      remainingNutritionalValue.kcalories = remainingNutritionalValue.kcalories >= 0 ? remainingNutritionalValue.kcalories : 0

      remainingNutritionalValue.protein -= dayPlan[rndIndex].total_protein ? dayPlan[rndIndex].total_protein : 0
      remainingNutritionalValue.protein = remainingNutritionalValue.protein >= 0 ? remainingNutritionalValue.protein : 0

      remainingNutritionalValue.fat -= dayPlan[rndIndex].total_fat ? dayPlan[rndIndex].total_fat : 0
      remainingNutritionalValue.fat = remainingNutritionalValue.fat >= 0 ? remainingNutritionalValue.fat : 0

      remainingNutritionalValue.carbs -= dayPlan[rndIndex].total_carbs ? dayPlan[rndIndex].total_carbs : 0
      remainingNutritionalValue.carbs = remainingNutritionalValue.carbs >= 0 ? remainingNutritionalValue.carbs : 0

      remainingPercentage -= mealDef.dailyKaloriesPercentage ? mealDef.dailyKaloriesPercentage : 0
    })
    return dayPlan
  }
  saveOutput(output){
    super.saveOutput(this.plannerVersion, output)
  }
}