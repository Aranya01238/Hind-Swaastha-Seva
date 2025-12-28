"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/i18n/language-context"
import { LanguageSelect } from "@/components/language-select"
import { 
  Bot, 
  Send, 
  RefreshCcw, 
  Sparkles, 
  Stethoscope, 
  Volume2, 
  VolumeX,
  Heart,
  Shield,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

// Fetcher function for API calls
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
      return { 
        answer: "I'm having trouble connecting to my medical database right now. Please try again or seek a real doctor if it's urgent.", 
        demo: true, 
        reason: "http_error" 
      }
    }
    
    return data ?? { 
      answer: "Service unavailable. Please consult a doctor immediately if this is an emergency.", 
      demo: true, 
      reason: "no_data" 
    }
  } catch (err: unknown) {
    return { 
      answer: "Connection error. Please check your internet connection and try again.", 
      demo: true, 
      reason: "network_error" 
    }
  }
}

// Message interface
interface Message {
  role: "user" | "assistant"
  text: string
  timestamp?: Date
}

export function NurseMaya() {
  // State management
  const [query, setQuery] = useState("")
  const [history, setHistory] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [demo, setDemo] = useState(false)
  const [demoReason, setDemoReason] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const [isClient, setIsClient] = useState(false)
  
  // Hooks
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

  // Auto-detect language from text using Unicode script ranges
  const detectLanguage = (text: string): string => {
    if (!text || !text.trim()) return 'en'
    
    // Remove punctuation and whitespace for analysis
    const cleanText = text.replace(/[^\p{L}]/gu, '')
    if (!cleanText) return 'en'
    
    // Count characters by script/language
    const scriptCounts = {
      devanagari: 0,  // Hindi, Marathi
      bengali: 0,     // Bengali
      gujarati: 0,    // Gujarati
      tamil: 0,       // Tamil
      latin: 0        // English and others
    }
    
    for (const char of cleanText) {
      const code = char.codePointAt(0)
      if (!code) continue
      
      // Devanagari script (Hindi, Marathi, Sanskrit)
      if ((code >= 0x0900 && code <= 0x097F) || (code >= 0xA8E0 && code <= 0xA8FF)) {
        scriptCounts.devanagari++
      }
      // Bengali script
      else if (code >= 0x0980 && code <= 0x09FF) {
        scriptCounts.bengali++
      }
      // Gujarati script
      else if (code >= 0x0A80 && code <= 0x0AFF) {
        scriptCounts.gujarati++
      }
      // Tamil script
      else if (code >= 0x0B80 && code <= 0x0BFF) {
        scriptCounts.tamil++
      }
      // Latin script (English and others)
      else if ((code >= 0x0041 && code <= 0x005A) || (code >= 0x0061 && code <= 0x007A) || 
               (code >= 0x00C0 && code <= 0x024F) || (code >= 0x1E00 && code <= 0x1EFF)) {
        scriptCounts.latin++
      }
    }
    
    // Find the script with the highest count
    const totalChars = Object.values(scriptCounts).reduce((sum, count) => sum + count, 0)
    if (totalChars === 0) return 'en'
    
    // Calculate percentages and determine language
    const percentages = Object.entries(scriptCounts).map(([script, count]) => ({
      script,
      percentage: (count / totalChars) * 100
    }))
    
    // Sort by percentage (highest first)
    percentages.sort((a, b) => b.percentage - a.percentage)
    const dominant = percentages[0]
    
    // Require at least 30% of characters to be in a script to detect it
    if (dominant.percentage < 30) return 'en'
    
    // Map scripts to language codes
    switch (dominant.script) {
      case 'devanagari':
        // For Devanagari, we need to distinguish between Hindi and Marathi
        // This is a simplified approach - in practice, you might need more sophisticated detection
        // For now, default to Hindi as it's more common
        return 'hi'
      case 'bengali':
        return 'bn'
      case 'gujarati':
        return 'gu'
      case 'tamil':
        return 'ta'
      case 'latin':
      default:
        return 'en'
    }
  }

  // Text-to-Speech function with auto-language detection
  const speakText = async (text: string) => {
    if (!ttsEnabled || !text.trim() || !isClient) return
    
    try {
      setIsSpeaking(true)
      
      // Auto-detect language from the text
      const detectedLang = detectLanguage(text)
      console.log(`🎤 Auto-detected language: ${detectedLang} for text: "${text.substring(0, 50)}..."`)
      
      // Get API credentials from environment
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
      const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL'
      
      // Check if ElevenLabs API is available
      if (!apiKey || apiKey === "YOUR_API_KEY" || apiKey.length < 10) {
        throw new Error('ElevenLabs API key not configured')
      }
      
      // Try ElevenLabs API first
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
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.warn('ElevenLabs API error:', response.status, errorText)
        throw new Error(`ElevenLabs API error: ${response.status}`)
      }
      
      // Play ElevenLabs audio
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
      console.info('Falling back to browser TTS:', (error as Error)?.message || 'Unknown error')
      
      // Fallback to browser speech synthesis with auto-detected language
      if ('speechSynthesis' in window) {
        try {
          // Cancel any ongoing speech
          speechSynthesis.cancel()
          
          // Auto-detect language from the text
          const detectedLang = detectLanguage(text)
          
          // Wait for voices to load
          const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
            return new Promise((resolve) => {
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
          
          // Find the best voice for the detected language
          let selectedVoice: SpeechSynthesisVoice | null = null
          
          // Language mapping for voice selection
          const languageMap: Record<string, string[]> = {
            'en': ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN', 'en'],
            'hi': ['hi-IN', 'hi'],
            'bn': ['bn-IN', 'bn-BD', 'bn'],
            'mr': ['mr-IN', 'mr'],
            'gu': ['gu-IN', 'gu'],
            'ta': ['ta-IN', 'ta-LK', 'ta']
          }
          
          const currentLangCodes = languageMap[detectedLang] || ['en-US', 'en']
          
          // Priority 1: Female voices in the detected language
          selectedVoice = voices.find(voice => {
            const voiceLang = voice.lang.toLowerCase()
            const voiceName = voice.name.toLowerCase()
            
            // Check if voice matches detected language
            const matchesLanguage = currentLangCodes.some(code => 
              voiceLang.startsWith(code.toLowerCase())
            )
            
            if (!matchesLanguage) return false
            
            // Prefer female voices
            return (
              voiceName.includes('female') ||
              voiceName.includes('woman') ||
              voiceName.includes('samantha') ||
              voiceName.includes('karen') ||
              voiceName.includes('victoria') ||
              voiceName.includes('susan') ||
              voiceName.includes('allison') ||
              voiceName.includes('ava') ||
              voiceName.includes('serena') ||
              voiceName.includes('alice') ||
              voiceName.includes('emma') ||
              voiceName.includes('fiona') ||
              voiceName.includes('kate') ||
              voiceName.includes('sara') ||
              voiceName.includes('tessa') ||
              voiceName.includes('veena') ||
              voiceName.includes('rishi') ||
              voiceName.includes('nicky') ||
              voiceName.includes('moira') ||
              voiceName.includes('priya') ||
              voiceName.includes('kavya') ||
              voiceName.includes('aditi') ||
              voiceName.includes('raveena') ||
              (voice as any).gender === 'female' ||
              // Avoid obviously male names
              (!voiceName.includes('male') && 
               !voiceName.includes('man') &&
               !voiceName.includes('daniel') &&
               !voiceName.includes('alex') &&
               !voiceName.includes('tom') &&
               !voiceName.includes('david') &&
               !voiceName.includes('raj') &&
               !voiceName.includes('amit') &&
               !voiceName.includes('kumar'))
            )
          }) || null
          
          // Priority 2: Any voice in the detected language
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => {
              const voiceLang = voice.lang.toLowerCase()
              return currentLangCodes.some(code => 
                voiceLang.startsWith(code.toLowerCase())
              )
            }) || null
          }
          
          // Priority 3: English female voice as fallback
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => {
              const voiceLang = voice.lang.toLowerCase()
              const voiceName = voice.name.toLowerCase()
              
              return voiceLang.startsWith('en') && (
                voiceName.includes('female') ||
                voiceName.includes('samantha') ||
                voiceName.includes('karen') ||
                voiceName.includes('victoria') ||
                (!voiceName.includes('male') && !voiceName.includes('man'))
              )
            }) || null
          }
          
          // Priority 4: Any English voice
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => 
              voice.lang.toLowerCase().startsWith('en')
            ) || null
          }
          
          // Priority 5: First available voice
          if (!selectedVoice) {
            selectedVoice = voices[0] || null
          }
          
          if (selectedVoice) {
            utterance.voice = selectedVoice
            console.log(`🎤 Using voice: ${selectedVoice.name} (${selectedVoice.lang}) for detected language: ${detectedLang}`)
          }
          
          // Configure speech parameters based on detected language
          if (detectedLang === 'hi' || detectedLang === 'bn' || detectedLang === 'mr' || detectedLang === 'gu' || detectedLang === 'ta') {
            // Indian languages - slower rate for clarity
            utterance.rate = 0.75
            utterance.pitch = 1.1
          } else {
            // English and other languages
            utterance.rate = 0.85
            utterance.pitch = 1.2
          }
          
          utterance.volume = 0.9
          
          utterance.onend = () => setIsSpeaking(false)
          utterance.onerror = () => setIsSpeaking(false)
          
          speechSynthesis.speak(utterance)
          
        } catch (fallbackError: unknown) {
          console.error('Browser TTS failed:', (fallbackError as Error)?.message || 'Unknown error')
          setIsSpeaking(false)
        }
      } else {
        console.warn('Speech synthesis not available')
        setIsSpeaking(false)
      }
    }
  }

  // Toggle TTS on/off
  const toggleTTS = () => {
    setTtsEnabled(!ttsEnabled)
    
    // Stop current speech if disabling
    if (isSpeaking) {
      if (isClient && 'speechSynthesis' in window) {
        speechSynthesis.cancel()
      }
      setIsSpeaking(false)
    }
    
    // Debug: Log available voices when TTS is enabled (only on client)
    if (!ttsEnabled && isClient && 'speechSynthesis' in window) {
      setTimeout(() => {
        const voices = speechSynthesis.getVoices()
        console.log('🎤 Available voices by language:')
        
        // Group voices by language
        const voicesByLang = voices.reduce((acc, voice) => {
          const langCode = voice.lang.toLowerCase()
          if (!acc[langCode]) acc[langCode] = []
          acc[langCode].push({
            name: voice.name,
            lang: voice.lang,
            gender: (voice as any).gender || 'unknown'
          })
          return acc
        }, {} as Record<string, any[]>)
        
        // Log voices for supported languages
        const supportedLangs = ['en', 'hi', 'bn', 'mr', 'gu', 'ta']
        supportedLangs.forEach(lang => {
          const matchingVoices = Object.entries(voicesByLang)
            .filter(([langCode]) => langCode.startsWith(lang))
            .flatMap(([, voices]) => voices)
          
          if (matchingVoices.length > 0) {
            console.log(`  ${lang.toUpperCase()}:`, matchingVoices)
          } else {
            console.log(`  ${lang.toUpperCase()}: No voices available`)
          }
        })
        
        console.log('🎤 Auto-language detection enabled - TTS will detect language from AI responses')
      }, 100)
    }
  }

  // Send message to AI
  const ask = async () => {
    if (!query.trim() || loading) return
    
    const userMsg: Message = { 
      role: "user", 
      text: query.trim(),
      timestamp: new Date()
    }
    
    setHistory(prev => [...prev, userMsg])
    setQuery("")
    setLoading(true)

    // Add natural delay for better UX
    const startTime = Date.now()

    try {
      const res = await fetcher("/api/triage", {
        question: userMsg.text,
        history: [...history, userMsg],
        lang,
      })

      // Ensure minimum loading time for natural feel
      const elapsed = Date.now() - startTime
      if (elapsed < 800) {
        await new Promise(resolve => setTimeout(resolve, 800 - elapsed))
      }

      setDemo(!!res?.demo)
      setDemoReason(res?.reason ?? null)
      
      const assistantResponse = res?.answer ?? "I apologize, I couldn't process that request. Please try again or consult a healthcare professional."
      
      const assistantMsg: Message = {
        role: "assistant",
        text: assistantResponse,
        timestamp: new Date()
      }
      
      setHistory(prev => [...prev, assistantMsg])
      
      // Speak the response if TTS is enabled
      if (ttsEnabled && assistantResponse) {
        // Small delay to let the UI update first
        setTimeout(() => speakText(assistantResponse), 300)
      }
      
    } catch (error: unknown) {
      console.error('Error asking question:', error)
      
      const errorMsg: Message = {
        role: "assistant",
        text: "I'm experiencing technical difficulties. Please try again in a moment or consult a healthcare professional if this is urgent.",
        timestamp: new Date()
      }
      
      setHistory(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  // Clear chat history
  const clearChat = () => {
    setHistory([])
    setDemo(false)
    setDemoReason(null)
    
    // Stop any ongoing speech
    if (isSpeaking && isClient && 'speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      ask()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-2 border-blue-100 shadow-2xl bg-white/95 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={cn(
                "size-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner flex items-center justify-center transition-all duration-300",
                (loading || isSpeaking) && "scale-110 rotate-3"
              )}>
                <Stethoscope className="size-7 text-white" />
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 size-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <div className={cn(
                  "size-2.5 rounded-full transition-colors",
                  loading ? "bg-amber-400 animate-pulse" : 
                  isSpeaking ? "bg-green-400 animate-pulse" : 
                  "bg-emerald-500"
                )} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-xl tracking-tight">Nurse Maya</h2>
                {demo && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                    Demo Mode
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90 mt-1">
                <Shield className="size-4" />
                <span>AI Medical Assistant • Secure & Private</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* TTS Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTTS}
              className={cn(
                "text-white hover:bg-white/20 rounded-xl transition-all",
                isSpeaking && "animate-pulse scale-110"
              )}
              title={ttsEnabled ? "Disable Voice" : "Enable Voice"}
            >
              {ttsEnabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
            </Button>
            
            {/* Language Select */}
            <div className="hidden sm:block">
              <LanguageSelect />
            </div>
            
            {/* Clear Chat */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearChat}
              className="text-white hover:bg-white/20 rounded-xl"
              title="Clear Conversation"
            >
              <RefreshCcw className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-blue-50/30"
      >
        {/* Welcome Message */}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="relative">
              <div className="size-20 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 flex items-center justify-center shadow-lg">
                <Heart className="size-10 text-blue-600" />
              </div>
              <div className="absolute -top-2 -right-2 size-8 bg-green-100 rounded-full flex items-center justify-center">
                <Sparkles className="size-5 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">
                Hello! I'm Nurse Maya 👩‍⚕️
              </h3>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                I'm here to help with your health questions and provide preliminary symptom assessment. 
                Describe your symptoms and I'll guide you with care.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  Symptom Analysis
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Health Guidance
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  24/7 Available
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {history.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full animate-in slide-in-from-bottom-2 duration-300",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "relative max-w-[85%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed",
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-md"
              )}
            >
              {/* Assistant message extras */}
              {message.role === "assistant" && (
                <>
                  <div className="absolute -left-3 bottom-2 size-6 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                    <Bot className="size-4 text-blue-600" />
                  </div>
                  
                  {ttsEnabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(message.text)}
                      className="absolute -right-2 -top-2 size-8 p-0 text-slate-400 hover:text-blue-600 bg-white shadow-sm rounded-full border"
                      title="Speak this message"
                    >
                      <Volume2 className="size-3" />
                    </Button>
                  )}
                </>
              )}
              
              <div className="whitespace-pre-wrap">{message.text}</div>
              
              {/* Timestamp */}
              {message.timestamp && (
                <div className={cn(
                  "text-xs mt-2 opacity-70",
                  message.role === "user" ? "text-white/80" : "text-slate-500"
                )}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Animation */}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-bl-md shadow-md flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="size-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="size-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="size-2 bg-blue-600 rounded-full animate-bounce"></span>
              </div>
              <span className="text-sm text-slate-600 ml-2">Analyzing...</span>
            </div>
          </div>
        )}

        {/* Demo Status */}
        {demo && demoReason && (
          <div className="flex justify-center my-4">
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2">
              <Clock className="size-3" />
              Demo Mode: {demoReason.replace('_', ' ')}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-200">
        <form 
          onSubmit={(e) => { e.preventDefault(); ask(); }}
          className="flex gap-3 items-end"
        >
          <div className="flex-1">
            <Input
              placeholder="Describe your symptoms... (e.g., 'I have a headache and fever for 2 days')"
              className="min-h-[52px] bg-slate-50 border-slate-300 focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-xl text-base px-4 py-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}s}
              disabled={loading}
            />
          </div>
          
          <Button
            type="submit"
            disabled={!query.trim() || loading}
            className={cn(
              "size-[52px] rounded-xl shrink-0 transition-all duration-300 shadow-lg",
              query.trim() && !loading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl hover:scale-105" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Send className="size-5" />
            )}
          </Button>
        </form>
        
        {/* Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Medical Disclaimer:</strong> This AI assistant provides general health information only. 
            Not a substitute for professional medical advice. For emergencies, call 911/112 immediately.
          </p>
        </div>
      </div>
    </Card>
  )
}