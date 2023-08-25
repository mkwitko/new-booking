import React from 'react';
import { twMerge } from 'tailwind-merge';
import Spinner from '../utilsComponents/Spinner';

export default function B2BButton({
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
  color?: 'primary' | 'light' | 'outlined' | 'disabled';
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
      : color === 'outlined'
      ? 'text-primary border border-primary'
      : color === 'disabled'
      ? 'text-textDisabled'
      : ''
  } ${
    disabled || loading
      ? 'opacity-75'
      : color === 'primary'
      ? 'hover:bg-primaryDark'
      : color === 'outlined'
      ? 'hover:bg-primary/5'
      : ''
  } 
    px-4 py-1 h-[2rem] rounded-[.325rem] disabled:cursor-not-allowed w-full font-semibold flex items-center justify-center gap-4`;

  const defaultTextClasses = 'uppercase font-[700] text-center';
  return (
    <button
      type={buttonType === 'button' ? 'button' : 'submit'}
      onClick={onClick || undefined}
      disabled={disabled || loading}
      className={mergeClass ? twMerge(classes, mergeClass) : classes}
    >
      {children}
      {loading ? (
        <Spinner />
      ) : (
        <p
          className={
            textClass
              ? twMerge(defaultTextClasses, textClass)
              : defaultTextClasses
          }
        >
          {label}
        </p>
      )}
    </button>
  );
}
