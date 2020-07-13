import React, { useState, useEffect } from 'react';
import EnrollmentCounter from '../EnrollmentCounter';
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getAllUsersCount } from "../../Redux/actions"
import './index.scss';
function Banner(props) {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        props.count && dispatch(getAllUsersCount()).then(res => {
            setCount(res.count)
        }).catch(err => {
            setCount(1234)
        })
    }, [])
    const setCont = (coun) => {
        let count = coun.toString()
        return count
    }
    return (
        <div className='banner-wrapper'>
            <div className='banner-wrapper-text'>
                <div className='title'>{props.title}</div>
            </div>
            <div className='banner-wrapper-img'>
                <div className='enrollment-counter-wrapper'>
                    {props.count && <EnrollmentCounter count={count ? setCont(count) : '1234'} title={props.subTitle} />}
                </div>
            </div>
        </div >
    );
}
Banner.defaultProps = {
    title: 'Event Registration',
    subTitle: ' Registered till date'
}
export default withRouter(Banner)