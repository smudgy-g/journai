import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignUp afterSignUpUrl={'/new-user'} redirectUrl={'/new-user'}/>
    </div>
  )
}

export default SignUpPage