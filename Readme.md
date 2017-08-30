#ga-traffic-simulator

[![Code Climate](https://codeclimate.com/github/nselvidge/ga-traffic-simulator/badges/gpa.svg)](https://codeclimate.com/github/nselvidge/ga-traffic-simulator)
[ ![Codeship Status for nselvidge/ga-traffic-simulator](https://codeship.com/projects/704a0930-e260-0133-5673-0229a9d1976f/status?branch=master)](https://codeship.com/projects/145605)
## Description

A CLI to simulate traffic to google analytics

## Install

To install ga-traffic-simulator from npm, run:

```
$ npm install -g ga-traffic-simulator
```

To install from local branch, use npm install inside the repository.

```npm install```


## Config

To run it you will need a config file with the following structure:

```
  "trackingId": "UA-XXXXXX-X",
  "host": "hostname.com",
  "path": "/",
  "title": "title",
  "hits": 10,
  "modifiers": {
    "randomValue": [{
      "key": "cd1",
      "type": "discrete",
      "range": ["1", "2", "3"]
    }]
  }
}
```

Host, path and title can be provided arrays (make sure they are the same length) to simulate a navigation path for a same visitor. 

Current only available modifier is randomValue, which allowed types "discrete" or "random". Both take a range, but in the case of type "random", it randomizes between two values provided in an array, while "discrete" randomizes betweent the given values in the range array.

## Usage

To run it:

```ga-traffic-simulator run (PATH_TO_CONFIG)```

For help, run:

```ga-traffic-simulator --help```

## License

Copyright (c) 2016 Nathan Selvidge

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
