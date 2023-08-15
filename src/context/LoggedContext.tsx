/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Classes from '@/classes';
import UserClass from '@/classes/user/UserClass';
import { set } from '@/services/cache';
import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';

import '@/config';

interface LoggedContextProps {
  user: UserClass;
}

export const LoggedContext = React.createContext({} as LoggedContextProps);

export function LoggedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes: any = Classes();
  const {
    user,
  }: {
    user: UserClass;
    coreClass: any;
  } = classes;

  async function getUserSession() {
    const session = await Auth.currentSession();
    const { username: alphaId } = session.getAccessToken().payload;

    setAlphaId(alphaId);
  }

  useEffect(() => {
    getUserSession();
  }, []);

  function setAlphaId(alphaId: string) {
    set('alphaId', alphaId);
    Object.values(classes).forEach((e: any) => {
      e.hook.setAlphaId(alphaId);
    });
  }

  return (
    <LoggedContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </LoggedContext.Provider>
  );
}
