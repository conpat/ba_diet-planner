"use strict"
import meals from "./data/meals.json"

export default class mealCollection {
  constructor() {
  	this.snacks = meals.filter(meal => meal.is_snack)
  	this.breakfasts = meals.filter(meal => meal.is_breakfast)
  	this.fullMeals = meals.filter(meal => !meal.is_snack)

  }

  getRandomBreakfast(aimCalories = 0, ) {
  	let randomPosition = this.calcRandomPosition(this.breakfasts.length)
  	return this.breakfasts[randomPosition]
  }

  getRandomSnack(aimCalories = 0, ) {
  	let randomPosition = this.calcRandomPosition(this.snacks.length)
  	return this.snacks[randomPosition]
  }

  getRandomfullMeal(aimCalories = 0, ) {
  	let randomPosition = this.calcRandomPosition(this.fullMeals.length)
  	return this.fullMeals[randomPosition]
  }

  calcRandomPosition(lengthOfArray){
  	return Math.floor(Math.random() * lengthOfArray)
  }
}