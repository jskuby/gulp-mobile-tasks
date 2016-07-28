const rmdir = require('rimraf');

module.exports = (paths, cb) => {
  paths.forEach((folder) => {
    rmdir.sync(folder);
  });

  cb();
};
