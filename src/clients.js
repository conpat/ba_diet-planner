"use strict"

import client from "./class/cClient.js"

import clientsRaw from "./../data/clients_full.json"
import clientRaw from "./../data/client.json"

export default class clients {
  constructor(helper) {
    this.helper = helper

    this.clients = []
  }
  calculateNutritionalRequirements() {
    this.clients = clientsRaw.map(clientRaw => new client(clientRaw))
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