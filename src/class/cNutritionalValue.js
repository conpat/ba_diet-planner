import cosSimilarity from "cos-similarity"
import helper from "./cHelper.js"

export default class nutritionalValue {
  constructor(kcal, p, fa, c, fi) {
    this.helper = new helper()
    this.kcalories = kcal
    this.protein = p
    this.fat = fa
    this.carbs = c
    this.fibres = fi
  }
  getRandomSplitMacros( /*splitAmount = 2*/ ) {
    let result = []
    let rProtein = this.protein
    let rFat = this.fat
    let rCarbs = this.carbs

    /*for (let i = 0; i < splitAmount - 1; i++) {*/
    //console.log(`${rProtein} - ${rFat} - ${rCarbs}`)

    let protein = rProtein > 1 ? 0 : 1
    while (protein == 0) {
      protein = this.helper.getRandomPosition(rProtein)
    }
    rProtein -= protein

    let fat = rFat > 1 ? 0 : 1
    while (fat == 0) {
      fat = this.helper.getRandomPosition(rFat)
    }
    rFat -= fat

    let carbs = rCarbs > 1 ? 0 : 1
    while (carbs == 0) {
      carbs = this.helper.getRandomPosition(rCarbs)
    }
    rCarbs -= carbs
    
    result.push(new nutritionalValue(0, protein, fat, carbs))
    /*}*/
    result.push(new nutritionalValue(0, rProtein, rFat, rCarbs))
    return result
  }
  cosineSimilarity(comparingMacros) {
    return cosSimilarity(
      [this.protein, this.fat, this.carbs],
      [comparingMacros.protein, comparingMacros.fat, comparingMacros.carbs])
  }
}