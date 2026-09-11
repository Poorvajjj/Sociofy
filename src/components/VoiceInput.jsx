import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function VoiceInput({ onTranscriptChange, currentText }) {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | listening | transcribing | unsupported | error
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check Web Speech API availability
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('unsupported');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setStatus('listening');
        setErrorMessage('');
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            setStatus('transcribing');
          }
        }

        if (finalTranscript.trim()) {
          const updated = currentText ? `${currentText.trim()} ${finalTranscript.trim()}` : finalTranscript.trim();
          onTranscriptChange(updated);
        }
      };

      recognition.onerror = (event) => {
        console.error('[VoiceInput] Recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser settings.');
          setStatus('error');
        } else if (event.error === 'no-speech') {
          setStatus('idle');
        } else {
          setErrorMessage(`Speech recognition note: ${event.error}`);
          setStatus('error');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        setStatus('idle');
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.error('[VoiceInput] Failed to initialize Web Speech API:', err);
      setStatus('unsupported');
    }
  }, [currentText, onTranscriptChange]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setErrorMessage('Speech recognition is not supported on this browser. You can type or upload an image.');
      setStatus('unsupported');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setStatus('idle');
    } else {
      setErrorMessage('');
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('[VoiceInput] Start error:', e);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        type="button"
        onClick={toggleRecording}
        disabled={status === 'unsupported'}
        className={`relative group flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${
          isRecording
            ? 'bg-red-600 text-white recording-pulse scale-105'
            : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
        } ${status === 'unsupported' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isRecording ? (
          <>
            <MicOff className="w-4 h-4 animate-spin" />
            <span>Stop Speaking</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-teal-600" />
            <span>Speak Problem</span>
          </>
        )}
      </button>

      {/* Voice Status Badges */}
      {status === 'listening' && (
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-red-600 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span>Listening... speak clearly into microphone</span>
        </div>
      )}

      {status === 'transcribing' && (
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-teal-600">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Transcribing your speech...</span>
        </div>
      )}

      {status === 'unsupported' && (
        <p className="text-xs text-amber-700 font-medium">
          Voice input not supported in this browser. Please type your message instead.
        </p>
      )}

      {errorMessage && (
        <div className="flex items-center space-x-1 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
