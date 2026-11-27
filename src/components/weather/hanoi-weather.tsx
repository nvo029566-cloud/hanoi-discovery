"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";

interface WeatherData {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

function weatherLabel(code: number, isEn: boolean) {
  if (code === 0) return isEn ? "Clear sky" : "Trời quang";
  if (code <= 3) return isEn ? "Cloudy" : "Có mây";
  if (code === 45 || code === 48) return isEn ? "Fog" : "Có sương mù";
  if (code >= 95) return isEn ? "Thunderstorm" : "Có dông";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return isEn ? "Rain" : "Có mưa";
  return isEn ? "Variable conditions" : "Thời tiết thay đổi";
}

export function HanoiWeatherWidget({ locale = "vi" }: { locale?: Locale }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);
  const isEn = locale === "en";

  useEffect(() => {
    const controller = new AbortController();
    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FBangkok",
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Weather request failed");
        const { current } = await response.json() as { current?: WeatherData };
        if (!current || typeof current.time !== "string"
          || ![current.temperature_2m, current.apparent_temperature, current.relative_humidity_2m, current.wind_speed_10m, current.weather_code].every(Number.isFinite)) {
          throw new Error("Incomplete current weather");
        }
        setWeather(current);
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      }
    }

    void loadWeather();
    return () => controller.abort();
  }, []);

  return (
    <section aria-label={isEn ? "Hanoi weather" : "Thời tiết Hà Nội"} className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-semibold">{isEn ? "Hanoi weather" : "Thời tiết Hà Nội"}</h2>
          {weather ? (
            <p className="mt-1 text-sm text-muted-foreground">
              <strong className="mr-2 text-2xl text-primary">{Math.round(weather.temperature_2m)}°C</strong>
              {weatherLabel(weather.weather_code, isEn)}
            </p>
          ) : (
            <p role="status" className="mt-2 text-sm text-muted-foreground">
              {failed
                ? (isEn ? "Current weather is unavailable." : "Chưa lấy được dữ liệu thời tiết hiện tại.")
                : (isEn ? "Loading current conditions…" : "Đang tải thời tiết hiện tại…")}
            </p>
          )}
        </div>
        {weather && (
          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-muted-foreground">{isEn ? "Feels like" : "Cảm giác như"}</dt><dd className="font-semibold">{Math.round(weather.apparent_temperature)}°C</dd></div>
            <div><dt className="text-muted-foreground">{isEn ? "Humidity" : "Độ ẩm"}</dt><dd className="font-semibold">{weather.relative_humidity_2m}%</dd></div>
            <div><dt className="text-muted-foreground">{isEn ? "Wind" : "Gió"}</dt><dd className="font-semibold">{Math.round(weather.wind_speed_10m)} km/h</dd></div>
          </dl>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        <a href="https://open-meteo.com/" className="underline underline-offset-2">Open-Meteo</a>
        {weather && (
          <> · {isEn ? "Data time" : "Thời điểm dữ liệu"}{" "}
            <time dateTime={weather.time + "+07:00"}>{weather.time.replace("T", " ")} (UTC+7)</time>
          </>
        )}
      </p>
    </section>
  );
}
