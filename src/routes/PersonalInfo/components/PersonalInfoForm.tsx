import React from 'react'
import { Form, Input, Button, Select, Checkbox, DatePicker } from 'antd';
import {
    UserOutlined,
    ArrowRightOutlined,
    MailOutlined,
    PhoneOutlined,
    ReadOutlined,
    HomeOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import { REVIEW_INFO } from 'constants/routes';
import countries from './countries'

const { Option } = Select

type PersonalInfoState = {
    last_name: string;
    flight_no: string;
};
const PersonalInfoForm = () => {
  const [countryCode, setCountryCode] = React.useState<any>();
  const [form] = Form.useForm();
  const history = useHistory<PersonalInfoState>()
  // Transform moment date object to strings
  const transformDateToString = (items: any) => {
    const dateItems = ["passportIssueDate", "passportExpiryDate", "birth_date"]
    Object.keys(items).forEach(itemKey => {
      if (dateItems.includes(itemKey)) {
        items[itemKey] = items[itemKey]?.toString()
      }
    })
    return items
  }
  const onFinish = (values: any) => {
    console.log('Received values of form: ', transformDateToString(values));
    history.push(REVIEW_INFO, transformDateToString(values))
  };
  /**
   * Define the nationality based form filters
   * @param countryCode 
   * @param name 
   * @returns {Boolean}
   */
  const isVisible = (countryCode:string, name: string):boolean => {
      const rules = {
          "AT": ["country", "city", "passportExpiryDate"],
          "BE": ["birth_date", "country", "city", "address"],
          "FR": ["birth_date", "birth_place", "country", "city"],
          "GR": ["passportExpiryDate", "passportIssueDate", "passportCountry", "passportCity"],
          "ES": ["address"],
      }
      // @ts-ignore
      return rules[countryCode]?.includes(name) ?? false
  }

  return (
    <Form
      form={form}
      name="web_checkin"
      className="checkin_form"
      onFinish={onFinish}
      initialValues={{last_name: history?.location?.state?.last_name}}
    >
      <Form.Item
        name="first_name"
        rules={[{ required: true, message: 'Please enter your full name!' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="First Name"
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
      <Form.Item
        name="nationality"
        rules={[{ required: true, message: 'Please select your nationality' }]}
      >
        <Select
            showSearch
            placeholder="Select Your nationality"
            optionFilterProp="children"
            filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(nationality) => {
                form.setFieldsValue({nationality})
                setCountryCode(nationality)
            }}
            size="large"
        >
            {countries.map(country => (
                <Option value={country.value}>{country.text}</Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="mobileno"
        rules={[{ required: true, message: 'Please enter your mobile no!' }]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Mobile No"
          size="large"
          type="tel"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please enter your email address!' }]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          size="large"
          type="email"
        />
      </Form.Item>
      <Form.Item
        name="passportNo"
        rules={[{ required: true, message: 'Please enter your passport no!' }]}
      >
        <Input
          prefix={<ReadOutlined />}
          placeholder="Passport #"
          size="large"
        />
      </Form.Item>
      {/* Dynamic Elements based on Nationality */}
      {isVisible(countryCode, "passportIssueDate") && (
          <Form.Item
            name="passportIssueDate"
            rules={[{ required: true, message: 'Please enter your passport issue date!' }]}
          >
            <DatePicker
                style={{width: '100%'}}
                format="YYYY-MM-DD"
                size="large"
                placeholder="Passport Issue Date"
                disabledDate={d => d && d.isSameOrAfter(moment())}
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "passportCity") && (
          <Form.Item
            name="city"
            rules={[{ required: true, message: 'Please enter your city of passport issuance!' }]}
          >
            <Input
                prefix={<HomeOutlined />}
                placeholder="Passport Issue City"
                size="large"
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "passportCountry") && (
          <Form.Item
            name="country"
            rules={[{ required: true, message: 'Please enter your country of passport issuance!' }]}
          >
            <Input
                prefix={<HomeOutlined />}
                placeholder="Passport Issue Country"
                size="large"
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "passportExpiryDate") && (
          <Form.Item
            name="passportExpiryDate"
            rules={[{ required: true, message: 'Please enter your passport expiry date!' }]}
          >
            <DatePicker
                style={{width: '100%'}}
                format="YYYY-MM-DD"
                size="large"
                placeholder="Passport Expiry Date"
                disabledDate={d => d && d.isSameOrBefore(moment())}
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "birth_date") && (
          <Form.Item
            name="birth_date"
            rules={[{ required: true, message: 'Please enter your DOB!' }]}
          >
            <DatePicker
                style={{width: '100%'}}
                format="YYYY-MM-DD"
                size="large"
                placeholder="Date of Birth"
                disabledDate={d => d && d.isSameOrAfter(moment())}
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "birth_place") && (
          <Form.Item
            name="birth_place"
            rules={[{ required: true, message: 'Please enter your place of birth!' }]}
          >
            <Input
                prefix={<HomeOutlined />}
                placeholder="Place of birth"
                size="large"
            />
          </Form.Item>
      )}
      {["ES", "AT", "BE", "FR"].includes(countryCode) && <h3>Residence</h3>}
      {isVisible(countryCode, "city") && (
          <Form.Item
            name="city"
            rules={[{ required: true, message: 'Please enter your city!' }]}
          >
            <Input
                prefix={<HomeOutlined />}
                placeholder="City"
                size="large"
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "country") && (
          <Form.Item
            name="country"
            rules={[{ required: true, message: 'Please enter your country!' }]}
          >
            <Input
                prefix={<HomeOutlined />}
                placeholder="Country"
                size="large"
            />
          </Form.Item>
      )}
      {isVisible(countryCode, "address") && (
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please enter your address!' }]}
          >
            <Input
                prefix={<HomeOutlined />}
                placeholder="Address"
                size="large"
            />
          </Form.Item>
      )}
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="#">terms and conditions</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="submitBtn"
          block
          size="large"
        >
          Continue <ArrowRightOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalInfoForm;