export const makeReqestPayload = (userData) => {
    let _userData = JSON.parse(JSON.stringify(userData))
    _userData.flow = 'eventManaging'
    return _userData
}