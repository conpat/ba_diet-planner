#install.packages("installr")
#library(installr)
#updateR()

#install.packages("jsonlite", repos="http://cran.r-project.org")
#install.packages("dplyr", repos="http://cran.r-project.org")

library(jsonlite)
library(dplyr)

performance = fromJSON("./data/benchmark-performance.json")

dplyr::count(performance, plannerVersion, dayPlanDefType)


performance_planner_2 <- subset(performance, plannerVersion == 2)
png("benchmark-performance-planner_2.png", width = 260, height = 500)
boxplot(timeMean~dayPlanDefType*plannerVersion,
        data = performance_planner_2,
        main = "Leistung",
        xlab = "Algorithmen und Tagesplandefinition",
        ylab = "Zeit je Ausführung in ms",
        ylim = c(0,35))
dev.off()

performance_planner_1_3 <- subset(performance, plannerVersion == 1 | plannerVersion == 3)
png("benchmark-performance-planner_1_3.png", width = 533, height = 500)
boxplot(timeMean~dayPlanDefType*plannerVersion,
        data = performance_planner_1_3,
        main = "Leistung",
        xlab = "Algorithmen und Tagesplandefinition",
        ylab = "Zeit je Ausführung in ms",
        ylim = c(0,0.5))
dev.off()


time1 <- subset(benchmarkData1, plannerVersion == "baseline" & clientID == 15, select = c(time))$time

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


