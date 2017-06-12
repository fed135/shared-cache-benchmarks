# Shared cache benchmarks

## The concept

Testing various ways of locally sharing memory in node. (Accross forks)

## Install

```
    npm install
```


## Running the tests

- Uncomment/ comment the test you want to run

- `node master.js`


## Current results

Ran against 2 forks on an 8 core machine with 16g or ram and Node 6.9 

```
// node-shared-cache
// nsc_set x 60,287 ops/sec ±30.86% (56 runs sampled)
// nsc_get x 86,603 ops/sec ±16.62% (52 runs sampled)

// master-app-cache (wip)
// mac_set x 27,700 ops/sec ±3.44% (62 runs sampled)
// mac_get x 3,948 ops/sec ±5.38% (61 runs sampled)

```


## Want to help ?

You are awesome! Open an issue on this project, identifying the feature that you want to tackle and we'll take the discussion there!


## License 

[Apache 2.0](LICENSE) (c) 2017 Frederic Charette
