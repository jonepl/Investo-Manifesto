'use client';

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import HeaderBox from '@/components/HeaderBox'
import { authFormSchema } from '@/lib/utils'
import type { z } from 'zod'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import PersonalInfo from '@/components/PersonalInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginSecurity from '@/components/loginSecurity';


function page({ type, isActiveSession }: { type: string, isActiveSession?: boolean }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const loggedInUser = await getLoggedInUser();
      console.log(loggedInUser);
      setUser(loggedInUser);
    }

    fetchUser();
  }, [])

  const router = useRouter();
  // const [user, setUser] = useState(null);
  

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
    <section className="settings">
      <HeaderBox 
        title="Settings" 
        subtext='Modify your account settings here'
      />

      <Tabs defaultValue="account" className="w-full">
      <TabsList className="recent-transactions-tablist">
        <TabsTrigger value="account">Personal Info</TabsTrigger>
        <TabsTrigger value="password">Login & Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <PersonalInfo info={user} />
      </TabsContent>
      <TabsContent value="password">
        <LoginSecurity type={type} isActiveSession={isActiveSession} />
      </TabsContent>
    </Tabs>
    </section>
  )
}

export default page