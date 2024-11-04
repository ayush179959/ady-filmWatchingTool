'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Mic, MicOff, Send, Users, Copy, Check } from "lucide-react"

export function AdyMovieWatchPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [voiceChat, setVoiceChat] = useState(false)
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [roomKey, setRoomKey] = useState('')
  const [inRoom, setInRoom] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [roomAction, setRoomAction] = useState<'join' | 'create' | null>(null)
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleVoiceChat = () => {
    setVoiceChat(!voiceChat)
    // Implement voice chat logic here
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement send message logic here
    console.log('Sending message:', message)
    setMessage('')
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    // No need to redirect; just ensure userName is updated
  };

  const handleRoomAction = (action: 'join' | 'create') => {
    setRoomAction(action)
    if (action === 'create') {
      const newRoomKey = Math.random().toString(36).substring(2, 10).toUpperCase()
      setRoomKey(newRoomKey)
      setInRoom(true)
    } else {
      setIsJoining(true)
    }
  }

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement room joining logic here
    console.log(`${userName} joined room with key: ${roomKey}`)
    setInRoom(true)
  }

  const copyRoomKey = () => {
    navigator.clipboard.writeText(roomKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --card: 0 0% 100%;
          --card-foreground: 222.2 84% 4.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 222.2 84% 4.9%;
          --primary: 222.2 47.4% 11.2%;
          --primary-foreground: 210 40% 98%;
          --secondary: 210 40% 96.1%;
          --secondary-foreground: 222.2 47.4% 11.2%;
          --muted: 210 40% 96.1%;
          --muted-foreground: 215.4 16.3% 46.9%;
          --accent: 210 40% 96.1%;
          --accent-foreground: 222.2 47.4% 11.2%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 210 40% 98%;
          --border: 214.3 31.8% 91.4%;
          --input: 214.3 31.8% 91.4%;
          --ring: 222.2 84% 4.9%;
          --radius: 0.5rem;
        }
        
        .dark {
          --background: 240 0% 20%;
          --foreground:  0% 98%;
          --card: 240 10% 3.9%;
          --card-foreground: 0 0% 98%;
          --popover: 240 10% 3.9%;
          --popover-foreground: 0 0% 98%;
          --primary: 270 50% 60%;
          --primary-foreground: 0 0% 98%;
          --secondary: 240 3.7% 15.9%;
          --secondary-foreground: 0 0% 98%;
          --muted: 240 3.7% 15.9%;
          --muted-foreground: 240 5% 64.9%;
          --accent: 270 50% 60%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 3.7% 15.9%;
          --input: 240 3.7% 15.9%;
          --ring: 240 4.9% 83.9%;
        }
      `}</style>
      <div className="container mx-auto p-4 dark:bg-transparent dark:text-white transition-colors duration-200">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold font-['Orbitron'] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
            ADY
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </header>
        
        {!inRoom ? (
  <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
    <Input
      type="text"
      placeholder="Enter your name (max 8 characters)"
      value={userName}
      onChange={(e) => {
        if (e.target.value.length <= 8) {
          setUserName(e.target.value);
        }
      }}
      className="w-64 border-black dark:border-white"
    />
    {userName && (
      <div className="flex flex-col items-center space-y-2">
        <Button onClick={() => handleRoomAction('join')}>Join Room</Button>
        <Button onClick={() => handleRoomAction('create')}>Create Room</Button>
      </div>
    )}
  </div>
)  : (
          <main className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-3/4">
              <div className="aspect-video bg-gray-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Video Player Placeholder</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 text-gray-500 dark:text-gray-400">
      Username: {userName}
            </div>
            
            <div className="lg:w-1/4 flex flex-col">
              <div className="bg-gray-100 dark:bg-zinc-600 rounded-lg p-4 mb-4 flex-grow overflow-y-auto h-64 lg:h-auto">
                {/* Chat messages would be displayed here */}
                <p className="text-gray-500 dark:text-gray-400">Chat messages appear here</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant={voiceChat ? "default" : "outline"} onClick={toggleVoiceChat} className='dark:border-gray-400'>
                  {voiceChat ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {voiceChat ? 'Mute' : 'Unmute'}
                </Button>
                <Button variant="outline" className="flex-grow dark:border-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  Room: {roomKey}
                </Button>
                <Button variant="outline" onClick={copyRoomKey} className='dark:border-gray-400'>
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy Key'}
                </Button>
              </div>
              
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow dark:border-gray-400"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}