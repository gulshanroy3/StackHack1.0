import { USER_INFO, NOTIFICATION } from "../actionTypes";
import { common_api } from "./apiUrl"
import { cancelExecutor } from "../../util/common"
let cancel
export function saveUserInfo(data) {
    console.log(data)
    return dispatch => {
        dispatch({
            type: USER_INFO,
            payload: data
        })
    }

}
export function removeNotification() {
    return dispatch => {
        dispatch({
            type: NOTIFICATION,
            payload: {}
        })
    }
}
export function checkUser(id, flow = 'login') {
    let url = `/checkUser?email=${id}&flow=${flow}`
    cancel && cancel({ cancel: true });
    let config = cancelExecutor(cancelToken => (cancel = cancelToken));
    return dispatch => {
        let userLogin = common_api().get(url).then(res => {
            return Promise.resolve(res.data)
        }).catch(err => {
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}
export function getEventUser() {
    let url = '/getAllUsers'
    return dispatch => {
        let getUser = common_api().get(url).then(res => {
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            if (err.response.status === 400) {

                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {

                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(getUser)
    }
}
export function userRegistration(data) {
    let url = '/register'
    return dispatch => {
        let userRegistration = common_api().post(url, data).then(res => {
            dispatch({
                type: NOTIFICATION,
                payload: { msg: 'User Registered Succesfully', type: 'success' }
            })
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            if (error.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userRegistration)
    }
}

//userLogin

export function userLogin(data) {
    let url = '/login'
    return dispatch => {
        let userLogin = common_api().post(url, data).then(res => {
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}
export function addtask(data, id) {
    let url = `/addtask?id=${id}`
    return dispatch => {
        let userLogin = common_api().post(url, data).then(res => {
            dispatch({
                type: NOTIFICATION,
                payload: { msg: 'Task added succesfully', type: 'success' }
            })
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}
export function deleteTask(id, taskId) {
    let url = `/deleteTask?id=${id}&taskId=${taskId}`
    return dispatch => {
        let userLogin = common_api().delete(url).then(res => {
            dispatch({
                type: NOTIFICATION,
                payload: { msg: 'Task deleted succesfully', type: 'success' }
            })
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}
export function updateTask(id, taskId, updatedStatus) {
    let url = `/updateTask?id=${id}&taskId=${taskId}&updatedStatus=${updatedStatus}`
    return dispatch => {
        let userLogin = common_api().put(url).then(res => {
            dispatch({
                type: NOTIFICATION,
                payload: { msg: 'Task updated succesfully', type: 'success' }
            })
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}

export function getAllTask(id) {
    let url = `/getAllTask?id=${id}`
    return dispatch => {
        let userLogin = common_api().get(url).then(res => {
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            console.log(error, err)
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}
export function authentication() {
    let url = '/authenticate'
    return dispatch => {
        let userLogin = common_api().get(url).then(res => {
            dispatch(saveUserInfo(res.data.userInfo))
            return Promise.resolve(res.data)
        }).catch(err => {
            let error = (err.response && err.response.data) || {}
            if (err.response.status === 400) {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: error.message, type: 'error' }
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    payload: { msg: 'something went wrong', type: 'error' }
                })
            }
            return Promise.reject(err)
        })

        return Promise.resolve(userLogin)
    }
}

export function getAllUsersCount() {
    let url = '/getAllUsersCount'
    return dispatch => {
        let getAllUsersCount = common_api().get(url).then(res => {
            dispatch(saveUserInfo(res.data.userInfo))
            return Promise.resolve(res.data)
        }).catch(err => {
            return Promise.reject(err)
        })

        return Promise.resolve(getAllUsersCount)
    }
}