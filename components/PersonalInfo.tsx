import React, { useEffect, useState } from 'react'
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


function PersonalInfo(info: any) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema("sign-in");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign up with Appwrite & create plaid token
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!
      }

      // const newUser = await signUp(userData);

      // setUser(newUser);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Personal Info:", info)
    if (info) {
      form.reset({
        firstName: info.firstName || "",
        lastName: info.lastName || "",
        address1: info.address1 || "",
        city: info.city || "",
        state: info.state || "",
        postalCode: info.postalCode || "",
        dateOfBirth: info.dateOfBirth || "",
        ssn: info.ssn || "",
        email: info.email || "",
        password: info.password || ''
      });
    }
  }, [info, form])

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/images/profile-image.webp" width={150} height={150} alt="logo" className="pb-10" />
      <Form {...form}>
        {/* <p>{JSON.stringify(form.control)}</p> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
          <>
            <div className="flex gap-4">
              <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
              <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
            </div>
              <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
              <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
            <div className="flex gap-4">
              <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
              <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
            </div>
            <div className="flex gap-4">
              <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
              <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
            </div>
          </>

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

export default PersonalInfo