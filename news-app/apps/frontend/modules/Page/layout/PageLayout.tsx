import React from 'react';
import { WithChildren } from '../../common/types/common.types.uiProps';

export default function PageLayout({ children }: WithChildren) {
  return <div className="px-8 py-8">{children}</div>;
}
