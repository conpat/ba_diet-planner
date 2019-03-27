#install.packages("installr")
#library(installr)
#updateR()

#install.packages("jsonlite", repos="http://cran.r-project.org")

library(jsonlite)
library(dplyr)

nutritionalValues = fromJSON("./data/benchmark-nutritional_values.json")

png("benchmark-nutritional_value_calories.png", width = 900, height = 500)
boxplot(caloriesPercentage~dayPlanDefType*plannerVersion,
        data = nutritionalValues,
        main = "Genauigkeit der N‰hrwerte - Kalorien",
        xlab = "Algorithmen und Tagesplandefinition",
        ylab = "Treffen des Kalorienbedarfs in Prozent",
        ylim = c(-20, 20))
dev.off()

png("benchmark-nutritional_value_protein.png", width = 900, height = 500)
boxplot(proteinPercentage~dayPlanDefType*plannerVersion,
        data = nutritionalValues,
        main = "Genauigkeit der N‰hrwerte - Eiweiﬂ",
        xlab = "Algorithmen und Tagesplandefinition",
        ylab = "Treffen des Eiweiﬂbedarfs in Prozent")
dev.off()
