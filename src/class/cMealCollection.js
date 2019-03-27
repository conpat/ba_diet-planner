"use strict"
import Helper from './../class/cHelper.js'
import NutritionalValue from "./../class/cNutritionalValue.js"
import meals from "./../../data/meals.json"

export default class MealCollection {
  constructor() {
    this.helper = new Helper()

    this.snacks = meals.filter(meal => meal.is_snack && !meal.is_cheatmeal)
    this.breakfasts = meals.filter(meal => meal.is_breakfast && !meal.is_cheatmeal)
    this.fullMeals = meals.filter(meal => !meal.is_snack && !meal.is_cheatmeal)


    this.currentMealTyp
    this.currentPool
  }
  setCurrentConfig(mealTyp, filter, kcal, tolerance) {
    this.currentMealTyp = mealTyp
    if (this.currentMealTyp == "breakfast") {
      this.currentPool = this.breakfasts.filter(meal => filter(meal, kcal, tolerance))
      //console.log(this.currentPool)
      //return
    } else if (this.currentMealTyp == "snack") {
      //console.log("#####################")
      this.currentPool = this.snacks.filter(meal => filter(meal, kcal, tolerance))
      /*if (this.currentPool.length < 1) {
        console.log("no Snacks for YOU")
        console.log(this.snacks.length)
        console.log(this.snacks.filter(meal => meal.total_kcal < 300 && meal.total_kcal > 200).length)
        this.snacks.filter(meal => meal.total_kcal < 300 && meal.total_kcal > 200).forEach(meal => {
          console.log("snack")
          //console.log(meal)
          console.log(filter(meal, kcal, tolerance, true))
          console.log("")
        })
        this.helper.consoleLog(filter.toString())
      }*/
      //console.log(this.currentPool)
      //return
    } else {
      this.currentPool = this.fullMeals.filter(meal => filter(meal, kcal, tolerance))
    }

    if (this.currentPool.length == 0) {
      throw "no meal found: setting Config"
      console.log("################################")
      console.log(`mealTyp: ${mealTyp}, kcal: ${kcal}, tolerance: ${tolerance}`)
    }
  }
  getMeal(targetMacros, minSimilarity, planner) {
    
    if (this.currentPool.length < 1) {
      throw "no meal found: getting meal"
      /*console.log("Why dafug is nothing here.")
      console.log(`mealTyp: ${this.currentMealTyp}`)
      return*/
    }
    let best = 0
    let indexOfBest = -1
    let debugValues = []
    let rndIndexArray = this.helper.getRandomIndexArray(this.currentPool.length)

    for (let rndIndex of rndIndexArray) {
      let rndMealNV = new NutritionalValue(
        this.currentPool[rndIndex].total_kcal,
        this.currentPool[rndIndex].total_protein,
        this.currentPool[rndIndex].total_fat,
        this.currentPool[rndIndex].total_carbs,
      )
      let similarity = rndMealNV.cosineSimilarity(targetMacros)
      debugValues.push(similarity)
      //console.log("similarity")
      //console.log(similarity)
      if (similarity > best) {
        best = similarity
        indexOfBest = rndIndex
      }
      if (best > minSimilarity) {
        break
      } else if (!planner.isTimeLeft()) {
        console.log("timeOut!!!")
        break
      }
    }

    if (indexOfBest < 0) {
      console.log(this.currentPool)
      console.log(`indexOfBest < 0 : rndIndexArray.length: ${rndIndexArray.length} - targetMacros: `)
      console.log(targetMacros)
      console.log(debugValues)
      console.error("ERROR: no recipe found in find match, this shouldn't happen.")
    }
    return this.currentPool[indexOfBest]
  }
  getRandomMeal(mealTyp) {
    let randomPosition
    switch (mealTyp) {
      case "breakfast":
        randomPosition = this.helper.getRandomPosition(this.breakfasts.length)
        return this.breakfasts[randomPosition]
      case "snack":
        randomPosition = this.helper.getRandomPosition(this.snacks.length)
        return this.snacks[randomPosition]
      case "full_meal":
        randomPosition = this.helper.getRandomPosition(this.fullMeals.length)
        return this.fullMeals[randomPosition]
    }
  }
  getDataForStatisticalAnalAnalyses(){
    return meals.filter(meal => !meal.is_cheatmeal).map(meal => {
      return {
        isBreakfast: meal.is_breakfast,
        isSnack:     meal.is_snack,
        kCalories:   meal.total_kcal,
        proteinInG:  meal.total_protein,
        fatInG:      meal.total_fat,
        carbsInG:    meal.total_carbs,
        fibreInG:    meal.total_fibre,
      }

    })
  }
}