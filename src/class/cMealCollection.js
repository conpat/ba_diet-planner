"use strict"
import helper from './../class/cHelper.js'
import nutritionalValue from "./../class/cNutritionalValue.js"
import meals from "./../../data/meals.json"

export default class mealCollection {
  constructor() {
    this.helper = new helper()

    this.snacks = meals.filter(meal => meal.is_snack && !meal.is_cheatmeal)
    this.breakfasts = meals.filter(meal => meal.is_breakfast && !meal.is_cheatmeal)
    this.fullMeals = meals.filter(meal => !meal.is_snack && !meal.is_cheatmeal)


    this.currentMealTyp
    this.currentFilter
    this.currentPool
  }
  setCurrentConfig(mealTyp, filter, kcal, tolerance) {
    this.currentMealTyp = mealTyp
    this.currentFilter = filter
    if (this.currentMealTyp == "breakfast") {
      this.currentPool = this.breakfasts.filter(meal => this.currentFilter(meal, kcal, tolerance))
      //console.log(this.currentPool)
      //return
    } else if (this.currentMealTyp == "snack") {
      //console.log("#####################")
      this.currentPool = this.snacks.filter(meal => this.currentFilter(meal, kcal, tolerance))
      if(this.currentPool.length < 1)  {
        console.log("no Snacks for YOU")
        console.log(this.snacks.length)
        console.log(this.snacks.filter(meal => meal.total_kcal < 300 && meal.total_kcal > 200).length)
        this.snacks.filter(meal => meal.total_kcal < 300 && meal.total_kcal > 200).forEach(meal => {
          console.log("snack")
          //console.log(meal)
          console.log(this.currentFilter(meal,kcal,tolerance, true))
          console.log("")
        })
        this.helper.consoleLog(this.currentFilter.toString())
      }
      //console.log(this.currentPool)
      //return
    } else {
    this.currentPool = this.fullMeals.filter(meal => this.currentFilter(meal, kcal, tolerance))
    }

    if (this.currentPool.length == 0){
     console.log(`mealTyp: ${mealTyp}, kcal: ${kcal}, tolerance: ${tolerance}`) 
    }
  }
  getMeal(targetMacros, minSimilarity, planner) {
    if(this.currentPool.length < 1) {
      console.log("Why dafug is nothing here.")
       console.log(`mealTyp: ${this.currentMealTyp}`) 
      return
    }
    let best = 0
    let indexOfBest = -1
    let rndIndexArray = this.helper.getRandomIndexArray(this.currentPool.length)

    for (let rndIndex of rndIndexArray) {
      let rndMealNV = new nutritionalValue(
        this.currentPool[rndIndex].total_kcal,
        this.currentPool[rndIndex].total_protein,
        this.currentPool[rndIndex].total_fat,
        this.currentPool[rndIndex].total_carbs,
      )
      let similarity = rndMealNV.cosineSimilarity(targetMacros)
      //console.log("similarity")
      //console.log(similarity)
      if (similarity > best) {
        best = similarity
        indexOfBest = rndIndex
      }
      if (best > minSimilarity) {
        break
      } else if(!planner.isTimeLeft()){
        console.log("timeOut!!!")
        //break
      }
    }

    if (indexOfBest < 0) {
      console.log("indexOfBest < 0")
      console.log(this.currentPool)
      console.error("ERROR: no recipe found in find match, this shouldn't happen.")
    }
    return this.currentPool[indexOfBest]
  }
  getRandomMeal() {
    if (this.currentMealTyp || this.currentFilter || this.currentPool) {
      let randomPosition = this.calcRandomPosition(this.currentPool.length)
      return this.currentPool[randomPosition]
    }
    console.error("ERROR: first set current configuration!")
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
  // gehört nicht hier rein
  calcRandomPosition(lengthOfArray) {
    return Math.floor(Math.random() * lengthOfArray)
  }
}