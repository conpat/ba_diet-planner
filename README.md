# ba_diet_planner

This repository provides source code used for my bachelor-thesis at the University of Regensburg.


## Ready... (Requirements)
[Node.js](https://nodejs.org/) v11.12+
[npm](https://npmjs.com/) v6.9+

Either you use the source from the CD attached to the thesis or (rcommended) the final commit from GitHub.

If you read this, you are using v0.1.0. Commited and taged by Friday the 29-03-2019. Due to the weekend I have to submit my printed thesis (attached with this code) 2 days before the deadline.
I will fix some minore issues till sunday night and tag the commit with v0.1.1.

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
The CLI will give you rudimentary help about the available <commands> and <options>
```sh
$ node index.js -h
```

Basicly you can run
- a single test.
- all tests together
- prepare the date for further evaluation

#### test
With the plain `test` <command> you run all three algorithms in all possible variations.
```sh
$ node index.js test
```
Adding the planner_version option <-1/-2/-3> you run the test just for one of the algorithms. This can be usefull if you want create just the testdate for one specific algorithm.
```sh
$ node index.js test -2
```

#### prepare_data
After running the tests, the results has to be prepared and exported for further evaluation. Again you can use options for exporting results from only one algorithm.
```sh
$ node index.js data
```

## Further Reading
There are more READMEs in subdirectories. Each will document the specific directory/files.


---
Copyright © 2019 Patrick Conrad
