import { Authority } from '@/@types/Authority';
import Data from '@/app/(logged)/home/(data)/data';
import { get } from '@/services/cache';
import { useState } from 'react';

export default function useUserHook() {
  const { availableUserOptions } = Data();

  const [data, setData] = useState<any>(get('user') || []);
  const [alphaId, setAlphaId] = useState<string>(get('alphaId') || '');

  const setUserAuthorities = (authorities: Authority[]) => {
    const response = treatData(authorities);
    setData(response);
    return response;
  };

  const treatData = (authorities: any) => {
    return availableUserOptions.map((each: any) => {
      const authority = authorities.find(
        (item: Authority) => item.codename === each.codename
      );

      return {
        ...each,
        granted: authority?.granted,
        homeURL: authority.homeURL,
        authDescription: authority.description,
      };
    });
  };

  return {
    data,
    setData,
    alphaId,
    setAlphaId,
    setUserAuthorities,
  };
}
