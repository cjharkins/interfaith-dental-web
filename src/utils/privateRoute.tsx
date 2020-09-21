import React, { FC, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthState } from '../store/auth/types';
import { connect } from 'react-redux'

interface ProtectRouteProps {
    auth?: AuthState | undefined
    component?: object | undefined
    exact?: boolean
    path?: string
}

export const PrivateRoute: FC<ProtectRouteProps> = ({ auth, component, path }) => {

    console.log(component)
    
    return auth && auth.loggedIn ? (
        <Route exact path={path} component={component} />
    ) : (
        <Redirect to="/" />
    )
}

const mapStateToProps = (state : any) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(PrivateRoute)