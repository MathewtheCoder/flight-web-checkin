import { Form, Input, Button } from 'antd';
import { GlobalOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom'
import { PERSONAL_INFO } from 'constants/routes';

const CheckInForm = () => {
  const history = useHistory()
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    history.push(PERSONAL_INFO, values)
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
        >
          <SearchOutlined /> Search Flight
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CheckInForm;