import React, { PureComponent } from 'react';
import Loader from "../components/Loader"

export function withAuthentication(Component) {
    return class extends PureComponent {
        state = {
            isLoading: true,
        };
        componentDidMount() {
            if (localStorage.hasOwnProperty('token')) {

                this.props.authentication().then(res => {
                    // this.props.saveUserInfo(res.userInfo)
                    this.setState({ isLoading: false });
                    console.log(res)
                    // debugger;
                    if (res.success) {
                        // debugger
                        if (res.userInfo.flow === "eventManaging") {
                            this.props.history.push("/event-management/admin-dashboard")
                        }
                        else if (res.userInfo.flow === 'taskManaging') {
                            this.props.history.push("/task-management/user-dashboard")
                        }
                        else {
                            // debugger
                            this.props.history.push('/home');
                        }
                    }
                    else {
                        // debugger
                        this.props.history.push('/home');
                    }
                }).catch(err => {
                    console.log(err)
                    // localStorage.removeItem('token')
                    this.setState({ isLoading: false });
                    this.props.history.push('/home');
                })
            }
            else {
                this.setState({ isLoading: false });
                this.props.history.push('/home');
            }

        }
        render() {
            const { isLoading } = this.state;
            if (isLoading) return <Loader />;
            return <Component {...this.props} />;
        }
    };
}
