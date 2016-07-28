const fs = require('fs');
const rp = require('request-promise');

const BASE_URL = 'https://www.installrapp.com';
const BASE_EXT = 'json';

class InstallrAPI {
  constructor(token, defaultAppId) {
    this.defaultAppId = defaultAppId;
    this.defaultOptions = {
      headers: {
        'X-InstallrAppToken': token,
      },
    };
  }

  getAppDetails(appId = this.defaultAppId) {
    return rp(`${BASE_URL}/apps/${appId}.${BASE_EXT}`, this.defaultOptions);
  }

  listApps() {
    return rp(`${BASE_URL}/apps.${BASE_EXT}`, this.defaultOptions);
  }

  notifyTesters(testers, build = 'latest', appId = this.defaultAppId) {
    if (!testers || testers.length === 0)
      throw new Error('no testers provided');

    return rp(Object.assign({
      method: 'POST',
      uri: `${BASE_URL}/apps/${appId}/builds/${build}/team.${BASE_EXT}`,
      form: {
        notify: typeof testers === 'string' ? testers : testers.join(', '),
      },
    }, this.defaultOptions));
  }

  uploadApp(appFullPath, releaseNotes = '') {
    if (!fs.existsSync(appFullPath))
      throw new Error('No app file found!');

    return rp(Object.assign({
      method: 'POST',
      uri: `${BASE_URL}/apps.${BASE_EXT}`,
      formData: {
        qqfile: fs.createReadStream(appFullPath),
        releaseNotes,
      },
    }, this.defaultOptions));
  }
}

module.exports = InstallrAPI;
