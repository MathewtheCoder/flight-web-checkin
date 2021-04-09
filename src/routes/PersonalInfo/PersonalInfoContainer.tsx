import React from 'react'
import PersonalInfoForm from './components/PersonalInfoForm'
import {useHistory} from 'react-router-dom'

type PersonalInfoState = {
    last_name: string;
    flight_no: string;
};
const PersonalInfoContainer = () => {
    const history = useHistory<PersonalInfoState>()
    return (
        <main className="webcheckin">
           <div className="formWrapper">
            <h1>Hi, {history?.location?.state?.last_name}!</h1>
            <PersonalInfoForm />
           </div>
       </main>
    )
}

export default PersonalInfoContainer