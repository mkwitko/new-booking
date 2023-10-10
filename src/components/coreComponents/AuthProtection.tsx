'use client';

import '@/config/awsConfig'
import { Auth } from 'aws-amplify'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthCheck = ({ children }: {
    children: React.ReactNode
}) => {
    const router = useRouter()
    const pathName = usePathname();

    const getUser = async () => {
        const regexPattern = `CognitoIdentityServiceProvider\.qe617fek7o0k1b4fkb77g3l2h\.[^.]+\.(idToken)`

        const regex = new RegExp(regexPattern)

        const cookie = Cookies.get();

        const cookies = Object.keys(cookie).map((key) => {
            return key
        })


        let isAuth = false
        if (cookies.length > 0)
          cookies.forEach((e: any) => {
            if (e.match(regex)?.length > 0) isAuth = true
          })

        if (!isAuth) {
          const loggedRoutes = [
            '/',
            '/reserves',
            '/reserves/new',
            '/search',
            '/solicitations',
            '/search/details',
            '/search/new',
          ]
          const hasLoggedRoute = loggedRoutes.some((route) => {
            return pathName.includes(route)
          })
          if (hasLoggedRoute) {
            return router.replace('/auth')
          }
        }

        if (isAuth) {
          if (pathName === '/' || pathName.includes('/auth')) {
            return router.replace('/search')
          }
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    //   if(!auth) return <Loading /> // a loading component that prevents the page from rendering

    return children
}