require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appleId = process.env.APPLEID;

  return await notarize({
    appBundleId: 'com.update.electron',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: appleId,
    appleIdPassword: `@keychain:AC_PASSWORD`,
  });
};