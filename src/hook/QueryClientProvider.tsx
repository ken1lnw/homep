'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { message } from 'antd';
// Create a client
const queryClient = new QueryClient(
    {
        defaultOptions:{
            queries:{
                refetchOnWindowFocus: false,
                refetchOnMount: false,
            }
        }
    }
);


interface QueryClientProviderProps {
    children: React.ReactNode;
}

export const CustomQueryClientProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <QueryClientProvider client={queryClient}>
            {contextHolder}
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};
