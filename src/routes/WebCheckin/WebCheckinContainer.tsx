import React from 'react'
import CheckInForm from './components/CheckInForm'

const WebCheckinContainer = () => {
    return (
       <main className="webcheckin">
           <div className="formWrapper">
            <h1>Welcome to your web check-in</h1>
            <CheckInForm />
           </div>
       </main>
    )
}

export default WebCheckinContainer
