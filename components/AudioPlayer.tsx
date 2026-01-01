"use client";

import { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
  text: string;
}

export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  useEffect(() => {
    if (!supported) return;

    // Split text into chunks to avoid browser limits (some stop after 15s)
    // Actually simplicity first: try full text. If buggy, suggest chunking.
    // Modern browsers handle longer texts okay often, but chunking is safer.
    // Let's stick to simple implementation for "coolness" first.
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    // Try to select a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.name.includes("Google US English") || v.name.includes("Samantha")
    ); // Good default voices
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setSpeech(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, supported]);

  const togglePlay = () => {
    if (!speech) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      window.speechSynthesis.cancel(); // Safety clear
      window.speechSynthesis.speak(speech);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported) return null;

  return (
    <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-full border border-border backdrop-blur-sm">
      <button
        onClick={togglePlay}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
          isPlaying && !isPaused
            ? "bg-accent text-white shadow-lg scale-105"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
        title={isPlaying && !isPaused ? "Pause" : "Listen to this story"}
        aria-label={isPlaying && !isPaused ? "Pause" : "Listen to this story"}
      >
        {isPlaying && !isPaused ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {isPlaying && (
        <button
          onClick={stop}
          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          title="Stop"
          aria-label="Stop playback"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h12v12H6z" />
          </svg>
        </button>
      )}

      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground pr-3">
        {isPlaying && !isPaused ? "Playing..." : isPaused ? "Paused" : "Listen"}
      </span>

      {/* Sound Wave Animation (Fake) */}
      {isPlaying && !isPaused && (
        <div className="flex space-x-0.5 items-center h-4">
          <div className="w-1 bg-accent/50 animate-[pulse_0.6s_ease-in-out_infinite] h-2"></div>
          <div className="w-1 bg-accent/50 animate-[pulse_0.8s_ease-in-out_infinite] h-4"></div>
          <div className="w-1 bg-accent/50 animate-[pulse_0.5s_ease-in-out_infinite] h-3"></div>
          <div className="w-1 bg-accent/50 animate-[pulse_0.7s_ease-in-out_infinite] h-2"></div>
        </div>
      )}
    </div>
  );
}
