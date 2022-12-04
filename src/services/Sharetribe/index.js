const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');

module.exports = {
  integrationSdk: sharetribeIntegrationSdk.createInstance({
    clientId: process.env.SHARETRIBE_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_CLIENT_SECRET
  })
}
