"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Tornado,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WorkspaceHeaderProps {
  backgroundImage?: string;
  workspaceLogo?: string;
  workspaceName?: string;
  cityName?: string;
}

const conditionMapping: { [key: string]: JSX.Element } = {
  Clear: <Sun className="h-5 w-5" />,
  Clouds: <Cloud className="h-5 w-5" />,
  Rain: <CloudRain className="h-5 w-5" />,
  Snow: <CloudSnow className="h-5 w-5" />,
  Thunderstorm: <CloudLightning className="h-5 w-5" />,
  Drizzle: <CloudDrizzle className="h-5 w-5" />,
  Dust: <Wind className="h-5 w-5" />,
  Sand: <Wind className="h-5 w-5" />,
  Squall: <Wind className="h-5 w-5" />,
  Tornado: <Tornado className="h-5 w-5" />,
};

export default function WorkspaceHeader({
  backgroundImage = "/queensubway.jpg",
  workspaceLogo = "/nobu.png",
  workspaceName = "Nobu Residences Toronto",
  cityName = "Toronto",
}: WorkspaceHeaderProps) {
  const [weather, setWeather] = useState({
    temperature: null,
    condition: "",
    icon: <Cloud className="h-5 w-5" />, // Default icon
  });

  useEffect(() => {
    async function fetchWeather() {
      const API_KEY = "1211f45d277089e1867a0de5d0dc103c";

      // Fetch the latitude and longitude of the city
      const geocodeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
      try {
        const geocodeResponse = await fetch(geocodeEndpoint);
        const geocodeData = await geocodeResponse.json();

        if (geocodeResponse.ok && geocodeData.length > 0) {
          const { lat, lon } = geocodeData[0];

          // Step 2: Use latitude and longitude to fetch weather data
          const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
          const weatherResponse = await fetch(weatherEndpoint);
          const weatherData = await weatherResponse.json();

          if (weatherResponse.ok) {
            setWeather({
              temperature: Math.round(weatherData.main.temp),
              condition: weatherData.weather[0].main,
              icon: conditionMapping[weatherData.weather[0].main] || (
                <Cloud className="h-5 w-5" />
              ),
            });
          } else {
            console.error("Weather API error:", weatherData);
            setWeather({
              temperature: null,
              condition: "Error",
              icon: <Cloud className="h-5 w-5" />,
            });
          }
        } else {
          console.error("Geocode API error or city not found:", geocodeData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setWeather({
          temperature: null,
          condition: "Error",
          icon: <Cloud className="h-5 w-5" />,
        });
      }
    }

    fetchWeather();
  }, [cityName]);

  return (
    <Card className="relative w-full h-[140px] overflow-hidden border-0 rounded-xl border-gray-200 shadow-none">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center 75%",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content Container */}
      <CardContent className="relative h-full p-4 flex justify-between text-white">
        {/* Left Side - Logo */}
        <div className="flex flex-col justify-end">
          <img
            src={workspaceLogo}
            alt="Workspace Logo"
            className="h-10 w-auto object-contain rounded-lg"
          />
        </div>

        {/* Right Side - Weather & Name */}
        <div className="flex flex-col gap-1 items-end justify-end">
          {/* Weather */}
          <div className="flex items-center gap-2">
            {weather.icon}
            <span className="text-lg">
              {weather.temperature !== null
                ? `${weather.temperature}° C ${cityName}, ${weather.condition}`
                : "Loading..."}
            </span>
          </div>

          {/* Workspace Name */}
          <h1 className="text-2xl font-medium">{workspaceName}</h1>
        </div>
      </CardContent>
    </Card>
  );
}
