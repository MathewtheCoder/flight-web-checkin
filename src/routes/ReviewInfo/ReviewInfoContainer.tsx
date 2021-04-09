import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {List, Card, Button, message} from 'antd'
import moment from 'moment'
import { CheckOutlined } from '@ant-design/icons';
import {createServer} from 'miragejs'
import { CHECKIN_SUCCESS } from 'constants/routes';
import * as API from 'constants/api'

type ReviewInfoHistoryState = {
    first_name: string;
    last_name: string;
    nationality: string;
    mobileno: string;
    email: string;
    passportNo: string;
    passportIssueDate?: any;
    passportCity?: string;
    passportCountry?: string;
    passportExpiryDate?: any;
    birth_date?: any;
    birth_place?: string;
    city?: string;
    country?: string;
    address?: string;
};
const ReviewInfoContainer = (): JSX.Element => {
    const history = useHistory<ReviewInfoHistoryState>()
    const [loading, updateLoading] = useState(false)
    // Mock Api for mock check in completion
    createServer({
        routes() {
            this.post(API.COMPLETE_CHECKIN, (_schema, request) => {
              console.log(JSON.parse(request.requestBody));
              return {message: "Checkin Complete"}
          })
        },
    })
    const dataKeys = Object.keys(history.location.state)
    const data = history.location.state
    const labelMapper = {
        first_name: "First Name",
        last_name: "Last Name",
        nationality: "Nationality",
        mobileno: "Mobile No",
        email: "Email",
        passportNo: "Passport #",
        passportIssueDate: "Passport Issuance Date",
        passportCity: "Passport Issuance city",
        passportCountry: "Passport Issuance Country",
        passportExpiryDate: "Passport Expiry Date",
        birth_date: "Date of Birth",
        birth_place: "Place of Birth",
        city: "City",
        country: "Country",
        address: "Address"
    }
    // Redirect to success page after success save
    const completeCheckin = () => {
        updateLoading(true)
        fetch(API.COMPLETE_CHECKIN, {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((json) => {
            if (json?.errors) {
                message.error('Please check your info again.')
                updateLoading(false)
            } else {
                history.replace(CHECKIN_SUCCESS)
            }
        }).catch(_err => {
            updateLoading(false)
            message.error('Please check your info again.')
        })
    }
    const dateItems = ["passportIssueDate", "passportExpiryDate", "birth_date"]
    return (
        <main className="reviewInfo">
           <div className="formWrapper">
            <h1>Please review your information.</h1>
            <List
                size="large"
                grid={{ gutter: 16, column: 1 }}
                dataSource={dataKeys.filter(key => key !== "agreement")}
                className="dataList"
                renderItem={(key: any) => (
                    <List.Item>
                        {/* @ts-ignore */}
                        <Card title={labelMapper[key]} className="dataItem">
                            {/* @ts-ignore */}
                            {dateItems.includes(key) ? moment(data[key]).format('YYYY-MM-DD') : data[key]}
                        </Card>
                    </List.Item>
                )}
            />
            <Button
                type="primary"
                htmlType="button"
                className="submitBtn"
                block
                size="large"
                onClick={completeCheckin}
                loading={loading}
                disabled={loading}
            >
                Confirm <CheckOutlined />
            </Button>
           </div>
       </main>
    )
}

export default ReviewInfoContainer