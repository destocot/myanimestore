import { SignUp } from '@clerk/nextjs'

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp redirectUrl="/redirect" />
    </div>
  )
}
export default SignupPage
