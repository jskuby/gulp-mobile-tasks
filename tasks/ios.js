const fs = require('fs');
const rmdir = require('rimraf');
const { spawn } = require('../lib/process');

module.exports = {
  debug: (config, cb) => {
    if (process.platform !== 'darwin')
      throw new Error('iOS build not supported');

    spawn('xcodebuild', [
      '-project', config.project,
      '-scheme', config.scheme,
      '-configuration', 'Debug',
    ], cb);
  },
  archiveRelease: (config, cb) => {
    if (process.platform !== 'darwin')
      throw new Error('iOS build not supported');

    if (fs.existsSync(config.archivePath))
      fs.unlink(config.archivePath);

    spawn('xcodebuild', [
      '-project', config.project,
      '-scheme', config.scheme,
      '-configuration', 'Release',
      '-archivePath', config.archivePath,
      'archive',
    ], cb);
  },
  exportArchive: (config, cb) => {
    if (process.platform !== 'darwin')
      throw new Error('iOS build not supported');

    if (!fs.existsSync(config.archivePath))
      throw new Error('No iOS app archive found!');

    if (fs.existsSync(config.exportPath))
      fs.unlink(config.exportPath);

    spawn('xcodebuild', [
      '-exportArchive',
      '-archivePath', config.archivePath,
      '-exportPath', config.exportPath,
      '-exportOptionsPlist', config.exportOptionsPlist,
    ], cb);
  },
};
