import React from 'react';
import { twMerge } from 'tailwind-merge';
import Spinner from '../utilsComponents/Spinner';

export default function Button({
  label,
  onClick,
  disabled,
  color = 'primary',
  mergeClass,
  textClass,
  children,
  buttonType = 'button',
  loading = false,
}: {
  label: string;
  onClick?: any;
  disabled?: boolean;
  color?: 'primary' | 'light' | 'disabled';
  mergeClass?: string;
  textClass?: string;
  children?: React.ReactNode;
  buttonType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}) {
  const classes = `${
    color === 'primary'
      ? 'bg-primary text-white'
      : color === 'light'
      ? 'text-primary'
      : color === 'disabled'
      ? 'text-textDisabled'
      : ''
  } ${
    disabled || loading
      ? 'opacity-75'
      : color === 'primary'
      ? 'hover:bg-primaryDark'
      : ''
  } 
      px-6 py-3 h-12 rounded-[.325rem] disabled:cursor-not-allowed w-full font-semibold flex items-center justify-center gap-4`;
  return (
    <button
      type={buttonType === 'button' ? 'button' : 'submit'}
      onClick={onClick || undefined}
      disabled={disabled || loading}
      className={mergeClass ? twMerge(classes, mergeClass) : classes}
    >
      {children}
      {loading ? <Spinner /> : <p className={textClass}>{label}</p>}
    </button>
  );
}
