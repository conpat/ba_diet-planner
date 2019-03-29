import CosSimilarity from "cos-similarity"
import Helper from "./cHelper.js"

export default class nutritionalValue {
  constructor(kcal, p, fa, c, fi) {
    this.helper = new Helper()
    this.kcalories = kcal
    this.protein = p
    this.fat = fa
    this.carbs = c
    this.fibres = fi
  }
  getRandomSplitMacros() {
    let result = []
    let rProtein = this.protein
    let rFat = this.fat
    let rCarbs = this.carbs

    let protein = rProtein > 1 ? 0 : 1
    while (protein === 0) {
      protein = this.helper.getRandomNumber(rProtein)
    }
    rProtein -= protein

    let fat = rFat > 1 ? 0 : 1
    while (fat === 0) {
      fat = this.helper.getRandomNumber(rFat)
    }
    rFat -= fat

    let carbs = rCarbs > 1 ? 0 : 1
    while (carbs === 0) {
      carbs = this.helper.getRandomNumber(rCarbs)
    }
    rCarbs -= carbs
    
    result.push(new nutritionalValue(0, protein, fat, carbs))
    /*}*/
    result.push(new nutritionalValue(0, rProtein, rFat, rCarbs))
    return result
  }
  cosineSimilarity(comparingMacros) {
    return CosSimilarity(
      [this.protein, this.fat, this.carbs],
      [comparingMacros.protein, comparingMacros.fat, comparingMacros.carbs])
  }
}