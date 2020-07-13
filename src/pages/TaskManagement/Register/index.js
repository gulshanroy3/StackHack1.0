import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { saveUserInfo, userRegistration, userLogin, checkUser, authentication } from "../../../Redux/actions"
import FormTemplate from "../../../template/FormTemplate"
import { useDispatch } from "react-redux"
function Registration(props) {
    const makeReqestPayload = (data) => {
        data.flow = 'taskManaging'
        data.tasks = []
        return data
    }
    const dispatch = useDispatch()
    return (
        <FormTemplate
            template={template}
            makeNetworkCall={(data) => dispatch(userRegistration(data))}
            saveUserInfo={(data) => dispatch(saveUserInfo(data))}
            login={(data) => dispatch(userLogin(data))}
            route='/task-management/login'
            makeReqestPayload={makeReqestPayload}
            checkUser={(emailId) => dispatch(checkUser(emailId, 'register'))}
            authentication={() => dispatch(authentication())}
        />
    )
}

const template = [
    {
        "label": "Full Name",
        "name": 'name',
        "uIElement": "input",
        "type": "text",
        "required": true
    },
    {
        "label": "Mobile Number",
        "name": 'mobile',
        "uIElement": "input",
        "type": "number",
        "required": true,
        min: 1
    },
    {
        "label": "Email",
        "name": 'email',
        "uIElement": "input",
        "type": "email",
        "required": true
    },
    {
        "label": "password",
        "name": 'password',
        "uIElement": "input",
        "type": "password",
        "required": true
    }
]

export default withRouter(Registration);

