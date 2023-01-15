import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouteS = () => {

    const auth = { 'token': 'token_dinamico' };

    return (
        auth.token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRouteS;