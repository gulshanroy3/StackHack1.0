import React from 'react'
import Banner from "../components/Banner"
export default function TaskManagementLayout({ children }) {
    return (
        <div style={{ display: 'flex', height: '-webkit-fill-available' }} >
            <div style={{ width: '50%' }}>
                <Banner subTitle='Task Created  till date' title='Task Creation' />
            </div>
            <div style={{ width: '50%' }}>
                {children}
            </div>
        </div>
    )
}
