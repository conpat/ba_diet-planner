# ba_diet_planner

This repository provides source code used for my bachelor-thesis at the University of Regensburg.

## Ready... (Requirements)
[Node.js](https://nodejs.org/) v11.12+
[npm](https://npmjs.com/) v6.9+

Either you use the source from the CD attached to the thesis or (recommended) the final commit from GitHub.

If you read this, you are using v0.1.0. Committed and taged by Friday the 29-03-2019. Due to the weekend I have to submit my printed thesis (attached with this code) 2 days before the deadline.
I will fix some minor issues till Sunday night and tag the commit with v0.1.1.

```sh
$ git clone https://github.com/conpat/ba_diet-planner.git
$ git checkout v0.1.1
```
or copy the source code to your working directory

## Set... (Install)

Install the dependencies.

```sh
$ cd ba_diet_planner
$ npm install
```

## Go... (Run it)
The CLI will give you rudimentary help about the available <commands> and <options>.
```sh
$ node index.js -h
```
It's important to understand, that the entry point (in terms of code) is the `main.js`. But to use the CLI you need to use the `index.js`, this is due to the `esm` package.

Basically you can run
- a single test.
- all tests together
- prepare the date for further evaluation
- show clients information
- plan and show a demo day

#### test
With the plain `test` <command> you run all three algorithms in all possible variations.
```sh
$ node index.js test
```
Adding the planner_version option <-1/-2/-3> you run the test just for one of the algorithms. This can be useful if you want create just the test date for one specific algorithm.
```sh
$ node index.js test -2
```

#### prepare_data
After running the tests, the results has to be prepared and exported for further evaluation. Again you can use options for exporting results from only one algorithm.
```sh
$ node index.js data
```

#### demo
The demo <command> can be used to see the the result of planing one day for a client with the chosen planner.
In detail it shows:
- all the information of the client.
- all the meals and their information.
- the nutritional values of the planned day.
```sh
$ node index.js demo 3 A 99
```
The CLI help will show how to use it.

#### client
The client <command> will prepare all clients (calculate the nutritional requirements) and log them to the console.
```sh
$ node index.js clients
```

## Further Reading
There are more READMEs in subdirectories. Each will document the specific directory/files.


---
Copyright © 2019 Patrick Conrad
