import AuthForm from '@/components/AuthForm'
import { redirect } from "next/navigation";

import { isSessionActive } from '@/lib/actions/user.actions';

const SignIn = async () => {
  const isActiveSession = await isSessionActive();

  if (isActiveSession) redirect('/');

  return (
      <section className="flex-center size-full max-sm:px-6">
        <AuthForm type="sign-in" />
      </section>
  )
}

export default SignIn