const { spawn } = require('../lib/process');

function build(task, config, cb) {
  if (!task)
    throw new Error('A gradle task is required to build an Android project!');

  spawn(config.gradleCmd || 'gradle', [task], {
    cwd: config.projectPath,
  }, cb);
}

module.exports = {
  debug: (config, cb) => build('assembleDebug', config, cb),
  release: (config, cb) => build('assembleRelease', config, cb),
  installDebug: (config, cb) => build('installDebug', config, cb),
  installRelease: (config, cb) => build('installRelease', config, cb),
};
