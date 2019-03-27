import { DietPlanner_1 } from "./../diet_planner/cPlanner_1.js"
import { DietPlanner_2 } from "./../diet_planner/cPlanner_2.js"
import { DietPlanner_3 } from "./../diet_planner/cPlanner_3.js"
export const configParameters = {
  benchmarkResultsPath: "./diet_planner/results/",
  statisticalDataPath: "./R/data/",
  // Test Parameters
  dailyPlanTolerance: 0.1, // in percentage
  timeoutPerDay: 250, // in milli seconds
  benchmarkingInterations: 100,
  dietPlannerVersions: [DietPlanner_1, DietPlanner_2, DietPlanner_3],
  dayPlanDefType: (dayPlanDef) => dayPlanDef.length === 5 ? "A" : "B",
  dayPlanDefinitions: [
    [
      {
        mealType: "breakfast",
        preparationType: "cold",
        amount: 0,
        order: 1,
        dailyKaloriesPercentage: 32
      },
      {
        mealType: "snack",
        preparationType: "cold",
        amount: -1,
        order: 2,
        dailyKaloriesPercentage: 10
      },
      {
        mealType: "full_meal",
        preparationType: "no_matter",
        amount: 0,
        order: 3,
        dailyKaloriesPercentage: 48
      },
      {
        mealType: "snack",
        preparationType: "cold",
        amount: -1,
        order: 4,
        dailyKaloriesPercentage: 10
      }
    ],
    [
      {
        mealType: "breakfast",
        preparationType: "cold",
        amount: 0,
        order: 1,
        dailyKaloriesPercentage: 20
      },
      {
        mealType: "snack",
        preparationType: "cold",
        amount: -1,
        order: 2,
        dailyKaloriesPercentage: 10
      },
      {
        mealType: "full_meal",
        preparationType: "no_matter",
        amount: 0,
        order: 3,
        dailyKaloriesPercentage: 30
      },
      {
        mealType: "snack",
        preparationType: "cold",
        amount: -1,
        order: 4,
        dailyKaloriesPercentage: 10
      },
      {
        mealType: "full_meal",
        preparationType: "no_matter",
        amount: 0,
        order: 5,
        dailyKaloriesPercentage: 30
      }
    ]
  ]
}