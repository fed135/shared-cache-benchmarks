/**
 * Shared AppCache
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

const cluster = require('cluster');

/* Local variables -----------------------------------------------------------*/

const FORKS = 2;
const cacheObj = {};

/* Methods -------------------------------------------------------------------*/

function cache(fork, req) {
    if (req.cache_get) {
        fork.send({ cache_get: cacheObj[req.cache_get] });
    }
    else {
        cacheObj[req.cache_set] = req.value;
    }
}
/* Init ----------------------------------------------------------------------*/

if (cluster.isMaster) {
  for (let i = 0; i < FORKS; i++) {
    const fork = cluster.fork();
    fork.on('message', cache.bind(null, fork));
  }
} else {
  require('./slave');
}