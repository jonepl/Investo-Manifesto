import AuthForm from '@/components/AuthForm'
import { redirect } from "next/navigation";

import { isSessionActive } from '@/lib/actions/user.actions';

const SignUp = async () => {
  const isActiveSession = await isSessionActive();

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" isActiveSession={isActiveSession} />
    </section>
  )
}

export default SignUp