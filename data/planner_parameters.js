export const plannerParams = {
  // Test Parameters
  mealPlanDuratenInDays: 1, // 56d = 8 weeks; in Days	
  dailyPlanTolerance: 0.02, // in percentage
  timeoutPerDay: 20, // in milli seconds
  dayPlan: [{
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
}