import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = "617f1f2f118807761e17cf5c21598540";

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { city, day } = req.query;
  if (!city || typeof city !== "string") {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherResponse.json();

       // دالة لتحويل التاريخ إلى اسم يوم
      const getDayOfWeek = (dateString: string): string => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const date = new Date(dateString);
      return days[date.getUTCDay()];
    };

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    const dayForecast = forecastData.list
    ? forecastData.list
        .filter((entry: any) => getDayOfWeek(entry.dt_txt) === day)
        .map((entry: any) => ({
          date: entry.dt_txt,
          temperature: entry.main.temp,
          humidity: entry.main.humidity,
          precipitation: entry.rain?.["3h"] || 0,
          day: new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        }))
    : [];

    return res.status(200).json({
      temperature: weatherData.main?.temp,
      humidity: weatherData.main?.humidity || "N/A",
      precipitation: weatherData.rain?.["1h"] || "0",
      weather: weatherData.weather[0]?.main,
      WeatherDescription: weatherData.weather[0]?.description,
      city: weatherData.name,
      windSpeed: weatherData.wind?.speed || "N/A",
      forecastForDay: dayForecast,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch weather data" });
  }
}
