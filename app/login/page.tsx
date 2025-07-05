'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.ok) router.push("/dashboard")
    else alert("Invalid credentials")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full shadow-xl bg-white p-6 relative">
        <button
          onClick={() => router.push("/")}
          className="absolute top-3 right-3 text-gray-500 text-xl"
        >
          ✖
        </button>
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold font-sans">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 font-sans">
          <Input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Forgot password?</span>
            <span>
              Don’t have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-blue-500"
              >
                Sign Up
              </button>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
