"use strict"

import {DietPlanner} from "./cPlanner.js"
import NutritionalValue from "./../src/class/cNutritionalValue.js"

export class DietPlanner_3 extends DietPlanner {
  constructor(client, dayPlanDefinition, timeOut, dailyPlanTolerance) {
    super("diet-planner_3", client, dayPlanDefinition, timeOut, dailyPlanTolerance)
  }
  getVersion(){
    console.log("fuckit")
  }
  planDay() {
    super.startTimer()
    //console.log("Start Day ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    //console.log(this.client.id)
    //console.log(`client nutritions: kalories: ${this.client.dailyKiloCalories}`)
    let dayPlan = new Array(this.dayPlanDefinition.length)
    // get an randomized order of the differen meals of the day
    let rndIndexArray = this.helper.getRandomIndexArray(this.dayPlanDefinition.length)

    // declare the remaining nutritional values to plan for this day
    let remainingNutritionalValue = new NutritionalValue(
      this.client.dailyKiloCalories, 
      this.client.dailyProteinInG,
      this.client.dailyFatInG,
      this.client.dailyCarbsInG)
    let remainingPercentage = 100

    //plan each meal definition
    rndIndexArray.forEach((rndIndex, i) => {
      //console.log("Start MealDef~~~~~~~~~~~~~~~~~~")
      // get the meal definition for this iteration
      let mealDef = this.dayPlanDefinition[rndIndex]
      // set the kcal for this iteration
      let kcal = remainingNutritionalValue.kcalories / remainingPercentage * mealDef.dailyKaloriesPercentage
      if(!(kcal > 0)) {
        //console.log("kcal < 0###########################")
        //console.log(`remaining Calories: ${remainingNutritionalValue.kcalories}, remainingPercentage: ${remainingPercentage}, currentPercentage: ${mealDef.dailyKaloriesPercentage}`)
      }
      this.mealCollection.setCurrentConfig(mealDef.mealType, (meal, kcal, tolerance, b = false) => {
        if(b){
          console.log("meal.total_kcal")
          console.log(meal.total_kcal)
          console.log("kcal")
          console.log(kcal)
          console.log("meal.total_kcal / kcal")
          console.log(meal.total_kcal / kcal)
          console.log("Math.abs(1-(meal.total_kcal / kcal)")
          console.log(Math.abs(1-(meal.total_kcal / kcal)))
          console.log("Math.abs(1-(meal.total_kcal / kcal)) < tolerance")
          console.log(Math.abs(1-(meal.total_kcal / kcal)) < tolerance)
          console.log("tolerance")
          console.log(tolerance)
        }
        return(Math.abs(1 - (meal.total_kcal/kcal)) < tolerance)
      }, kcal, this.dailyPlanTolerance)

      if (this.mealCollection.currentPool.length <= 0) {
        //console.log("######################")
        throw "ERROR: no recipes available for"
        //Do stuff here
        //return []*Recipe{}, fmt.Errorf("no recipe found")
      }

      //create an random nutritional value vector
      let macros
      if (i === this.dayPlanDefinition.length - 1) { // last meal uses all of remaining vector
        //console.log("last mealDef++++++++++")
        macros = remainingNutritionalValue
      } else macros = remainingNutritionalValue.getRandomSplitMacros(2)[0]

      //console.log("test" + this.isTimeLeft())
      // find Meal with given macro composition within tolerance
      dayPlan[rndIndex] = this.mealCollection.getMeal(macros, 0.9, this) // handle error and handle TimeOut

      //console.log("dayPlan[rndIndex]")
      //console.log(dayPlan[rndIndex])

      // adjust the remaining nutritional values
      remainingNutritionalValue.kcalories -= dayPlan[rndIndex].total_kcal ? dayPlan[rndIndex].total_kcal : 0
      remainingNutritionalValue.protein -= dayPlan[rndIndex].total_protein ? dayPlan[rndIndex].total_protein : 0
      //console.log(dayPlan[rndIndex].total_protein)
      remainingNutritionalValue.fat -= dayPlan[rndIndex].total_fat ? dayPlan[rndIndex].total_fat : 0
      remainingNutritionalValue.carbs -= dayPlan[rndIndex].total_carbs ? dayPlan[rndIndex].total_carbs : 0
      //console.log(`${remainingPercentage}${mealDef.dailyKaloriesPercentage}${}`)
      remainingPercentage -= mealDef.dailyKaloriesPercentage ? mealDef.dailyKaloriesPercentage : 0
    })
    //console.log(dayPlan)
    return dayPlan
  }
  saveOutput(output){
    super.saveOutput(this.plannerVersion, output)
  }
}