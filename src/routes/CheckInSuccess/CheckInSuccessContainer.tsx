import React from 'react'
import {Button} from 'antd'
import {CheckCircleFilled, RollbackOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { ROOT_URL } from 'constants/routes'

const CheckInSuccessContainer = () => {
    const history = useHistory()
    const navigateToCheckIn = () => history.push(ROOT_URL)
    return (
        <main className="checkinsuccess">
            <div className="wrapper">
                <CheckCircleFilled className="check"/>
                <h1>You've been checked in!</h1>
                <p>Enjoy your flight!</p>
                <Button
                    type="primary"
                    htmlType="button"
                    className="actionBtn"
                    block
                    size="large"
                    onClick={navigateToCheckIn}
                >
                    CheckIn for another flight <RollbackOutlined />
                </Button>
            </div>
        </main>
    )
}

export default CheckInSuccessContainer