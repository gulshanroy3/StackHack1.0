import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import Button from "../../../components/Button"
import { getEventUser, addtask, getAllTask, deleteTask, updateTask } from "../../../Redux/actions"
import Modal from "../../../components/Modal"
import Calendar from 'react-calendar';
import Input from '../../../components/Input'
import DropDown from "../../../components/DropDown"
import 'react-calendar/dist/Calendar.css';
import Styled from "styled-components"
import { getImagePath } from '../../../util/common';
import "./index.scss"
var allTask = []
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
function UserDashboard(props) {
    const userInfo = useSelector(state => state.userInfo)
    const [userTaskDetails, setuserTaskDetails] = useState([])
    const [userStatus, setUserStatus] = useState(false)
    const [addTaskModal, setStatusOFAddTaskModal] = useState(false)
    const [addTaskDetails, setAddTaskDetails] = useState({})
    const [openDate, setOpenDate] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        getAllTask1()
    }, [])

    const getAllTask1 = () => {
        dispatch(getAllTask(userInfo._id)).then(res => {
            console.log(res)
            allTask = res.tasks
            setUserStatus(true)
            setuserTaskDetails(res.tasks)

        }).catch(err => {
            console.log(err)
        })
    }
    const deleteTask1 = (taskId) => {
        dispatch(deleteTask(userInfo._id, taskId)).then(res => {
            getAllTask1()
        }).catch(err => {
            console.log(err)
        })
    }
    const updateTask1 = (taskId, updatedStatus) => {
        dispatch(updateTask(userInfo._id, taskId, updatedStatus)).then(res => {
            getAllTask1()
        }).catch(err => {
            console.log(err)
        })
    }
    const showUser = (tasks) => {
        return (
            <table>
                <thead>
                    <tr className='table-heading'>
                        <td className='td-name'> Name</td>
                        <td className='td-no-payment'>Label</td>
                        <td className='td-description'>Due Date</td>
                        <td className='td-features'>Status</td>
                        <td className='td-features'>Change Status</td>
                        <td className='td-features'>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((eachUser, index) => (
                        <tr className={`payment-row`}>
                            <td className='payment-row-value'>{eachUser.name}</td>
                            <td className='payment-row-value'>{eachUser.label}</td>
                            <td className='payment-row-value' >{eachUser.date}</td>
                            <td className='payment-row-value'>{eachUser.status}</td>
                            <td className='payment-row-value'>
                                <div>  Change task status</div>
                                <select className='task-selectetion' value={eachUser.status} onChange={(e) => { updateTask1(eachUser.id, e.target.value) }}>
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>

                            </td>
                            <td className='payment-row-value'><img className='delete-icon' style={{ cursor: 'pointer' }} onClick={() => deleteTask1(eachUser.id)} src={getImagePath("/delete.svg")} /></td>
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
    const saveAddTaskInfo = (value, name) => {
        console.log(value)
        let _addTaskDetails = JSON.parse(JSON.stringify(addTaskDetails))
        if (value === '') {
            delete _addTaskDetails[name]
        }
        else {
            _addTaskDetails[name] = value
            if (name === 'date') {
                setOpenDate(false)
            }
        }
        setAddTaskDetails(_addTaskDetails)
    }
    const convert = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    const getButtonStatus = () => {
        if (loader) {
            return false
        }
        else if (Object.keys(addTaskDetails).length !== 3) {
            return false
        }
        return true
    }
    const onSubmit = () => {
        //
        //addtask
        let _addTaskDetails = JSON.parse(JSON.stringify(addTaskDetails))
        setLoader(true)
        _addTaskDetails.status = 'New'
        _addTaskDetails.id = Math.floor(100000 + Math.random() * 900000)
        dispatch(addtask(_addTaskDetails, userInfo._id)).then(res => {
            setLoader(false)
            setStatusOFAddTaskModal(false)
            getAllTask1()
            setAddTaskDetails({})
        }).catch(err => {
            setLoader(false)
        })
    }
    const seachtask = (input) => {
        console.log(allTask)
        let searchResult = [];
        var pattern = input
            .toLowerCase()
            .split('')
            .map(x => {
                return `(?=.*${x})`;
            })
            .join('');
        var regex = new RegExp(`${pattern}`, 'g');
        for (let i = 0; i < allTask.length; i++) {
            if (regex.test(allTask[i].name.toLowerCase())) {
                searchResult.push(allTask[i]);
            }
        }
        setuserTaskDetails(searchResult)
    }
    return (
        <div>
            <div className='header-wrapper'>
                <div className='title'>Welcome {userInfo.name}</div>
                {
                    allTask.length > 0 && <Input placeholder='search by name' insertedData={(e) => seachtask(e.target.value)} />
                }
                <div className='logout' onClick={() => logout()}>
                    logout
            </div>
            </div>
            <div className='button-wrapper'>
                <div className='eventTask' onClick={() => setStatusOFAddTaskModal(true)}>
                    Add Task
            </div>
            </div>
            {
                userTaskDetails.length > 0 ? showUser(userTaskDetails) : <div className='no-user-found'>No Task found</div>
            }
            {addTaskModal && <Modal>

                <div class='modal-wrapper'>
                    <div className='title'>Add task</div>
                    <div className='form-wrapper'>
                        <div className='each-field'>
                            <TextLabel>Task Name*</TextLabel>
                            <Input insertedData={(e) => saveAddTaskInfo(e.target.value, "name")} />
                        </div>
                        {openDate &&
                            <div className='calender-wrapper'>
                                <Calendar className='calender'
                                    onChange={(v) => saveAddTaskInfo(convert(v), "date")}
                                />
                            </div>
                        }
                        <div className='each-field'>

                            <TextLabel>Enter Due Date*</TextLabel>
                            <div onClick={() => setOpenDate(!openDate)} className='date-collector'>{addTaskDetails.date}</div>

                        </div>
                        <div className='each-field'>
                            <TextLabel>Set Labels *</TextLabel>
                            <DropDown options={options}
                                onChange={(data) => saveAddTaskInfo(data[0].value, 'label')}
                                selectedFieldsStyle={{
                                    width: '270px',
                                    height: '34px',
                                    color: '#fff'
                                }}
                                placeholder='Select label'
                            />
                        </div>

                    </div>
                    <div className='button-wrapper'>
                        <Button class='cancel-button' textColor={'#black'}
                            backgroundColor={'#fff'} onClick={() => setStatusOFAddTaskModal(false)}
                            isDisable={loader}>Cancel</Button>
                        <Button class='save-button' textColor={'#ffffff'}
                            backgroundColor={'#009de6'} onClick={onSubmit}
                            isDisable={!getButtonStatus()}> Save</Button>
                    </div>
                </div>
            </Modal>}
        </div>
    );

}
const options = [
    { id: 0, "label": "Personal", "value": "Personal" },
    { id: 1, "label": "Work", "value": "Work" },
    { id: 2, "label": "Shopping", "value": "Shopping" },
    { id: 3, "label": "Others", "value": "Others" }
]
export default UserDashboard;