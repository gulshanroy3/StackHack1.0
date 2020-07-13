import axios from "axios"
export function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function common_api() {
    let token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'http://localhost:8000',
        headers: headers({ 'token': token }),
        withCredentials: false
    });
}
export function headers(customHeader) {
    const defaultHeader = {
    };
    return Object.assign({}, defaultHeader, customHeader);
}