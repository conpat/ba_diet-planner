"use strict"

import Client from "./class/cClient.js"

import clientsRaw from "./../data/clients.json"

export default class Clients {
  constructor(helper) {
    this.helper = helper

    this.clients = []
  }
  calculateNutritionalRequirements() {
    this.clients = clientsRaw.map(clientRaw => new Client(clientRaw))
  }
  getDataForStatisticalAnalAnalyses(){
    return this.clients.map(client => {
      return {
        gender: client.isMale ? "male" : "feamale",
        heightInCm: client.heightInCm,
        weightInKg: client.weightInKg,
        bodyFatPercentage: client.bodyFatPercentage,
        age: client.age,
        overallGoal: client.overallGoal,
        dietType: client.dietType,
        jobPal: client.jobPal,
        hoursOfSportPerWeek: client.sportActivities.reduce((hours,activity) => {
          hours += (activity.number_of_days_per_week * activity.number_of_minutes_per_day) / 60
          return hours
        }, 0),
        dailyKiloCalories: client.dailyKiloCalories,
        dailyProteinInG: client.dailyProteinInG,
        dailyFatInG: client.dailyFatInG,
        dailyCarbsInG: client.dailyCarbsInG,
        dailyFibreInG: client.dailyFibreInG,
      }

    })
  }
}