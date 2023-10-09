"use client"

import { Icons } from "@/components/icons"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Label } from "../ui/label"
import React, { FormEventHandler, useEffect, useState } from 'react';
import { Input } from "../ui/input"
import { createDirectus, authentication, rest, readMe, withToken } from '@directus/sdk';
import Cookies from 'js-cookie';
 
const client = createDirectus('http://localhost:8055').with(authentication('cookie', {
  autoRefresh: true,
  credentials: 'include',
})).with(rest());

async function loginUser(email: string, password: string) {
  try {
    await client.login(email, password);
  } catch (error) {
    console.error(error);
  }
}

export function AccountLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await loginUser(email, password);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Attempt to fetch user data using access-token ?
        const accessToken = Cookies.get('access_token');
        const me = await client.request(withToken(accessToken!, readMe()));
        console.log('User is logged in');
        // If successful, user is authenticated
        setIsLoggedIn(true);
      } catch (error) {
        // If an error occurs, user is not authenticated or token is expired
        console.log('User needs to log in');
        setIsLoggedIn(false);
        try {
          // Attempt to refresh the token
          const refreshToken = await client.refresh()
          console.log('Token refreshed');
        } catch (refreshError) {
          // If the refresh fails, log out the user
          console.log('Token expired');
          // await client.logout();
          console.log('User logged out');
        }
      }
    };

    checkAuthentication();
  }, []);

  return (
    <>
      {
        isLoggedIn ?
          <p>
            Logged In
          </p> :
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Login </CardTitle>
                <CardDescription>
                  Continue with
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  <Button variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or enter your email below to login
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Login</Button>
              </CardFooter>
            </Card>
          </form>
      }
    </>
  )
}