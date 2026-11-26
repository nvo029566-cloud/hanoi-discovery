"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  conditionVi: string;
  conditionEn: string;
  icon: string;
  adviceVi: string;
  adviceEn: string;
  aqi: number;
  aqiStatusVi: string;
  aqiStatusEn: string;
}

const FALLBACK_WEATHER: WeatherData = {
  temp: 24,
  feelsLike: 25,
  humidity: 72,
  windSpeed: 12,
  conditionVi: "Nắng nhẹ & mát mẻ",
  conditionEn: "Mild & pleasant sunshine",
  icon: "🌤️",
  adviceVi: "Thời tiết lý tưởng để dạo quanh Hồ Gươm, thưởng thức cà phê vỉa hè và khám phá phố cổ.",
  adviceEn: "Ideal weather for a stroll around Hoan Kiem Lake, curbside coffee, and exploring the Old Quarter.",
  aqi: 65,
  aqiStatusVi: "Trung bình (Thích hợp dạo phố)",
  aqiStatusEn: "Moderate (Good for outdoor walk)",
};

function parseWmoCode(code: number): { vi: string; en: string; icon: string } {
  if (code === 0) return { vi: "Trời quang đãng", en: "Clear sky", icon: "☀️" };
  if (code <= 3) return { vi: "Có mây nhẹ", en: "Partly cloudy", icon: "🌤️" };
  if (code === 45 || code === 48) return { vi: "Sương mù bảng lảng", en: "Misty & Foggy", icon: "🌫️" };
  if (code >= 51 && code <= 55) return { vi: "Mưa phùn nhẹ", en: "Light drizzle", icon: "🌦️" };
  if (code >= 61 && code <= 65) return { vi: "Có mưa rải rác", en: "Scattered rain", icon: "🌧️" };
  if (code >= 80 && code <= 82) return { vi: "Mưa rào thoáng qua", en: "Passing rain showers", icon: "🌦️" };
  if (code >= 95) return { vi: "Có dông", en: "Thunderstorm", icon: "⛈️" };
  return { vi: "Thời tiết êm dịu", en: "Mild weather", icon: "⛅" };
}

export function HanoiWeatherWidget({ locale = "vi" }: { locale?: Locale }) {
  const [weather, setWeather] = useState<WeatherData>(FALLBACK_WEATHER);

  useEffect(() => {
    let mounted = true;
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Weather request failed");
        const json = await res.json();
        const current = json.current;
        if (!current) throw new Error("No current data");

        const cond = parseWmoCode(current.weather_code ?? 0);
        const temp = Math.round(current.temperature_2m);
        const feelsLike = Math.round(current.apparent_temperature ?? temp);
        const humidity = Math.round(current.relative_humidity_2m ?? 70);
        const windSpeed = Math.round(current.wind_speed_10m ?? 10);

        let adviceVi = "Thời tiết tuyệt vời để ghé thăm các di tích ngoài trời và thưởng thức ẩm thực hè phố.";
        let adviceEn = "Great weather for outdoor monuments and vibrant street food discovery.";
        if (temp > 30) {
          adviceVi = "Trời ấm nóng, bạn nên mang theo mũ nón, nước uống và ghé thăm bảo tàng vào buổi trưa.";
          adviceEn = "Warm day: carry water, sunscreen, and visit indoor museums during midday hours.";
        } else if (temp < 18) {
          adviceVi = "Trời se lạnh, nhớ khoác thêm áo ấm nhẹ khi dạo phố đêm và nhâm nhi một bát phở nóng.";
          adviceEn = "Cool weather: bring a light jacket for evening strolls and enjoy a steaming bowl of pho.";
        }

        if (mounted) {
          setWeather({
            temp,
            feelsLike,
            humidity,
            windSpeed,
            conditionVi: cond.vi,
            conditionEn: cond.en,
            icon: cond.icon,
            adviceVi,
            adviceEn,
            aqi: 68,
            aqiStatusVi: "Trung bình (Thích hợp dạo chơi)",
            aqiStatusEn: "Moderate (Great for walking)",
          });
        }
      } catch {
        // use fallback weather
      }
    }

    fetchWeather();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-border/80 bg-gradient-to-br from-surface to-background p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Location & Current Temp */}
        <div className="flex items-center gap-4">
          <span className="text-4xl sm:text-5xl" aria-hidden="true">
            {weather.icon}
          </span>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {weather.temp}°C
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                {locale === "vi" ? `(Cảm giác như ${weather.feelsLike}°C)` : `(Feels like ${weather.feelsLike}°C)`}
              </span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {locale === "vi" ? weather.conditionVi : weather.conditionEn}
              {" • "}
              <span className="text-muted-foreground">Hà Nội</span>
            </p>
          </div>
        </div>

        {/* Right: Key metrics */}
        <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-6 text-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {locale === "vi" ? "Độ ẩm" : "Humidity"}
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {locale === "vi" ? "Gió" : "Wind"}
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">{weather.windSpeed} km/h</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              AQI
            </p>
            <p className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {weather.aqi}
            </p>
          </div>
        </div>
      </div>

      {/* Travel advice recommendation */}
      <div className="mt-4 flex items-start gap-2 rounded-[12px] bg-primary/5 px-3.5 py-2.5 text-xs text-foreground/90 border border-primary/10">
        <span className="text-sm">💡</span>
        <p className="leading-relaxed">
          <strong className="text-primary">{locale === "vi" ? "Gợi ý du lịch:" : "Travel Tip:"} </strong>
          {locale === "vi" ? weather.adviceVi : weather.adviceEn}
        </p>
      </div>
    </div>
  );
}
