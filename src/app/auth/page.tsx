'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleEmailAuth = async (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault()
    try {
      await login(email, password, type)
      router.push('/')
    } catch (error) {
      console.error('Authentication error:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    try {
      // Implement social login logic here
      console.log(`Logging in with ${provider}`)
    } catch (error) {
      console.error('Social authentication error:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => handleEmailAuth(e, 'login')} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={(e) => handleEmailAuth(e, 'signup')} className="space-y-4">
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button onClick={() => handleSocialAuth('google')} variant="outline" className="w-full mb-2">
            Login with Google
          </Button>
          <Button onClick={() => handleSocialAuth('facebook')} variant="outline" className="w-full">
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
  )
}

