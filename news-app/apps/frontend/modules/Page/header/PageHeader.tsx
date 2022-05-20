import React from 'react';
import { WithClassName } from '../../common/types/common.types.uiProps';
import clsx from 'clsx';

interface PageHeaderProps extends WithClassName {
  title: string;
}

export default function PageHeader({ title, className }: PageHeaderProps) {
  return <h1 className={clsx('text-3xl font-bold', className)}>{title}</h1>;
}
