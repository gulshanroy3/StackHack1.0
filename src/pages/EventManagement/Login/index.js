import React, { Component } from 'react';
import FormTemplate from "../../../template/FormTemplate"
import { useDispatch } from "react-redux"
import { userLogin, saveUserInfo, checkUser } from "../../../Redux/actions"
function Login(Props) {
    const makeReqestPayload = (data) => {
        data.flow = 'eventLogin'
        return data
    }
    const dispatch = useDispatch()
    return (
        <div>
            <FormTemplate template={template} title='Login Form'
                info='Not Registered?'
                route='/event-management/registration'
                linkText='register'
                buttonText='Login'
                makeNetworkCall={(data) => dispatch(userLogin(data))}
                saveUserInfo={(data) => dispatch(saveUserInfo(data))}
                checkUser={(emailId) => dispatch(checkUser(emailId, 'login'))}
            // makeReqestPayload={makeReqestPayload}
            />
        </div>
    );
}

const template = [
    {
        "label": "Email",
        "name": 'email',
        "uIElement": "input",
        "type": "email",
        "required": true
    },
    {
        "label": "Password",
        "name": 'password',
        "uIElement": "input",
        "type": "password",
        "required": true,
    },
]
export default Login;