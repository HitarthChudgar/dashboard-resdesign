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
  backgroundImage = "/nobutoronto.png",
  workspaceLogo = "/nobu.png",
  workspaceName = "Nobu Residences Toronto",
  cityName = "Toronto",
}: WorkspaceHeaderProps) {
  const [weather, setWeather] = useState<{
    temperature: number | null;
    condition: string;
    icon: JSX.Element;
  }>({
    temperature: null,
    condition: "",
    icon: <Cloud className="h-5 w-5" />,
  });

  useEffect(() => {
    async function fetchWeather() {

      try {
        const baseUrl = "https://api.openweathermap.org";
        const geocodeEndpoint = `${baseUrl}/geo/1.0/direct?q=${encodeURIComponent(
          cityName
        )}&limit=1&appid=${API_KEY}`;

        const geocodeResponse = await fetch(geocodeEndpoint);
        const geocodeData = await geocodeResponse.json();

        if (geocodeResponse.ok && geocodeData.length > 0) {
          const { lat, lon } = geocodeData[0] || {};

          if (lat !== undefined && lon !== undefined) {
            const weatherEndpoint = `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
            const weatherResponse = await fetch(weatherEndpoint);
            const weatherData = await weatherResponse.json();

            if (weatherResponse.ok && weatherData?.main?.temp !== undefined) {
              setWeather({
                temperature: Math.round(weatherData.main.temp),
                condition: weatherData.weather?.[0]?.main || "Unknown",
                icon: conditionMapping[
                  weatherData.weather?.[0]?.main || ""
                ] || <Cloud className="h-5 w-5" />,
              });
            } else {
              console.error("Weather API error:", weatherData);
              setWeather({
                temperature: null,
                condition: "Error",
                icon: <Cloud className="h-5 w-5" />,
              });
            }
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
