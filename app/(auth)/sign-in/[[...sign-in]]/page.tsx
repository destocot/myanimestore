import { SignIn } from '@clerk/nextjs'

const SigninPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        redirectUrl="/redirect"
        // appearance={{
        //   elements: {
        //     footer: 'hidden',
        //   },
        // }}
      />
    </div>
  )
}
export default SigninPage
