'use client'
import React, { ReactNode } from 'react';
import {
  RecoilRoot,
} from 'recoil';

const  ReooilProvider = ({children} : {children:ReactNode}) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
}

export default ReooilProvider