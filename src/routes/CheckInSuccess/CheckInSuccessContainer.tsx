import React from 'react'
import {CheckCircleFilled} from '@ant-design/icons'
const CheckInSuccessContainer = () => {
    return (
        <main className="checkinsuccess">
            <div className="wrapper">
                <CheckCircleFilled />
                <h1>You've been checked in!</h1>
                <p>Enjoy your flight!</p>
            </div>
        </main>
    )
}

export default CheckInSuccessContainer