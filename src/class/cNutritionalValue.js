import cosSimilarity from "cos-similarity"

export default class nutritionalValue {
  constructor(kcal, p, fa, c, fi = 0) {
    this.kcalories = kcal
    this.protein  = p
    this.fat      = fa
    this.carbs    = c
    this.fibres   = fi
    }
    getRandomSplitMacros(splitAmount = 2){
      return new nutritionalValue(this.kcalories/2, this.protein/2, this.fat/2, this.carbs/2)
    }
    cosineSimilarity(comparingMacros){
      return cosSimilarity(
        [this.protein, this.fat, this.carbs],
        [comparingMacros.protein, comparingMacros.fat, comparingMacros.carbs])
    }
}