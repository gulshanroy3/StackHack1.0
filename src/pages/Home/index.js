import React from 'react'
import { withRouter } from 'react-router-dom'
import Styled from "styled-components"

const Wrapper = Styled.div`
width: 100%;
padding: 24px;

.title{
    font-size: 28px;
    text-align: center;
    padding: 48px;
}
.option-wraapper{
    display: flex;
justify-content: space-evenly;
    .eventTask{
        background-color:  rgb(0, 157, 230);
        border: 1px solid  rgb(0, 157, 230);
        color: white;
        padding: 10px 24px;
        cursor: pointer;
        /* width: 50%; */
        display: block;
        border-radius: 8px;
    &:hover{
        background-color:  rgb(0, 157, 250);
        border: 1px solid  rgb(0, 157, 250);
    }
    }
}


`
function Home(props) {
    return (
        <Wrapper>
            <div className='title'>Stack Hack 1.0</div>
            <div className='option-wraapper'>
                <div className='eventTask' onClick={() => props.history.push('/event-management/login')}>Event Managemnt</div>
                <div className='eventTask' onClick={() => props.history.push('/task-management/login')} >Task Managemnt</div>
            </div>
        </Wrapper>
    )
}

export default withRouter(Home)