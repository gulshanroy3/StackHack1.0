import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import Button from "../../../components/Button"
import { getEventUser } from "../../../Redux/actions"
import "./index.scss"
function AdminDashboard(props) {
    const userInfo = useSelector(state => state.userInfo)
    const [userDetails, setUserDetails] = useState([])
    const [userStatus, setUserStatus] = useState(false)
    const dispatch = useDispatch()
    console.log(userInfo)
    const getUserDetails = () => {
        dispatch(getEventUser()).then(res => {
            console.log(res)
            setUserStatus(true)
            setUserDetails(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const showUser = () => {
        return (
            <table>
                <thead>
                    <tr className='table-heading'>
                        <td className='td-name'> Name</td>
                        <td className='td-no-payment'>Email</td>
                        <td className='td-description'>Mobile</td>
                        <td className='td-features'>Registration Type</td>
                        <td className='td-features'>Tickets</td>
                        <td className='td-features'>Id card</td>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((eachUser, index) => (
                        <tr className={`payment-row`}>
                            <td className='payment-row-value'>{eachUser.name}</td>
                            <td className='payment-row-value'> {eachUser.email}</td>
                            <td className='payment-row-value'> {eachUser.mobile}</td>
                            <td className='payment-row-value'>{eachUser.regType}</td>
                            <td className='payment-row-value'>{eachUser.tickets}</td>
                            <td className='payment-row-value'>
                                <img src={eachUser.avatar} alt='' style={{ hei: '60px', width: '60px' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = "/login"
    }
    return (
        <div>
            <div className='header-wrapper'>
                <div className='title'>Welcome {userInfo.name}</div>
                <div className='logout' onClick={() => logout()}>
                    logout
            </div>
            </div>
            <div className='button-wrapper'>
                <div className='eventTask' onClick={() => getUserDetails()}>
                    View Registered Candidate
            </div>
            </div>
            {
                userStatus ? userDetails.length > 0 ? showUser() : <div className='no-user-found'>No user Found</div> : null
            }
        </div>
    );

}

export default AdminDashboard;