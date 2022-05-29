import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...buttonProps }: ButtonProps) {
  return (
    <button {...buttonProps} className={clsx('btn', buttonProps?.className)}>
      {children}
    </button>
  );
}
