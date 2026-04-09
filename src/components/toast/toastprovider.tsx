"use client"

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
    children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer
                autoClose={3000}
                position='bottom-right'
                toastStyle={{
                    minWidth: "400px"
                }}
            />
        </>
    );
}