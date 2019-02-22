"use strict"

import {dietPlanner} from "./cPlanner.js"

export class dietPlanner_1 extends dietPlanner {
  constructor(client) {
  	super(client)
  }
  generatePlan(){
  	super.generatePlan()
  	console.log("this.client")
  	console.log(this.client)

  }
  planDay(){
  	let timer = 0 // muss natürlich ein echter Timer werden
  	let dayPlan
  	let gotIt = false
  	let nutritionalValueRequirement = {
  		kalories: this.client.daily_kilokalories
  	}
  	do {
  		dayPlan = []
  		dayPlan.push(this.mealCollection.getRandomBreakfast())
  		dayPlan.push(this.mealCollection.getRandomSnack())
  		dayPlan.push(this.mealCollection.getRandomfullMeal())
  		dayPlan.push(this.mealCollection.getRandomSnack())
  		dayPlan.push(this.mealCollection.getRandomfullMeal())

  		if(this.withinTolerance(this.totUpNutritionalValue(dayPlan), nutritionalValueRequirement, this.params.dailyPlanTolerance)){
  			return dayPlan
  		}

  		timer++ // muss natürlich ein echter Timer werden
  	} while(timer < this.params.timeoutPerDay)

  	return "Sorry Bro"

  }
  totUpNutritionalValue(dayPlan){
  	let nutritionalValue = {
  		kalories: 0,
  		protein: 0,
  		fat: 0,
  		carbs: 0,
  		fibres: 0
  	}
  	return dayPlan.reduce((nutritionalValue, meal) =>{
  		nutritionalValue.kalories += meal.total_kcal
    	nutritionalValue.kaloproteinries += meal.total_protein
    	nutritionalValue.fat += meal.total_fat
    	nutritionalValue.carbs += meal.total_carbs
    	nutritionalValue.fibres += meal.total_fibre
    	return nutritionalValue
  	}, nutritionalValue)
  }

  withinTolerance(nutritionalValues, nutritionalValueRequirement, tolerance){
  	return nutritionalValueRequirement.every((requiredValue, nutrient) => {
			return (Math.abs(1 - (nutritionalValues[nutrient] / requiredValue ))) <= tolerance
  	})
  }
}