
import axios from 'axios';
let cancel
export function getImagePath(relativePath) {
    // return require(`../../../assets/images${relativePath}`);
    // if (process.env.NODE_ENV === 'development') {
    return require(`../assets${relativePath}`);
    // }
    // return `${process.env.REACT_APP_CDN_IMG_BASEPATH}${relativePath}`;
}



export function cancelExecutor(callBack, timeout = 4000) {
    let CancelToken = axios.CancelToken;
    const config = {
        timeout: { timeout },
        cancelToken: new CancelToken(function executor(c) {
            callBack && callBack(c);
        })
    };

    return config;
}

export function cancelApiRequest() {
    //console.log(cancel)
    cancel && cancel({ cancel: true });
    cancelExecutor(cancelToken => (cancel = cancelToken));
}