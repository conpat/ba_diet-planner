"use strict"
export default class Client {
  constructor(clientRaw) {
    this.kcalPerGProtein = 4.1
    this.kcalPerGCarb = 4.1
    this.kcalPerGFat = 9.3

    // manipulating the ClientID to be a string with 3 digits. Mainly to be more readable.
    this.id = clientRaw.id.toString().padStart(3, '0')
    this.isMale = clientRaw.is_male
    this.heightInCm = clientRaw.height_in_cm
    this.weightInKg = clientRaw.weight_in_kg
    this.bodyFatPercentage = clientRaw.body_fat_percentage
    this.age = this.calcAge(clientRaw.birthday)
    this.overallGoal = clientRaw.overall_goal
    this.lbm = (this.weightInKg * (100 - this.bodyFatPercentage) / 100)
    this.dietType = clientRaw.diet_type
    this.jobPal = clientRaw.job_pal
    this.sportActivities = clientRaw.sport_activities

    this.goal_factor
    switch (this.overallGoal) {
      case "performance_increase":
        this.goal_factor = 1
        break
      case "muscle_gain":
        this.goal_factor = 1.1
        break
      case "fat_reduction":
        this.goal_factor = 0.8
        break
      default:
        this.goal_factor = 1
    }

    this.RMR = this.calcRMR(this.weightInKg, this.heightInCm, this.isMale, this.age)
    this.NEAT = this.calcNEAT(this.RMR, this.jobPal)
    this.TEA = this.calcTEA(this.sportActivities, this.lbm)

    this.dailyKiloCalories = (this.RMR + this.NEAT + this.TEA) * this.goal_factor
    this.dailyProteinInG = this.calcProtein(this.weightInKg, this.overallGoal, ((this.NEAT + this.TEA) / this.RMR), this.isMale)
    this.dailyFatInG = this.calcFat(this.dailyKiloCalories)
    this.dailyCarbsInG = this.calcCarbs(this.dailyKiloCalories, this.dailyProteinInG, this.dailyFatInG)
    this.dailyFibreInG = this.calcFibre(this.dailyKiloCalories)
  }

  calcRMR(weight, height, isMale, age) {
    let RMR = 0
    let genderAbsoluteTerm = (isMale ? 5 : -161)

    RMR = 10 * weight + 6.25 * height - 5 * age + genderAbsoluteTerm
    return RMR
  }

  calcNEAT(RMR, PAL) {
    return RMR * ((PAL * 5) / 7)
  }

  calcTEA(sportActivities, lbm) {
    let TEA = 0
    TEA = sportActivities.reduce((TEA, sportActivity) => {
      let hours_per_week = (sportActivity.number_of_days_per_week * sportActivity.number_of_minutes_per_day) / 60
      //The PAL value is standardized for a 100kg person
      TEA += (sportActivity.pal/100 * lbm * hours_per_week)
      return TEA
    }, TEA)
    TEA /= 7
    return TEA
  }

  calcFat(dailyKilokalories) {
    return (dailyKilokalories * 0.3) / this.kcalPerGFat
  }

  calcProtein(bodyWeight, goal, activityLevel, isMale) {
    // activityLevel: quotient of the physical metabolic rate and overall metabolic rate
    let dailyProteinInGPerKg = 0.8
    switch (goal) {
      case "muscle_gain":
        if (isMale) {
          dailyProteinInGPerKg = 2
        } else {
          dailyProteinInGPerKg = 1.9
        }
        break
      case "fat_reduction":
        if (isMale) {
          dailyProteinInGPerKg = 2.5
        } else {
          dailyProteinInGPerKg = 2.4
        }
        break
      case "performance_increase":
        if (isMale) {
          dailyProteinInGPerKg = 1.8
        } else {
          dailyProteinInGPerKg = 1.5
        }
        break
      default:
        dailyProteinInGPerKg = 0.8
    }
    return dailyProteinInGPerKg * bodyWeight
  }

  calcCarbs(dailyKilokalories, dailyProteinInG, dailyFatInG) {
    return (dailyKilokalories - (this.kcalPerGProtein * dailyProteinInG) - (this.kcalPerGFat * dailyFatInG)) / this.kcalPerGCarb
  }

  calcFibre(dailyKilokalories) {
    return dailyKilokalories * 15 / 1000
  }

  // calculating the age in years
  // https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
  // could have some accuracy issues but it is insignificant
  calcAge(dateOfBirth) {
    let timeDiff = Date.now() - new Date(dateOfBirth)
    return Math.abs(new Date(timeDiff).getUTCFullYear() - 1970);
  }
}