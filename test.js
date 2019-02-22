"use strict"

import {dietPlanner_1} from "./diet_planner/cPlanner_1.js"

export default function (clients) {

	// Test Baseline
	//clients.map(client => dietPlanner_1())

	let test = new dietPlanner_1(clients[0])
	test.planDay()

}