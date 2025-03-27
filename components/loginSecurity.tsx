import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import CustomInput from '@/components/CustomInput'
import { Button } from "@/components/ui/button"
import type { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import { signIn, signUp } from '@/lib/actions/user.actions'


function LoginSecurity({ type, isActiveSession }: { type: string, isActiveSession?: boolean }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true);
  
      try {
        // Sign up with Appwrite & create plaid token
  
        if (type === 'sign-up') {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password
          }
  
          const newUser = await signUp(userData);
  
          setUser(newUser);
        }
  
        if (type === 'sign-in') {
          const response = await signIn({
            email: data.email,
            password: data.password,
          })
  
          // if (response) router.push('/')
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/images/profile-image.webp" width={150} height={150} alt="logo" className="pb-10" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">

          <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

          <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className="form-btn">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                </>
              ) : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginSecurity