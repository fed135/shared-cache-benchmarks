/**
 * Shared AppCache slave
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

const Benchmark = require('benchmark');
const nsc = require('node-shared-cache');

/* Local variables -----------------------------------------------------------*/

var cacheObj = new nsc.Cache('test', 557056);

/* Methods -------------------------------------------------------------------*/

// nsc_set x 60,287 ops/sec ±30.86% (56 runs sampled)
function nsc_set(d) {
    cacheObj.key = { foo: Math.random() * 0xffffffff };
    d.resolve();
}

// nsc_get x 86,603 ops/sec ±16.62% (52 runs sampled)
function nsc_get(d) {
    let foo = cacheObj.key;
    d.resolve();
}

// mac_set x 27,700 ops/sec ±3.44% (62 runs sampled)
function mac_set(d) {
    process.send({ 
        cache_set: 'key',
        value: { foo: Math.random() * 0xffffffff }
    });
    d.resolve();
}

// mac_get x 3,948 ops/sec ±5.38% (61 runs sampled)
function mac_get(d) {
    process.send({ cache_get: 'key' });
    process.once('message', res => d.resolve(res.cache_get));
}

/* Init ----------------------------------------------------------------------*/

const bench = new Benchmark('nsc_set', { defer: true, fn: nsc_set });
const bench2 = new Benchmark('nsc_get', { defer: true, fn: nsc_get });
const bench3 = new Benchmark('mac_set', { defer: true, fn: mac_set });
const bench4 = new Benchmark('mac_get', { defer: true, fn: mac_get });
bench.on('cycle', function(event) { console.log(String(event.target));})
bench2.on('cycle', function(event) { console.log(String(event.target));})
bench3.on('cycle', function(event) { console.log(String(event.target));})
bench4.on('cycle', function(event) { console.log(String(event.target));})

//bench.run({async:true});
//bench2.run({async:true});
//bench3.run({async:true});
bench4.run({async:true});