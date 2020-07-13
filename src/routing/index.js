import React, { Component, Suspense, memo } from 'react';
import { Route } from 'react-router-dom';
import { withAuthentication } from './auth';
import { withRouter } from 'react-router';
import routes from './routes';
import { authentication, saveUserInfo } from "../Redux/actions"
import { connect } from "react-redux"
import Loader from "../components/Loader"
function AppRoute({ ...props }) {
    return <Route {...props} />;
}

function Routing() {

    return (
        <Suspense fallback={<Loader />}>
            {routes.map((route, index) => {
                return (
                    <AppRoute
                        privateRoute={route.private}
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={(props) => {
                            return (
                                <route.layout>
                                    <route.component {...props} />
                                </route.layout>
                            );
                        }}
                    />
                );
            })}
        </Suspense>
    );
}

export default memo(withRouter(connect(null, { authentication, saveUserInfo })((withAuthentication(Routing)))));