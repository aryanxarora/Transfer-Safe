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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { storage } from "@/firebase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"

const TransferCard = () => {
  const [file, setFile] = useState<any>()
  const [receiverEmail, setReceiverEmail] = useState<string>("")
  const [senderEmail, setSenderEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [disabled, setDisabled] = useState(false)

  const handleTransfer = (e: any) => {
    e.preventDefault()
    setDisabled(true)
    setError("")
    setSuccess("")
    if (!file) {
      setError("Please upload a file")
      setDisabled(false)
      return
    }
    if (receiverEmail === "" || senderEmail === "") {
      setError("Please enter receiver and sender email")
      setDisabled(false)
      return
    }
    const storageRef = ref(storage, file.name)
    uploadBytes(storageRef, file).then(async snapshot => {
      console.log(snapshot)
      handleServerUpload(await getDownloadURL(snapshot.ref))
    })
  }

  const onFileChange = (e: any) => {
    setFile(e.target.files[0])
  }

  const handleServerUpload = async (file_url: string) => {
    let data = {
      file_url: file_url,
      receiver_email: receiverEmail,
      sender_email: senderEmail,
      message: message,
    }
    setSuccess("File transferred successfully")
    setDisabled(false)
    // POST METHOD TO SERVER
    console.log(data)
  }

  return (
    <Card className="w-[400px] shadow-2xl">
      <CardHeader>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/WeTransfer_logo.svg/1200px-WeTransfer_logo.svg.png"
          alt="logo"
          width={50}
          className="mb-5"
        />
        <CardTitle>Transfer Safe</CardTitle>
        <CardDescription>Secure file transfer</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-10">
        <div>
          <Label htmlFor="picture">Upload File</Label>
          <Input type="file" className="mt-1" onChange={onFileChange} />
        </div>
        <div className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Receiver email"
            onChange={e => {
              setReceiverEmail(e.target.value)
            }}
          />
          <Input
            type="email"
            placeholder="Sender email"
            onChange={e => {
              setSenderEmail(e.target.value)
            }}
          />
          <Textarea
            placeholder="Add message here"
            rows={5}
            onChange={e => {
              setMessage(e.target.value)
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-5">
        {error === "" ? null : (
          <p className="text-red-500 text-xs flex gap-1 items-center justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            {error}
          </p>
        )}
        {success === "" ? null : (
          <p className="text-green-500 text-xs flex gap-1 items-center justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>

            {success}
          </p>
        )}
        <Button onClick={handleTransfer} disabled={disabled}>
          Transfer
        </Button>
        <a href="/unlock" className="text-xs text-neutral-400 underline">
          Unlock file instead
        </a>
      </CardFooter>
    </Card>
  )
}

export default TransferCard
