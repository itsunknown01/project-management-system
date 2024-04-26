import RegisterForm from '@/components/forms/register-form'
import AuthWrapper from '@/components/wrapper/auth-wrapper'
import React from 'react'

const Register = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-zinc-200'>
      <AuthWrapper
      heading='Project Management System'
      description='Register'
      backButtonLink='/login'
      backButtonTitle='Already have an account'
      >
        <RegisterForm />
      </AuthWrapper>
    </div>
  )
}

export default Register
