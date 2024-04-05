import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const Unlock = () => {
  const [displayFile, setDisplayFile] = useState(false)
  const [option, setOption] = useState("decrypt" as string)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [fileURL, setFileURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/transfer-safe.appspot.com/o/ARORA-ARYAN-TURKISH-AIRLINES.pdf?alt=media&token=25072ddf-9226-4771-b7e2-fac44618787f" as string,
  )

  const fetchFile = async () => {
    const API_URI = `https://tired-badgers-reply.loca.lt/api/${option}`
    console.log(API_URI)

    try {
      console.log(password)
      const response = await fetch(API_URI, {
        method: "POST",
        headers: {
          "bypass-tunnel-reminder": "0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: password,
        }),
      })

      const data = await response.json()
      console.log(data)
      if (response.status !== 200) {
        throw new Error(data.error)
      } else {
        setFileURL(data.file_url)
        setLoading(false)
      }
    } catch (error: any) {
      const message = error.message
        ? error.message
        : JSON.stringify(error.error)
      setError(message)
      setLoading(false)
    }
  }

  const handleUnlock = () => {
    setDisplayFile(true)
    fetchFile()
  }

  const handlePassword = (e: any) => {
    setDisplayFile(false)
    setLoading(true)
    setError("")
    setPassword(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center object-cover bg-center bg-no-repeat bg-cover bg-fixed bg-blend-darken bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <Card className="w-[400px] shadow-2xl">
        <CardHeader>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/WeTransfer_logo.svg/1200px-WeTransfer_logo.svg.png"
            alt="logo"
            width={50}
            className="mb-5"
          />
          <CardTitle>Unlock File</CardTitle>
          <CardDescription>
            Enter secure key to access your file
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          {displayFile && (
            <div className="w-full border border-neutral-200 rounded-lg p-10 shadow-sm flex items-center justify-center">
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 animate-spin"
                >
                  <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ) : (
                <div>
                  {error === "" ? (
                    <a
                      href={`${fileURL}`}
                      className="flex flex-col items-center justify-cente gap-3"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      <p className="text-xs">Download File</p>
                    </a>
                  ) : (
                    <p className="text-red-500 text-xs flex gap-1 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>

                      {error}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <RadioGroup defaultValue="secure">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="secure"
                  id="r1"
                  onClick={() => {
                    setOption("decrypt")
                  }}
                />
                <Label htmlFor="r1">Secure</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="sql"
                  id="r2"
                  onClick={() => {
                    setOption("decryptsql")
                  }}
                />
                <Label htmlFor="r2">SQL Injection</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="picture">Enter password</Label>
            <Input
              type="text"
              className="mt-1"
              required
              onChange={handlePassword}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-5">
          <Button onClick={handleUnlock}>Unlock</Button>
          <a href="/" className="text-xs text-neutral-400 underline">
            Transfer file instead
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Unlock
