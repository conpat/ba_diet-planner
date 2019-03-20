#install.packages("installr")
#library(installr)
#updateR()
#install.packages("jsonlite", repos="http://cran.r-project.org")
#install.packages("dplyr", repos="http://cran.r-project.org")

library(jsonlite)
library(dplyr)

mealsData = fromJSON("./data/mealsData.json")

dplyr::count(mealsData, isBreakfast, isSnack)

breakfasts <- subset(mealsData, isBreakfast == TRUE)
snacks <- subset(mealsData, isSnack == TRUE)
fullMeals <- subset(mealsData, isSnack == FALSE)

kCalories <- mealsData$kCalories
summary(kCalories)
mean(kCalories)

protein <- mealsData$proteinInG
summary(protein)
mean(protein)

fat <- mealsData$fatInG
summary(fat)
mean(fat)

carbs <- mealsData$carbsInG
summary(carbs)
mean(carbs)

fibre <- mealsData$fibreInG
summary(fibre)
mean(fibre)