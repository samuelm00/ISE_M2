import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...buttonProps }: ButtonProps) {
  return (
    <button className="btn" {...buttonProps}>
      {children}
    </button>
  );
}
