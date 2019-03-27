#install.packages("installr")
#library(installr)
#updateR()
#install.packages("jsonlite", repos="http://cran.r-project.org")
#install.packages("dplyr", repos="http://cran.r-project.org")

library(jsonlite)
library(dplyr)

clientsData = fromJSON("./data/clientsData.json")

dplyr::count(clientsData, gender)
dplyr::count(clientsData, overallGoal)

age <- clientsData$age
summary(age)
mean(age)

kCalories <- clientsData$dailyKiloCalories
summary(kCalories)
mean(kCalories)

protein <- clientsData$dailyProteinInG
summary(protein)
mean(protein)

hrsOfSport <- clientsData$hoursOfSportPerWeek
summary(hrsOfSport)
mean(hrsOfSport)
dplyr::count(clientsData, hoursOfSportPerWeek)
