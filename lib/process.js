const spawn = require('cross-spawn');

module.exports.spawn = function run(command, commandArgs, ...args) {
  let options = null;
  let cb = null;
  if (args.length === 1) {
    cb = args[0];
  } else if (args.length === 2) {
    options = args[0];
    cb = args[1];
  }

  const mergedOptions = Object.assign({
    stdio: 'inherit',
    env: process.env,
  }, options);

  const child = spawn(command, commandArgs, mergedOptions);

  child.on('exit', (code) => {
    if (code === 0) {
      cb();
      return;
    }

    const fullCommand = `${command} ${commandArgs.join(' ')}`.trim();
    cb(new Error(`\`${fullCommand}\` failed with exit code: ${code}`));
  });
};
