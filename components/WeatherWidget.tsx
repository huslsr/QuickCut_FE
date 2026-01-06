"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const MAJOR_CITIES = [
  { name: "New York", lat: 40.7128, long: -74.006 },
  { name: "London", lat: 51.5074, long: -0.1278 },
  { name: "New Delhi", lat: 28.6139, long: 77.209 },
  { name: "Tokyo", lat: 35.6762, long: 139.6503 },
  { name: "Dubai", lat: 25.2048, long: 55.2708 },
];

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lazy initialization to prevent flash and race conditions
  const [isLocal, setIsLocal] = useState(false);
  const [localCityName, setLocalCityName] = useState("Local");
  const [loading, setLoading] = useState(true);

  // Ref to track if we should fetch cycle weather
  const initRef = useRef(false);

  // Memoize fetchWeather
  const fetchWeather = useCallback(async (lat: number, long: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
      );
      const data = await res.json();
      setWeather({
        temp: Math.round(data.current_weather.temperature),
        code: data.current_weather.weathercode,
      });
    } catch (e) {
      console.error("Weather fetch error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize from LocalStorage
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const saved = localStorage.getItem("weather_location");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isLocal) {
          console.log("Loading saved weather location:", parsed);
          setIsLocal(true);
          setLocalCityName(parsed.name || "Local");
          fetchWeather(parsed.lat, parsed.long);

          // Retry City Name Fetch if it was stuck on "Local"
          if (parsed.name === "Local" || !parsed.name) {
            console.log("Retrying city name fetch...");
            fetch(
              `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${parsed.lat}&longitude=${parsed.long}&count=1&format=json`
            )
              .then((res) => res.json())
              .then((geoData) => {
                if (geoData.results && geoData.results[0]) {
                  const newName = geoData.results[0].name;
                  setLocalCityName(newName);
                  // Update storage
                  localStorage.setItem(
                    "weather_location",
                    JSON.stringify({
                      ...parsed,
                      name: newName,
                    })
                  );
                }
              })
              .catch((e) => console.error("Retry geo failed", e));
          }
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved weather", e);
      }
    }

    // If no saved local, start cycle default
    const city = MAJOR_CITIES[0];
    fetchWeather(city.lat, city.long);
  }, [fetchWeather]);

  // Cycle Effect (only if NOT local and NOT loading initial)
  useEffect(() => {
    if (isLocal) return;

    // Skip first run as it's handled by init effect or ignored if local
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % MAJOR_CITIES.length;
        const city = MAJOR_CITIES[nextIndex];
        fetchWeather(city.lat, city.long);
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isLocal, fetchWeather]);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    if (code <= 99) return "⚡";
    return "🌤️";
  };

  const handleLocate = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // 1. Immediate UI Feedback
          setIsLocal(true);
          const { latitude, longitude } = position.coords;

          // 2. Fetch Weather
          fetchWeather(latitude, longitude);

          // 3. Fetch City Name
          let cityName = "Local";
          try {
            const geoRes = await fetch(
              `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&format=json`
            );
            const geoData = await geoRes.json();
            if (geoData.results && geoData.results[0]) {
              cityName = geoData.results[0].name;
            }
          } catch (error) {
            console.error("Geocoding error", error);
            // Retry logic or keeping "Local" is fine here, user can click again
          }
          setLocalCityName(cityName);

          // 4. Persist
          localStorage.setItem(
            "weather_location",
            JSON.stringify({
              isLocal: true,
              name: cityName,
              lat: latitude,
              long: longitude,
              timestamp: Date.now(),
            })
          );
        },
        (err) => {
          console.error(err);
          setLoading(false);
          setIsLocal(false);
          alert("Could not access location. Please check permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div
      onClick={handleLocate}
      className="flex items-center space-x-4 text-xs font-bold font-mono tracking-wider text-foreground cursor-pointer transition-all group bg-background px-4 py-2 rounded-lg border border-border/60 shadow-sm hover:shadow-md hover:border-accent/30"
      title={
        isLocal
          ? `Current Location: ${localCityName}. Click to refresh.`
          : "Click to show your local weather"
      }
    >
      {/* City Label */}
      <span className="text-[10px] uppercase text-accent font-black text-center whitespace-nowrap min-w-[60px] tracking-widest">
        {isLocal ? localCityName : MAJOR_CITIES[currentIndex].name}
      </span>

      {/* Separator */}
      <div className="h-4 w-px bg-border group-hover:bg-accent/20 transition-colors"></div>

      {/* Weather Data */}
      <div className="flex items-center space-x-2 min-w-[60px] justify-end">
        {loading ? (
          <div className="h-4 w-4 rounded-full border-2 border-accent/50 border-t-transparent animate-spin"></div>
        ) : weather ? (
          <>
            <span className="text-base scale-110">
              {getWeatherIcon(weather.code)}
            </span>
            <span className="font-serif text-sm font-bold">
              {weather.temp}°
            </span>
          </>
        ) : (
          <span className="text-muted-foreground text-[10px]">--</span>
        )}
      </div>
    </div>
  );
}
