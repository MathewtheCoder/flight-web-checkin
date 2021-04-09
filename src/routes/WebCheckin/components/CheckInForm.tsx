import {useState} from 'react'
import { Form, Input, Button, message } from 'antd';
import { GlobalOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom'
import {createServer, Response} from 'miragejs'
import { PERSONAL_INFO } from 'constants/routes';
import * as API from 'constants/api'

const CheckInForm = () => {
  const history = useHistory()
  const [loading, updateLoading] = useState(false)
  // Mock api
  createServer({
    routes() {
        this.post(API.CHECK_FLIGHT, (_schema, request) => {
          const {flight_no, last_name} = JSON.parse(request.requestBody);
          const flightDetails = [
          { id: "1", name: "Luke", flightNo: "ABC123" },
          { id: "2", name: "Leia", flightNo: "XYZ56" },
          { id: "3", name: "Anakin", flightNo: "TY123" },
          ]
          const isFound = flightDetails.filter(
            data => data.name === last_name && data.flightNo === flight_no
          ).length
          if (!isFound) {
            return new Response(400, {}, { errors: [ 'Record not found'] });
          }
          return {message: "Record found"}
      }
      )
    },
  })
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    updateLoading(true)
    fetch(API.CHECK_FLIGHT, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.errors) {
          message.error('Please check your info again.')
          updateLoading(false)
        } else {
          history.push(PERSONAL_INFO, values)
        }
      }).catch(_err => {
        updateLoading(false)
        message.error('Please check your info again.')
      })
  };
  return (
    <Form
      name="web_checkin"
      className="checkin_form"
      onFinish={onFinish}
    >
      <Form.Item
        name="flight_no"
        rules={[{ required: true, message: 'Please enter your Flight No!' }]}
      >
        <Input
          prefix={<GlobalOutlined />}
          placeholder="Flight #"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="last_name"
        rules={[{ required: true, message: 'Please enter your last name!' }]}
      >
        <Input
          prefix={<UserOutlined />}
          type="text"
          placeholder="Last Name"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="submitBtn"
          block
          size="large"
          loading={loading}
          disabled={loading}
        >
          <SearchOutlined /> Search Flight
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CheckInForm;