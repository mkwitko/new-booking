'use client';

import logo from '@/assets/b2b/logo.svg';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { motion as m } from 'framer-motion';

import { BiSolidUser } from 'react-icons/bi';

import { AuthApi } from '@/services/auth/auth-service';

interface HeaderProps {
  showRouteIcons: boolean;
}

export default function Header({ showRouteIcons = false }: HeaderProps) {
  const router = useRouter();
  const [isLogOutButtonVisible, setIsLogOutButtonVisible] =
    useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const { logout } = AuthApi();

  function handleOpenLogOutButton() {
    setIsLogOutButtonVisible(true);
  }

  async function handleCloseLogOutButton() {
    await setTimeout(() => {
      setIsLogOutButtonVisible(false);
    }, 100);
  }

  return (
    <header className="flex w-full h-[70px] flex-row justify-between items-center bg-primaryDark shadow-xl py-6 text-white">
      <div className="flex items-center justify-between max-width-default">
        <div className="flex flex-row items-center gap-6">
          <Image
            src={logo}
            alt="Hub"
            width={112}
            height={16}
            className="w-52"
          />
        </div>

        {showRouteIcons && (
          <div className="flex flex-row items-center gap-4 relative">
            <button
              className="font-bold"
              onFocus={handleOpenLogOutButton}
              onBlur={handleCloseLogOutButton}
            >
              <BiSolidUser className="w-6 h-6" />
            </button>

            {isLogOutButtonVisible && (
              <m.button
                onClick={handleLogout}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                type="button"
                className="absolute right-0 top-8 px-6 py-2 bg-white hover:bg-zinc-200 group shadow-lg rounded-b2bSmall transition-colors"
              >
                <span className="text-primary">Logout</span>
              </m.button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
