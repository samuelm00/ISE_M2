import clsx from 'clsx';
import React from 'react';
import { ButtonProps } from './Button';

interface DialogButtonProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  id: string;
  children: React.ReactNode;
}

export default function DialogButton({
  id,
  children,
  ...labelProps
}: DialogButtonProps) {
  return (
    <label
      htmlFor={id}
      {...labelProps}
      className={clsx('btn', labelProps?.className)}
    >
      {children}
    </label>
  );
}
