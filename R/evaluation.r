#install.packages("installr")
#library(installr)
#updateR()

#install.packages("jsonlite", repos="http://cran.r-project.org")

library(jsonlite)

benchmarkData1 = fromJSON("benchmarks.json")
benchmarkData2 = fromJSON("benchmarks-2019-03-17-572.json")

png("diet_planner-boxplot_2.png")
boxplot(time~plannerVersion,
        data = benchmarkData,
        main = "Algorithmus Benchmark",
        xlab = "Algorithmus Varianten",
        ylab = "Zeit je Auführung in ms",
        ylim = c(0,2))

boxplot(time~plannerVersion,
        data = benchmarkData,
        main = "Algorithmus Benchmark",
        xlab = "Algorithmus Varianten",
        ylab = "Zeit je Auführung in ms")
dev.off()

time <- benchmarkData$time~plannerVerion
time1 <- subset(benchmarkData1, plannerVersion == "baseline" & clientID == 15, select = c(time))$time
time <- subset(benchmarkData, plannerVersion == "baseline", select = c(time))$time

summary(time1)
sd(time1)
mean(time1)
hist(time1,
     prob = FALSE,# prob=TRUE for probabilities not counts
     breaks = 100,
     xlim = c(0, 0.5))
lines(density(time1), col="blue", lwd=2) # add a density estimate with defaults
lines(density(time1, adjust=2), lty="dotted", col="darkgreen", lwd=2) 

time2 <- subset(benchmarkData2, plannerVersion == "diet-planner_2" & clientID == 1, select = c(time))$time
summary(time2)
sd(time2)
mean(time2)
hist(time2,
     prob = FALSE,# prob=TRUE for probabilities not counts
     main = "Klient #1",
     xlab = "Zeit je Auführung in ms",
     breaks = 200)
lines(density(time2), col="blue", lwd=2) # add a density estimate with defaults
lines(density(time2, adjust=2), lty="dotted", col="darkgreen", lwd=2) 

boxplot(time2,
        data = benchmarkData,
        main = "Klient #1",
        ylab = "Zeit je Auführung in ms")





hist(X, prob=TRUE, col="grey")# prob=TRUE for probabilities not counts
lines(density(X), col="blue", lwd=2) # add a density estimate with defaults
lines(density(X, adjust=2), lty="dotted", col="darkgreen", lwd=2) 


















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
