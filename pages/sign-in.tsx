import * as React from 'react'
import SignIn from '../src/signIn'
import {signIn} from '../src/auth'

const Auth = () => {
  return (
    <SignIn signIn={signIn}/>
  )
}

export default Auth