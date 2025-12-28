"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/i18n/language-context"
import { LanguageSelect } from "@/components/language-select"
import { Bot, Send, RefreshCcw, Sparkles, Stethoscope, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

const fetcher = async (url: string, body?: any) => {
  try {
    const res = await fetch(url, {
      method: body ? "POST" : "GET",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    })
    const contentType = res.headers.get("content-type") || ""
    const isJson = contentType.includes("application/json")
    const data = isJson ? await res.json().catch(() => null) : null

    if (!res.ok) {
      return { answer: "I'm having trouble connecting to my medical database right now. Please try again or seek a real doctor if it's urgent.", demo: true, reason: "http_error" }
    }
    return data ?? { answer: "Service unavailable. Please consult a doctor immediately if this is an emergency.", demo: true, reason: "no_data" }
  } catch (err: any) {
    return { answer: "Connection error. Please check your internet.", demo: true, reason: "network_error" }
  }
}

interface Message {
  role: "user" | "assistant"
  text: string
}

export function NurseMaya() {
  const [query, setQuery] = useState("")
  const [history, setHistory] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [demo, setDemo] = useState(false)
  const [demoReason, setDemoReason] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const { lang } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, loading])

  // Text-to-Speech function using ElevenLabs REST API with fallback
  const speakText = async (text: string) => {
    if (!ttsEnabled || !text.trim()) return
    
    try {
      setIsSpeaking(true)
      
      // Get API key and voice ID from environment
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
      const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL'
      
      // If no valid API key, skip ElevenLabs and use browser TTS
      if (!apiKey || apiKey === "YOUR_API_KEY" || apiKey.length < 10) {
        throw new Error('ElevenLabs API key not configured - using browser TTS')
      }
      
      // Try ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.warn('ElevenLabs API issue:', response.status, errorText)
        
        // Check for specific errors that indicate we should fall back
        if (response.status === 401 || response.status === 429 || response.status === 403) {
          throw new Error('ElevenLabs API unavailable - using browser TTS fallback')
        }
        
        throw new Error(`ElevenLabs API error: ${response.status}`)
      }
      
      // Convert response to audio blob
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audioElement = new Audio(audioUrl)
      
      audioElement.onended = () => {
        URL.revokeObjectURL(audioUrl)
        setIsSpeaking(false)
      }
      
      audioElement.onerror = () => {
        URL.revokeObjectURL(audioUrl)
        throw new Error('Audio playback failed')
      }
      
      await audioElement.play()
      
    } catch (error: unknown) {
      console.info('Using browser TTS fallback:', (error as Error)?.message || 'Unknown error')
      
      // Always fall back to browser speech synthesis
      if (isClient && 'speechSynthesis' in window) {
        try {
          // Cancel any ongoing speech
          speechSynthesis.cancel()
          
          // Wait for voices to load if they haven't already
          const getVoices = () => {
            return new Promise<SpeechSynthesisVoice[]>((resolve) => {
              let voices = speechSynthesis.getVoices()
              if (voices.length > 0) {
                resolve(voices)
              } else {
                speechSynthesis.onvoiceschanged = () => {
                  voices = speechSynthesis.getVoices()
                  resolve(voices)
                }
              }
            })
          }
          
          const voices = await getVoices()
          const utterance = new SpeechSynthesisUtterance(text)
          
          // Prioritize female voices - comprehensive search
          const femaleVoice = voices.find(voice => {
            const name = voice.name.toLowerCase()
            const lang = voice.lang.toLowerCase()
            
            // Check for explicitly female voices
            return (
              name.includes('female') ||
              name.includes('woman') ||
              name.includes('samantha') ||
              name.includes('karen') ||
              name.includes('victoria') ||
              name.includes('susan') ||
              name.includes('allison') ||
              name.includes('ava') ||
              name.includes('serena') ||
              name.includes('alice') ||
              name.includes('emma') ||
              name.includes('fiona') ||
              name.includes('kate') ||
              name.includes('sara') ||
              name.includes('tessa') ||
              name.includes('veena') ||
              name.includes('rishi') ||
              name.includes('nicky') ||
              name.includes('moira') ||
              (voice as any).gender === 'female' ||
              // Prefer English voices if available
              (lang.startsWith('en') && !name.includes('male') && !name.includes('man'))
            )
          }) || 
          // Fallback: any English voice that doesn't sound male
          voices.find(voice => 
            voice.lang.startsWith('en') && 
            !voice.name.toLowerCase().includes('male') &&
            !voice.name.toLowerCase().includes('man') &&
            !voice.name.toLowerCase().includes('daniel') &&
            !voice.name.toLowerCase().includes('alex') &&
            !voice.name.toLowerCase().includes('tom')
          ) ||
          // Last resort: first available voice
          voices[0]
          
          if (femaleVoice) {
            utterance.voice = femaleVoice
            console.log('Using voice:', femaleVoice.name, femaleVoice.lang)
          }
          
          // Configure for a caring, nurse-like delivery
          utterance.rate = 0.85  // Slightly slower for clarity
          utterance.pitch = 1.2  // Higher pitch for feminine sound
          utterance.volume = 0.9
          
          utterance.onend = () => setIsSpeaking(false)
          utterance.onerror = () => setIsSpeaking(false)
          
          speechSynthesis.speak(utterance)
          
        } catch (fallbackError: unknown) {
          console.error('Browser TTS also failed:', (fallbackError as Error)?.message || 'Unknown error')
          setIsSpeaking(false)
        }
      } else {
        console.warn('No speech synthesis available')
        setIsSpeaking(false)
      }
    }
  }

  const toggleTTS = () => {
    setTtsEnabled(!ttsEnabled)
    if (isSpeaking) {
      // Stop current speech
      if (isClient && 'speechSynthesis' in window) {
        speechSynthesis.cancel()
      }
      setIsSpeaking(false)
    }
    
    // Debug: Log available voices when TTS is enabled (only on client)
    if (!ttsEnabled && isClient && 'speechSynthesis' in window) {
      setTimeout(() => {
        const voices = speechSynthesis.getVoices()
        console.log('Available voices:', voices.map(v => ({
          name: v.name,
          lang: v.lang,
          gender: (v as any).gender || 'unknown'
        })))
      }, 100)
    }
  }

  const ask = async () => {
    if (!query.trim()) return
    
    const userMsg: Message = { role: "user", text: query }
    setHistory((prev) => [...prev, userMsg])
    setQuery("")
    setLoading(true)

    // Simulate a bit of "thinking" time for natural feel
    const startTime = Date.now()

    const res = await fetcher("/api/triage", {
      question: userMsg.text,
      history: [...history, userMsg],
      lang,
    })

    // Ensure at least 600ms loading state so it doesn't flicker
    const elapsed = Date.now() - startTime
    if (elapsed < 600) await new Promise(r => setTimeout(r, 600 - elapsed))

    setDemo(!!res?.demo)
    setDemoReason(res?.reason ?? null)
    const assistantResponse = res?.answer ?? "I apologize, I couldn't process that request."
    setHistory((prev) => [...prev, { role: "assistant", text: assistantResponse }])
    setLoading(false)

    // Speak the response if TTS is enabled
    if (ttsEnabled && assistantResponse) {
      speakText(assistantResponse)
    }
  }

  const clearChat = () => {
    setHistory([])
    setDemo(false)
    setDemoReason(null)
  }

  return (
    <Card className="w-full overflow-hidden border-2 border-[var(--brand-primary)]/10 shadow-xl bg-white/50 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
             <Stethoscope className="size-6 text-white" />
             <div className="absolute bottom-0 right-0 size-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none flex items-center gap-2">
              Nurse Maya
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTTS}
                className={cn(
                  "h-6 w-6 p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all",
                  isSpeaking && "animate-pulse"
                )}
                title={ttsEnabled ? "Disable Voice" : "Enable Voice"}
              >
                {ttsEnabled ? <Volume2 className="size-3" /> : <VolumeX className="size-3" />}
              </Button>
              {demo && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-normal">Demo Mode</span>}
            </h2>
            <p className="text-xs text-white/80 font-medium">AI Symptom Triage</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTTS}
            className={cn(
              "text-white hover:bg-white/20 rounded-full",
              isSpeaking && "animate-pulse"
            )}
            title={ttsEnabled ? "Disable Voice" : "Enable Voice"}
          >
            {ttsEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </Button>
          <div className="hidden sm:block">
             <LanguageSelect />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearChat}
            className="text-white hover:bg-white/20 rounded-full"
            title="Reset Conversation"
          >
            <RefreshCcw className="size-4" />
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth"
      >
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
            <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Sparkles className="size-8 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-900">How can I help you today?</p>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Describe your symptoms (e.g., "I have a headache and fever for 2 days")
              </p>
            </div>
          </div>
        )}

        {history.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex w-full",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "relative max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-[var(--brand-primary)] text-white rounded-br-none"
                  : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
              )}
            >
              {m.role === "assistant" && (
                <div className="flex items-center gap-2">
                  <Bot className="absolute -left-8 bottom-0 size-6 text-[var(--brand-primary)] opacity-50 p-1 bg-blue-100 rounded-full" />
                  {ttsEnabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(m.text)}
                      className="absolute -right-8 bottom-0 size-6 p-1 text-slate-400 hover:text-[var(--brand-primary)] rounded-full"
                      title="Speak this message"
                    >
                      <Volume2 className="size-3" />
                    </Button>
                  )}
                </div>
              )}
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start w-full">
             <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                <span className="size-2 bg-[var(--brand-primary)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="size-2 bg-[var(--brand-primary)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="size-2 bg-[var(--brand-primary)] rounded-full animate-bounce"></span>
             </div>
          </div>
        )}

        {/* Demo Errors */}
        {demo && demoReason && (
          <div className="text-center my-2">
            <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-full border border-amber-200">
               ⚠️ System Alert: {demoReason}
            </span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); ask(); }}
          className="flex gap-2 items-end"
        >
          <Input
            placeholder="Type your symptoms here..."
            className="flex-1 min-h-[44px] bg-slate-50 border-slate-200 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-0 rounded-xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!query.trim() || loading}
            className={cn(
              "size-11 rounded-xl shrink-0 transition-all duration-200",
              query.trim() 
                ? "bg-[var(--brand-primary)] hover:bg-[var(--brand-accent)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5" 
                : "bg-slate-100 text-slate-400"
            )}
          >
            <Send className={cn("size-5", query.trim() && "ml-0.5")} />
          </Button>
        </form>
        
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          Disclaimer: AI generated. Not medical advice. For emergencies call 112/911.
        </p>
      </div>
    </Card>
  )
}
