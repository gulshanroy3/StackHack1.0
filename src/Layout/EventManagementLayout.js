import React from 'react'
import Banner from "../components/Banner"
export default function EventManagementLayout({ children }) {
    return (
        <div style={{ display: 'flex', height: '-webkit-fill-available' }} >
            <div style={{ width: '50%' }}>
                <Banner count={true} />
            </div>
            <div style={{ width: '50%' }}>
                {children}
            </div>
        </div>
    )
}
