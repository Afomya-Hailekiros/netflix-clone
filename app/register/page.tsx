'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleRegister = async () => {
    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      alert("User registered! You can now log in.")
      router.push("/login")
    } else {
      const data = await res.json()
      alert(data.message || "Something went wrong")
    }

    setLoading(false)
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
            Register
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
          <Button onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500"
            >
              Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
