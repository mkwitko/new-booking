import { Auth } from 'aws-amplify'
import '@/config/awsConfig'

export const B2BApiFetch = async (url: string, method: string, body?: any) => {
  const response = await fetch(
    'https://806df3oywg.execute-api.us-west-2.amazonaws.com/homolog/api/booking/v1/' +
      url,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: await Auth.currentSession().then((result) => {
          const token = result.getIdToken().getJwtToken()
          return token
        }),
      },
      cache: 'force-cache',
      next: {
        revalidate: 3600,
      },
    },
  )
  return response
}
