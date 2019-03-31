# ./src
The directory contains the testing environment.
### benchmarking.js
The core file for testing will create all possible combination of clients, planner versions and dayPlanDefinitions. Each test will be done 100 times and afterwards saved into ./diet_planner/results
### runner.js
The test runner will be called for each test case and runs all test iterations. It handles the test results need for the evaluation.
### dataPreparator.js
This file will just handle and aggregate the test results and writes them in files at `./R/data`.
### clients.js
This ist just a structure to handle the entirety of all clients.
# ./src/class
This directory provides classes which represent certain data structures.
### cClient.js
The class `client()` represents on client. To declare a new instance of it, it need the raw data of a client.
### cHelper.js
This is just a utile class with helpful methods.
### cMealCollection.js
The class `mealCollection` represents the entirety of the different dishes and provides methods used by the dietPlanners to get the dishes for a mealPlan.
The method `getMeal(targetMacros, minSimilarity, planner)` is very important for dietPlanner_3. It returns a dish within a given tolerance to an given target vector (combination of the three macro nutrients).
### cNutritionalValue.js
The class `nutritionalValue` represents an abstract structure of the different values a meal, mealPlan or in general something to eat can have (calories, protein, fat, crabs, fibre)

---
Copyright © 2019 Patrick Conrad
