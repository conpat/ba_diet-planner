"use strict"

import {plannerParams} from "./../data/planner_parameters.js"
import mealCollection from "./../cMealCollection.js"

export class dietPlanner {
  constructor(client) {
  	this.params = plannerParams
  	this.client = client
  	this.mealCollection = new mealCollection
  }
  generatePlan(){
  	console.log("super.generatePlan")
  }
  savePlan(){

  }
}