#install.packages("installr")
#library(installr)
#updateR()

#install.packages("jsonlite", repos="http://cran.r-project.org")

library(jsonlite)
jsonData = fromJSON("statisticalData-2019-01-21-41558.json")
tmp = fromJSON("./tmp/tmp.json")

benchmarkData = fromJSON("benchmarks.json")

png("diet_planner-boxplot.png")
boxplot(time,
        data = benchmarkData,
        main = "Recepievariance",
        xlab = "recipes per day")
dev.off()



png("recipes_allergies-boxplot.png")
boxplot(avg_recipes_per_day~user_allergies,
        data = jsonData,
        main = "Recepievariance",
        xlab = "recipes per day",
        ylim = c(0,3),
        horizontal = TRUE,
        las = 2,
        pars = list(par(mar=c(5,14,4,2))))
dev.off()

png("recipes_diet_type-boxplot.png")
boxplot(avg_recipes_per_day~user_diet_type,
        data = jsonData,
        main = "Recepievariance",
        xlab = "recipes per day",
        ylim = c(0,3),
        horizontal = TRUE,
        las = 2,
        pars = list(par(mar=c(5,14,4,2))))
dev.off()
