'use client';

import { useState, useEffect, useCallback } from 'react';

const MAJOR_CITIES = [
  { name: 'New York', lat: 40.7128, long: -74.0060 },
  { name: 'London', lat: 51.5074, long: -0.1278 },
  { name: 'New Delhi', lat: 28.6139, long: 77.2090 },
  { name: 'Tokyo', lat: 35.6762, long: 139.6503 },
  { name: 'Dubai', lat: 25.2048, long: 55.2708 }
];

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocal, setIsLocal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Memoize fetchWeather to avoid dependency cycle
  const fetchWeather = useCallback(async (lat: number, long: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
      const data = await res.json();
      setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode
      });
    } catch (e) {
        console.error("Weather fetch error", e);
    } finally {
        setLoading(false);
    }
  }, []);

  // Initial Cycle Effect
  useEffect(() => {
    if (isLocal) return; // Stop cycling if user selected local

    const city = MAJOR_CITIES[currentIndex];
    fetchWeather(city.lat, city.long);

    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % MAJOR_CITIES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isLocal, fetchWeather]);

  const getWeatherIcon = (code: number) => {
      if (code === 0) return '☀️'; 
      if (code <= 3) return '⛅'; 
      if (code <= 48) return '🌫️'; 
      if (code <= 67) return '🌧️'; 
      if (code <= 77) return '❄️'; 
      if (code <= 82) return '🌦️'; 
      if (code <= 99) return '⚡'; 
      return '🌤️';
  };

  const handleLocate = () => {
      if ('geolocation' in navigator) {
          setLoading(true);
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  setIsLocal(true);
                  fetchWeather(position.coords.latitude, position.coords.longitude);
              },
              (err) => {
                  console.error(err);
                  setLoading(false);
                  setIsLocal(false); // Fallback to cycle if permission denied
              }
          );
      }
  };

  return (
    <div 
        onClick={handleLocate}
        className="flex items-center space-x-3 text-xs font-bold font-mono tracking-wider text-muted-foreground hover:text-foreground cursor-pointer transition-colors group bg-muted/30 px-3 py-1.5 rounded-full border border-transparent hover:border-border/50 hover:bg-muted/50 hover:shadow-sm"
        title={isLocal ? "Updating location..." : "Click to show your local weather"}
    >
        {/* City Label */}
        <span className="text-[10px] uppercase text-accent font-black text-center whitespace-nowrap min-w-[60px]">{isLocal ? 'Local' : MAJOR_CITIES[currentIndex].name}</span>

        {/* Separator */}
        <div className="h-3 w-px bg-border group-hover:bg-foreground/20 transition-colors"></div>

        {/* Weather Data */}
        <div className="flex items-center space-x-1.5 min-w-[60px] justify-end">
            {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-accent/50 border-t-transparent animate-spin"></div>
            ) : (
                <>
                    <span className="text-sm scale-110">{weather ? getWeatherIcon(weather.code) : '•'}</span>
                    <span className="font-serif text-sm">{weather?.temp}°</span>
                </>
            )}
        </div>
    </div>
  );
}
