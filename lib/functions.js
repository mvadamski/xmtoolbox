const common = require('./common');

async function getMany(env, query) {
  return common.getMany(env, `/api/xm/1/functions`, query, 'Functions');
}

async function create(env, func) {
  return common.create(env, '/api/xm/1/functions', func, 'Function', true);
}

async function update(env, func, functionId) {
  return common.update(env, '/api/xm/1/functions/', func, functionId, 'Function');
}

exports.getMany = getMany;
exports.create  = create;
exports.update  = update;
