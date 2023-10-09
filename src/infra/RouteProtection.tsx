'use client';

import React, { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { Auth } from 'aws-amplify';

export default function RouteProtection() {
    const router = useRouter();
    const pathName = usePathname();
    const loggedRoutes = [
        '/reserves',
        '/reserves/new',
        '/search',
        '/solicitations',
        '/search/details',
        '/search/new',
    ];

    const isAuthenticated = async (): Promise<boolean> => {
        try {
            await Auth.currentAuthenticatedUser();
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        
    })
}
