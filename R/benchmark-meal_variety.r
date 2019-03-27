#install.packages("installr")
#library(installr)
#updateR()

#install.packages("jsonlite", repos="http://cran.r-project.org")

library(jsonlite)
library(dplyr)

mealVariety = fromJSON("./data/benchmark-meal_variety.json")

dplyr::count(mealVariety, plannerVersion, dayPlanDefType)


png("benchmark-meal_variety.png", width = 900, height = 500)
boxplot(quotient~dayPlanDefType*plannerVersion,
        data = mealVariety,
        main = "Gerichtvielfältigkeit",
        xlab = "Algorithmen und Tagesplandefinition",
        ylab = "Verhältnis verwendete Gerichte und Mahlzeitenanzahl",
        ylim = c(0,1))
dev.off()


variety_planner_3 <- subset(mealVariety, plannerVersion == 3)$quotient
summary(variety_planner_3)
