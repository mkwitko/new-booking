import { Amplify, Auth } from 'aws-amplify'

const AWS = {
  api: {
    test: {
      url: 'https://gwvcj8y7e9.execute-api.us-west-2.amazonaws.com/homolog/emitters',
    },
  },
  cognito: {
    appClientId: 'qe617fek7o0k1b4fkb77g3l2h',
    identityPoolId: '',
    region: 'us-west-2',
    userPoolId: 'us-west-2_3JnM0YuLi',
  },
}

export const AWSConfig = {
  userPoolId: AWS.cognito.userPoolId,
  userPoolWebClientId: AWS.cognito.appClientId,
  identityPoolId: AWS.cognito.identityPoolId,
  region: AWS.cognito.region,
  mandatorySignIn: false,
  cookieStorage: {
    domain:
      process.env.NODE_ENV === 'development'
        ? 'localhost'
        : '.b2breservas.com.br',
    path: '/',
    expires: 1,
    secure: true,
  },
  endpoint: AWS.api.test.url,
}
Amplify.configure({
  API: {
    endpoints: [
      {
        custom_header: async () => {
          // With Cognito User Pools use this:
          return {
            Authorization: (await Auth.currentSession())
              .getIdToken()
              .getJwtToken(),
          }
        },
        endpoint: AWS.api.test.url,
        name: 'test',
      },
    ],
  },
  Auth: {
    identityPoolId: AWS.cognito.identityPoolId,
    // mandatorySignIn: true,
    region: AWS.cognito.region,
    userPoolId: AWS.cognito.userPoolId,
    userPoolWebClientId: AWS.cognito.appClientId,
    cookieStorage: {
      domain:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : '.b2breservas.com.br',
      path: '/',
      expires: 1,
      secure: true,
    },
  },
})
