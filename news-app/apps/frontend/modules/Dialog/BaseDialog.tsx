import React from 'react';

interface BaseDialogProps {
  id: string;
  children: React.ReactNode;
}

export default function BaseDialog({ children, id }: BaseDialogProps) {
  return (
    <React.Fragment>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {children}
        </label>
      </label>
      <label className="hidden" htmlFor={id} id={`${id}-close`} />
    </React.Fragment>
  );
}
