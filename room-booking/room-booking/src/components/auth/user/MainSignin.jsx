import React from 'react'
import GoogleSignIn from './GoogleSignIn'
import PhoneNumberSignIn from './PhoneNumberSignIn'

export const MainSignin = () => {
  return (
    <div>
        <PhoneNumberSignIn/>
        <GoogleSignIn/>
        
    </div>
  )
}
export default MainSignin