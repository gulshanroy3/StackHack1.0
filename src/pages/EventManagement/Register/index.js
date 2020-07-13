import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { saveUserInfo, userRegistration, checkUser } from "../../../Redux/actions"

import FormTemplate from "../../../template/FormTemplate"
import { useDispatch } from "react-redux"
function Registration(props) {
    const dispatch = useDispatch()
    return (
        <FormTemplate makeNetworkCall={(data) => dispatch(userRegistration(data))} saveUserInfo={(data) => dispatch(saveUserInfo(data))}
            checkUser={(emailId) => dispatch(checkUser(emailId, 'register'))}
        />
    )
}



export default withRouter(Registration);

