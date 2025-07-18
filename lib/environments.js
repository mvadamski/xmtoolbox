const Bottleneck = require('bottleneck');

function createxMEnv(subdomain, user, pass, options = {}) {
  const limiter  = new Bottleneck({ maxConcurrent: process.env.MAX_CONCURRENT_CONNECTIONS || 10 });
  const auth     = { user, pass };
  const baseUrl  = `https://${subdomain}.xmatters.com`;
  const logLevel = options.logLevel || 'debug';
  const readOnly = options.readOnly || false;
  const errors   = [];

  function logErrors() {
    errors.map(error => {
      log.error(error.message);
    });
  }

  const logLevels = ['silent', 'error', 'warn', 'info', 'debug'];
  let logIndex    = logLevels.indexOf(logLevel.toLowerCase());

  if (typeof logIndex !== 'number') {
    logIndex = 1;
  }

  const log = {
    error:   logIndex >= 1 ? console.error   : () => {},
    warn:    logIndex >= 2 ? console.warn    : () => {},
    info:    logIndex >= 3 ? console.info    : () => {},
    time:    logIndex >= 3 ? console.time    : () => {},
    timeEnd: logIndex >= 3 ? console.timeEnd : () => {},
    log:     logIndex >= 4 ? console.log     : () => {},
    debug:   logIndex >= 4 ? console.log     : () => {}
  };

  if (readOnly) log.info('Environment', subdomain, 'Read-Only Mode');

  return { subdomain, auth, baseUrl, limiter, log, errors, logErrors, readOnly };
}

function createMaxEnv(subdomain, user, pass, options = {}) {
  const limiter  = new Bottleneck({ maxConcurrent: process.env.MAX_CONCURRENT_CONNECTIONS || 10 });
  const auth     = { user, pass };
  const baseUrl  = `https://${subdomain}.com/api/now/table/`;
  const logLevel = options.logLevel || 'error';
  const readOnly = options.readOnly || false;
  const errors   = [];

  function logErrors() {
    errors.map(error => {
      log.error(error.message);
    });
  }

  const logLevels = ['silent', 'error', 'warn', 'info', 'debug'];
  let logIndex    = logLevels.indexOf(logLevel.toLowerCase());

  if (typeof logIndex !== 'number') {
    logIndex = 1;
  }

  const log = {
    error:   logIndex >= 1 ? console.error   : () => {},
    warn:    logIndex >= 2 ? console.warn    : () => {},
    info:    logIndex >= 3 ? console.info    : () => {},
    time:    logIndex >= 3 ? console.time    : () => {},
    timeEnd: logIndex >= 3 ? console.timeEnd : () => {},
    log:     logIndex >= 4 ? console.log     : () => {},
    debug:   logIndex >= 4 ? console.log     : () => {}
  };

  if (readOnly) log.info('Environment', subdomain, 'Read-Only Mode');

  return { subdomain, auth, baseUrl, limiter, log, errors, logErrors, readOnly };
}

function createSPEnv(page_id, options = {}) {
  const limiter  = new Bottleneck({maxConcurrent: process.env.MAX_CONCURRENT_CONNECTIONS || 2});
  const baseUrl  = `https://api.statuspage.io/v1/pages/${page_id}`;
  const logLevel = options.logLevel || 'error';
  const readOnly = options.readOnly || false;
  const errors   = [];

  function logErrors() {
    errors.map(error => {
      log.error(error.message);
    });
  }

  const logLevels = ['silent', 'error', 'warn', 'info', 'debug'];
  let logIndex    = logLevels.indexOf(logLevel.toLowerCase());

  if (typeof logIndex !== 'number') {
    logIndex = 1;
  }

  const log = {
    error:   logIndex >= 1 ? console.error   : () => {},
    warn:    logIndex >= 2 ? console.warn    : () => {},
    info:    logIndex >= 3 ? console.info    : () => {},
    time:    logIndex >= 3 ? console.time    : () => {},
    timeEnd: logIndex >= 3 ? console.timeEnd : () => {},
    log:     logIndex >= 4 ? console.log     : () => {},
    debug:   logIndex >= 4 ? console.log     : () => {}
  };

  if (readOnly) log.info('Environment', subdomain, 'Read-Only Mode');

  return { baseUrl, limiter, log, errors, logErrors, readOnly };
}

exports.createMaxEnv = createMaxEnv;
exports.createxMEnv  = createxMEnv;
exports.createSPEnv  = createSPEnv;