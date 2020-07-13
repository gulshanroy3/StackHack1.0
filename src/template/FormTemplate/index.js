import React, { Component } from 'react';
import Input from "../../components/Input"
import AvatarUpload from "../../components/AvatarUpload"
import { registrationTemplate } from "./template"
import Styled from "styled-components"
import "./index.scss"
import { VALIDATION_PATTERN } from "../../util/validation"
import DropDown from "../../components/DropDown"
import Button from '../../components/Button';
import { withRouter } from "react-router-dom"
import { makeReqestPayload } from './util'
import { cancelApiRequest } from "../../util/common"
const TextLabel = Styled.div`
	white-space: normal;
    color: #949494;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    -webkit-user-select: none;
    user-select: none;
    text-align: left;
    margin-bottom: 4.06px;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 256px;
`;
const Cardwrapper = Styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
z-index: 30;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
background-color: #00000073;
.db-modal-wrapper {
    overflow: auto;
    position: relative;
    // margin-top: 10%;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    width: 50%;
    height: 30%;
    .modal-main-block {
        height: 100%;
        padding:24px;
    }
    .modal-close-block {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        margin-right: 15px;
    }
}
`;
class FormTemplate extends Component {

    state = {
        userData: {},
        loader: false,
        openCard: {},
        errorCollection: {}
    }

    saveUserValue = (element, value) => {
        // console.log(element, value)
        const _userData = JSON.parse(JSON.stringify(this.state.userData))
        if (value === '') {
            delete _userData[element.name]
        }
        else {
            _userData[element.name] = value
            if (element.name === 'regType' && value === 'self') {
                _userData.tickets = 1
            }
        }
        // this.setState({
        //     userData: _userData
        // })
        this.getErrorMessageforInput(element.type, element.name, _userData)
    }
    async getErrorMessageforInput(type, key, userData) {
        let _error = JSON.parse(JSON.stringify(this.state.errorCollection))
        if (userData.hasOwnProperty(key)) {
            let insertedData = userData[key];
            if (insertedData && insertedData.length > 0) {
                if (type.toUpperCase() === 'EMAIL') {
                    cancelApiRequest()
                    if (!insertedData.match(VALIDATION_PATTERN.email)) {
                        _error[key] = { status: true, errorMessage: 'Invalid Email' }
                    }
                    else {
                        try {
                            let res = await this.props.checkUser(insertedData)
                            console.log(res)

                            _error[key] = {
                                status: res.success,
                                errorMessage: res.message
                            };
                        } catch (error) {
                            console.log(error, error.response, error.message)
                            if (error.message && error.message.cancel) {
                                _error[key] = {
                                    status: false,
                                    errorMessage: ''
                                };
                            }
                            else {
                                _error[key] = {
                                    status: true,
                                    errorMessage: 'This Email id already registered'
                                }
                            }

                        }
                    }
                } else if (type.toUpperCase() === 'NUMBER' && key.toUpperCase() === 'MOBILE') {
                    if (insertedData.length === 10) {
                        if (!insertedData.match(VALIDATION_PATTERN.mobile)) {
                            _error[key] = {
                                status: true,
                                errorMessage: 'Number should be less than 14 digit and greater than 10 digit'
                            };
                        }
                        else {
                            _error[key] = { status: false, errorMessage: '' }
                        }
                    } else {
                        _error[key] = { status: true, errorMessage: 'Invalid Mobile Number ' }
                    }
                }
                else if (key === 'tickets') {
                    if (parseInt(insertedData) < 1) {
                        _error[key] = { status: true, errorMessage: 'Invalid Number of Tickets' }
                    }
                    else {
                        _error[key] = { status: false, errorMessage: '' }
                    }
                }
                else if (type.toUpperCase() === 'PASSWORD') {
                    if (!insertedData.match(VALIDATION_PATTERN.password)) {
                        _error[key] = {
                            status: true,
                            errorMessage: 'Password should be minimun 8 character'
                        };
                    }
                    else {
                        _error[key] = { status: false, errorMessage: '' }
                    }
                }
            }
            else {
                delete _error[key]
            }
        }
        else {
            delete _error[key]
        }
        this.setState({
            userData: userData,
            errorCollection: _error
        })
    }
    onSubmit = () => {
        console.log(this.state.userData)
        let requestpayload = this.props.makeReqestPayload(JSON.parse(JSON.stringify(this.state.userData)))
        console.log(requestpayload)
        this.props.makeNetworkCall(requestpayload).then(res => {
            console.log(res)
            const { success, userInfo } = res
            if (success) {
                res.token && localStorage.setItem('token', res.token)
                this.renderOnSucces(userInfo)
            }
            else {
                //do something

            }
            this.setState({
                loader: false
            })
        }).catch(err => {
            this.setState({
                loader: false
            })
        })

    }
    renderOnSucces = (userInfo) => {
        console.log(userInfo)
        const { flow, action, id } = userInfo
        if (flow === 'eventManaging') {
            if (action === 'register') {
                this.setState({
                    openCard: { id: id, flow: flow }
                })
            }
            else {
                this.props.saveUserInfo(userInfo)
                this.props.history.push("/event-management/admin-dashboard")
            }
        }
        else {
            if (action === 'register') {
                this.setState({
                    openCard: { id: id, flow: flow }
                })
                //taskManaging
            }
            else {
                this.props.saveUserInfo(userInfo)
                this.props.history.push("/task-management/user-dashboard")
            }


        }
    }
    renderTemplate = (element) => {
        let req = (
            <TextLabel>
                {element.label}
                {element.required ? '*' : null}
            </TextLabel>
        );
        // let error = this.getErrorMessageforInput(element.type, element.name)
        let error = this.state.errorCollection[element.name] || { status: false, errorMessage: '' }
        if (element.uIElement === 'input') {
            if (element.type === 'file') {
                return (
                    <>
                        {req}
                        <AvatarUpload
                            buttonWrapperStyle={{ marginTop: '44px' }}
                            handleImageUpload={file => this.saveUserValue(element, file)}
                        />
                    </>
                )
            }
            else {
                return (
                    <>
                        {req}
                        <Input
                            inputData={{ label: element.label, value: element.defaultValue, mandatory: element.required }}
                            type={element.type}
                            insertedData={e =>
                                this.saveUserValue(element, e.target.value)
                            }
                            disable={this.state.userData && this.state.userData.regType === 'self' && element.name === 'tickets'}
                            insertedValue={this.state.userData[element.name]}
                            error={error.status}
                            errorMessage={error.errorMessage}
                            min={element.min}
                        />
                    </>
                )
            }
        }
        else if (element.uIElement === 'select') {
            return (
                <>
                    {req}
                    <DropDown options={element.fieldOptions}
                        onChange={(data) => this.saveUserValue(element, data[0].value)}
                        selectedFieldsStyle={{
                            width: '270px',
                            height: '34px',
                            color: '#fff'
                        }}
                    />
                </>
            )
        }
    }
    getButtonStatus = () => {
        const { userData, loader, errorCollection } = this.state
        const { template } = this.props
        if (loader) {
            return false
        }
        else {
            if (Object.keys(userData).length === template.length) {
                let len = template.length
                for (let i = 0; i < len; i++) {
                    let error = errorCollection[template[i].name] || { status: false, errorMessage: '' }
                    // let error = this.getErrorMessageforInput(template[i].type, template[i].name)
                    if (error.status) {
                        return false
                    }
                }
                return true
            }
        }
        return false
    }
    toLogin = () => {
        const { openCard, userData } = this.state
        const { email, password } = userData
        if (openCard.flow === 'taskManaging') {
            this.props.login({ email, password, flow: 'taskManaging' }).then(res => {
                res.token && localStorage.setItem('token', res.token)
                this.props.authentication().then(res => {
                    this.props.history.push("/task-management/user-dashboard")
                }).catch(err => {
                    this.props.history.push("/task-management/login")
                })
            }).catch(err => {
                this.props.history.push("/task-management/login")
            })
        }
        else {
            this.props.history.push("/event-management/login")
        }
        this.setState({
            openCard: {},
        })
    }
    render() {
        const { template, title, info, route, linkText, buttonText } = this.props
        const { openCard } = this.state
        return (
            <div className='registration-page-wrapper'>
                <div>
                    <div className='login-text'>{info}<span className='login' onClick={() => this.props.history.push(route)} >{linkText}</span></div>
                    <div className='registration-page-wrapper'>
                        <div className='title'>{title}</div>
                        <div className='registrationForm-wrapper'>
                            {template.map(eachField => {
                                return (
                                    <div style={{
                                        margin: '12px'
                                    }}> {
                                            this.renderTemplate(eachField)
                                        }</div>
                                )
                            })}
                        </div>
                        <div className='btn-wrapper'>
                            <div className='login-btn-wrapper'>
                                <Button
                                    textColor={'#ffffff'}
                                    backgroundColor={'#009de6'}
                                    class={'login-button'}
                                    onClick={this.onSubmit}
                                    isDisable={!this.getButtonStatus()}
                                >
                                    <span className='login-button-text'>{buttonText}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div >
                {openCard.id && <CongratulationCard id={openCard.id} toLogin={() => this.toLogin()} />}
            </div>
        );
    }
}

FormTemplate.defaultProps = {
    template: registrationTemplate,
    title: 'Registration Form',
    route: '/event-management/login',
    info: 'Are you already registere,try ',
    linkText: 'login',
    buttonText: 'Register',
    makeReqestPayload: makeReqestPayload,
    makeNetworkCall: () => {
        return (
            new Promise((resolve, reject) => {
                return resolve('succes')
            })
        )
    },
    saveUserInfo: () => {
        return (
            new Promise((resolve, reject) => {
                return resolve('succes')
            })
        )
    },
    login: () => {
        return (
            new Promise((resolve, reject) => {
                return resolve('succes')
            })
        )
    },
    checkUser: () => {
        return (
            new Promise((resolve, reject) => {
                return resolve('succes')
            })
        )
    }
}
export default withRouter(FormTemplate);

function CongratulationCard({ id, toLogin }) {

    return (
        <Cardwrapper className='db-modal-wrapper'>
            <div className='db-modal-wrapper '>
                <div className='modal-main-block'>
                    <div className='cong-text'>You have been register successfully</div>
                    <div className='cong-text'> Please note your event ID-{id}</div>
                    <div className='registration-btn-wrapper'>
                        <div className='login-btn-wrapper'>
                            <Button onClick={toLogin} textColor={'#ffffff'}
                                backgroundColor={'#009de6'}
                                class={'register-button'}>
                                Go to Home
                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Cardwrapper>
    )
}