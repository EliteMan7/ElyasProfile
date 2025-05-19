import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface WeatherData {
  location: string;
  coordinates: string;
  temperature: number;
  description: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherCardProps {
  setCursorVariant: (variant: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ setCursorVariant }) => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);

  // Map OpenMeteo weather codes to OpenWeatherMap icons for consistency
  const getWeatherIcon = (weatherCode: number, isDay: boolean): string => {
    const dayTime = isDay ? 'd' : 'n';
    
    // Based on WMO weather codes: https://open-meteo.com/en/docs
    switch (weatherCode) {
      case 0: // Clear sky
        return `01${dayTime}`;
      case 1: // Mainly clear
        return `01${dayTime}`;
      case 2: // Partly cloudy
        return `02${dayTime}`;
      case 3: // Overcast
        return `04${dayTime}`;
      case 45: case 48: // Fog and rime fog
        return `50${dayTime}`;
      case 51: case 53: case 55: // Drizzle
        return `09${dayTime}`;
      case 56: case 57: // Freezing drizzle
        return `09${dayTime}`;
      case 61: case 63: // Rain slight/moderate
        return `10${dayTime}`;
      case 65: // Rain heavy
        return `09${dayTime}`;
      case 66: case 67: // Freezing rain
        return `13${dayTime}`;
      case 71: case 73: case 75: // Snow
        return `13${dayTime}`;
      case 77: // Snow grains
        return `13${dayTime}`;
      case 80: case 81: case 82: // Rain showers
        return `09${dayTime}`;
      case 85: case 86: // Snow showers
        return `13${dayTime}`;
      case 95: // Thunderstorm
        return `11${dayTime}`;
      case 96: case 99: // Thunderstorm with hail
        return `11${dayTime}`;
      default:
        return `02${dayTime}`; // Default to partly cloudy
    }
  };

  // Map weather code to readable description
  const getWeatherDescription = (weatherCode: number): string => {
    // Based on WMO weather codes: https://open-meteo.com/en/docs
    switch (weatherCode) {
      case 0: return "clear sky";
      case 1: return "mainly clear";
      case 2: return "partly cloudy";
      case 3: return "overcast";
      case 45: return "fog";
      case 48: return "depositing rime fog";
      case 51: return "light drizzle";
      case 53: return "moderate drizzle";
      case 55: return "dense drizzle";
      case 56: return "light freezing drizzle";
      case 57: return "dense freezing drizzle";
      case 61: return "slight rain";
      case 63: return "moderate rain";
      case 65: return "heavy rain";
      case 66: return "light freezing rain";
      case 67: return "heavy freezing rain";
      case 71: return "slight snow fall";
      case 73: return "moderate snow fall";
      case 75: return "heavy snow fall";
      case 77: return "snow grains";
      case 80: return "slight rain showers";
      case 81: return "moderate rain showers";
      case 82: return "violent rain showers";
      case 85: return "slight snow showers";
      case 86: return "heavy snow showers";
      case 95: return "thunderstorm";
      case 96: return "thunderstorm with slight hail";
      case 99: return "thunderstorm with heavy hail";
      default: return "unknown";
    }
  };
  
  // Get city name from coordinates using reverse geocoding
  const getCityFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      // Extract the relevant location information
      const city = data.address.city || 
                   data.address.town || 
                   data.address.village || 
                   data.address.suburb ||
                   data.address.county;
                   
      const state = data.address.state;
      
      if (city && state) {
        return `${city}, ${state}`;
      } else if (city) {
        return city;
      } else if (state) {
        return state;
      } else {
        return t('weather.unknownLocation');
      }
    } catch (err) {
      console.error('Error getting location name:', err);
      return t('weather.unknownLocation');
    }
  };

  const fetchCurrentLocationWeather = () => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUsingCurrentLocation(true);
          
          try {
            // OpenMeteo API - free, no authentication required, CORS-friendly
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timeformat=unixtime`
            );
            
            if (!response.ok) {
              throw new Error('Weather data not available');
            }
            
            const data = await response.json();
            
            // Format coordinates display
            const latDir = latitude >= 0 ? 'N' : 'S';
            const lonDir = longitude >= 0 ? 'E' : 'W';
            const latFormatted = Math.abs(latitude).toFixed(2);
            const lonFormatted = Math.abs(longitude).toFixed(2);
            const coordinates = `${latFormatted}°${latDir}, ${lonFormatted}°${lonDir}`;
            
            // Get the city name
            const locationName = await getCityFromCoordinates(latitude, longitude);
            
            // Get if it's day or night
            const now = new Date();
            const hour = now.getHours();
            const isDay = hour >= 6 && hour < 18;
            
            setWeather({
              location: locationName,
              coordinates: coordinates,
              temperature: data.current.temperature_2m,
              description: getWeatherDescription(data.current.weather_code),
              icon: getWeatherIcon(data.current.weather_code, isDay),
              feelsLike: data.current.apparent_temperature,
              humidity: data.current.relative_humidity_2m,
              windSpeed: data.current.wind_speed_10m
            });
            
            setLoading(false);
          } catch (err) {
            console.error('Error fetching weather data:', err);
            setError(t('weather.error.fetch'));
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(t('weather.error.location'));
          setLoading(false);
        }
      );
    } else {
      setError(t('weather.error.unsupported'));
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get user's current location when component mounts
    fetchCurrentLocationWeather();
  }, []);

  const handleRefreshWeather = () => {
    fetchCurrentLocationWeather();
  };

  const getIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  // Dynamic weather gradient based on weather description
  const getWeatherGradient = (icon: string | undefined) => {
    if (!icon) return 'from-primary/20 to-secondary/20';
    
    const iconPrefix = icon.slice(0, 2);
    const isDay = icon.endsWith('d');
    
    switch (iconPrefix) {
      case '01': // clear sky
        return isDay ? 'from-blue-400/30 to-yellow-300/30' : 'from-blue-900/30 to-indigo-800/30';
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return isDay ? 'from-blue-400/30 to-gray-300/30' : 'from-blue-800/30 to-gray-700/30';
      case '09': // shower rain
      case '10': // rain
        return 'from-blue-500/30 to-blue-700/30';
      case '11': // thunderstorm
        return 'from-gray-700/30 to-indigo-800/30';
      case '13': // snow
        return 'from-blue-100/30 to-gray-200/30';
      case '50': // mist
        return 'from-gray-400/30 to-gray-500/30';
      default:
        return 'from-primary/20 to-secondary/20';
    }
  };

  // Render weather icon based on the weather code
  const renderWeatherIcon = (iconCode: string) => {
    const iconPrefix = iconCode.slice(0, 2);
    const isDay = iconCode.endsWith('d');
    const iconSize = 70;
    const sunColor = "#FFD700";
    const moonColor = "#E0E0E0";
    const cloudColor = "#FFFFFF";
    const rainColor = "#73B9FF";
    const snowColor = "#FFFFFF";
    const thunderColor = "#FFD700";
    
    switch (iconPrefix) {
      case '01': // clear sky
        return isDay ? (
          // Sun
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="25" fill={sunColor} />
            <path d="M50 15V5" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M50 95V85" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M85 50H95" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M5 50H15" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M75 25L82 18" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M18 82L25 75" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M75 75L82 82" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M18 18L25 25" stroke={sunColor} strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : (
          // Moon
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 20C35 46.5097 56.4903 68 83 68C84.6569 68 86.2916 67.8989 87.9008 67.7033C83.5796 77.3007 73.403 84 61.5 84C45.2076 84 32 70.7924 32 54.5C32 42.5969 38.6993 32.4204 48.2967 28.0992C48.1011 29.7084 48 31.3431 48 33C48 33 35 20 35 20Z" fill={moonColor} />
            <circle cx="80" cy="33" r="3" fill={moonColor} />
            <circle cx="60" cy="25" r="2" fill={moonColor} />
            <circle cx="70" cy="15" r="1.5" fill={moonColor} />
          </svg>
        );
        
      case '02': // few clouds
      case '03': // scattered clouds
        return isDay ? (
          // Partly cloudy day
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="15" fill={sunColor} />
            <path d="M35 10V5" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M35 65V60" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M60 35H65" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M5 35H10" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M52 18L55 15" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M15 55L18 52" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M52 52L55 55" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M15 15L18 18" stroke={sunColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M78 45C78 39.4772 73.5228 35 68 35C65.2711 35 62.7927 36.1308 61 37.9375C61 37.9375 60.5 37 59.5 37C54.2533 37 50 41.2533 50 46.5C50.0002 46.6699 50.0135 46.8393 50.0398 47.0074C48.8435 46.386 47.4584 46 46 46C41.5817 46 38 49.5817 38 54C38 58.4183 41.5817 62 46 62H76C80.4183 62 84 58.4183 84 54C84 49.5817 80.4183 46 76 46C75.5503 46 75.1092 46.0381 74.6797 46.1122C76.1769 44.7154 77 42.7669 77 40.5C77 38.4624 76.3308 36.5912 75.1756 35.1144C76.8295 37.7505 78 40.7459 78 44V45Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          </svg>
        ) : (
          // Partly cloudy night
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 20C28 35.464 40.536 48 56 48C57.0399 48 58.0645 47.9393 59.0701 47.8221C56.2266 54.2583 49.5535 58.75 41.75 58.75C31.6447 58.75 23.5 50.6053 23.5 40.5C23.5 32.6965 28.0917 26.0234 34.5279 23.1799C34.4107 24.1855 34.35 25.2101 34.35 26.25C34.35 26.25 28 20 28 20Z" fill={moonColor} />
            <path d="M78 45C78 39.4772 73.5228 35 68 35C65.2711 35 62.7927 36.1308 61 37.9375C61 37.9375 60.5 37 59.5 37C54.2533 37 50 41.2533 50 46.5C50.0002 46.6699 50.0135 46.8393 50.0398 47.0074C48.8435 46.386 47.4584 46 46 46C41.5817 46 38 49.5817 38 54C38 58.4183 41.5817 62 46 62H76C80.4183 62 84 58.4183 84 54C84 49.5817 80.4183 46 76 46C75.5503 46 75.1092 46.0381 74.6797 46.1122C76.1769 44.7154 77 42.7669 77 40.5C77 38.4624 76.3308 36.5912 75.1756 35.1144C76.8295 37.7505 78 40.7459 78 44V45Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          </svg>
        );
        
      case '04': // broken clouds
        return (
          // Cloudy
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 35C25 29.4772 29.4772 25 35 25C37.7289 25 40.2073 26.1308 42 27.9375C42 27.9375 42.5 27 43.5 27C48.7467 27 53 31.2533 53 36.5C53.0002 36.6699 52.9865 36.8393 52.9602 37.0074C54.1565 36.386 55.5416 36 57 36C61.4183 36 65 39.5817 65 44C65 48.4183 61.4183 52 57 52H27C22.5817 52 19 48.4183 19 44C19 39.5817 22.5817 36 27 36C27.4497 36 27.8908 36.0381 28.3203 36.1122C26.8231 34.7154 26 32.7669 26 30.5C26 28.4624 26.6692 26.5912 27.8244 25.1144C26.1705 27.7505 25 30.7459 25 34V35Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            <path d="M45 55C45 50.5817 48.5817 47 53 47C55.0191 47 56.879 47.7013 58.3147 48.8441C58.3147 48.8441 58.7 48 59.5 48C63.6421 48 67 51.3579 67 55.5C67.0001 55.6359 66.9892 55.7715 66.9685 55.9059C67.9099 55.4062 68.9794 55.1 70.1 55.1C73.5749 55.1 76.4 57.9251 76.4 61.4C76.4 64.8749 73.5749 67.7 70.1 67.7H47.3C43.8251 67.7 41 64.8749 41 61.4C41 57.9251 43.8251 55.1 47.3 55.1C47.6519 55.1 47.9972 55.1305 48.3342 55.189C47.1854 54.1204 46.5 52.651 46.5 51C46.5 49.4527 47.0366 48.0474 47.956 46.9366C46.6754 49.0828 45.9 51.5578 45.9 54.2V55Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          </svg>
        );
        
      case '09': // shower rain
      case '10': // rain
        return (
          // Rain
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 35C25 29.4772 29.4772 25 35 25C37.7289 25 40.2073 26.1308 42 27.9375C42 27.9375 42.5 27 43.5 27C48.7467 27 53 31.2533 53 36.5C53.0002 36.6699 52.9865 36.8393 52.9602 37.0074C54.1565 36.386 55.5416 36 57 36C61.4183 36 65 39.5817 65 44C65 48.4183 61.4183 52 57 52H27C22.5817 52 19 48.4183 19 44C19 39.5817 22.5817 36 27 36C27.4497 36 27.8908 36.0381 28.3203 36.1122C26.8231 34.7154 26 32.7669 26 30.5C26 28.4624 26.6692 26.5912 27.8244 25.1144C26.1705 27.7505 25 30.7459 25 34V35Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            <path d="M30 60L27 70" stroke={rainColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M40 60L37 70" stroke={rainColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M50 60L47 70" stroke={rainColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M60 60L57 70" stroke={rainColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
        
      case '11': // thunderstorm
        return (
          // Thunderstorm
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 35C25 29.4772 29.4772 25 35 25C37.7289 25 40.2073 26.1308 42 27.9375C42 27.9375 42.5 27 43.5 27C48.7467 27 53 31.2533 53 36.5C53.0002 36.6699 52.9865 36.8393 52.9602 37.0074C54.1565 36.386 55.5416 36 57 36C61.4183 36 65 39.5817 65 44C65 48.4183 61.4183 52 57 52H27C22.5817 52 19 48.4183 19 44C19 39.5817 22.5817 36 27 36C27.4497 36 27.8908 36.0381 28.3203 36.1122C26.8231 34.7154 26 32.7669 26 30.5C26 28.4624 26.6692 26.5912 27.8244 25.1144C26.1705 27.7505 25 30.7459 25 34V35Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            <path d="M45 55L35 70" stroke={rainColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M60 55L50 70" stroke={rainColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M50 52L42 62H53L45 75" stroke={thunderColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
        
      case '13': // snow
        return (
          // Snow
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 35C25 29.4772 29.4772 25 35 25C37.7289 25 40.2073 26.1308 42 27.9375C42 27.9375 42.5 27 43.5 27C48.7467 27 53 31.2533 53 36.5C53.0002 36.6699 52.9865 36.8393 52.9602 37.0074C54.1565 36.386 55.5416 36 57 36C61.4183 36 65 39.5817 65 44C65 48.4183 61.4183 52 57 52H27C22.5817 52 19 48.4183 19 44C19 39.5817 22.5817 36 27 36C27.4497 36 27.8908 36.0381 28.3203 36.1122C26.8231 34.7154 26 32.7669 26 30.5C26 28.4624 26.6692 26.5912 27.8244 25.1144C26.1705 27.7505 25 30.7459 25 34V35Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            <circle cx="30" cy="60" r="2" fill={snowColor} />
            <circle cx="30" cy="70" r="2" fill={snowColor} />
            <circle cx="40" cy="65" r="2" fill={snowColor} />
            <circle cx="50" cy="60" r="2" fill={snowColor} />
            <circle cx="50" cy="70" r="2" fill={snowColor} />
            <circle cx="60" cy="65" r="2" fill={snowColor} />
            <path d="M30 60V70" stroke={snowColor} strokeWidth="1" strokeLinecap="round" />
            <path d="M50 60V70" stroke={snowColor} strokeWidth="1" strokeLinecap="round" />
            <path d="M25 65H35" stroke={snowColor} strokeWidth="1" strokeLinecap="round" />
            <path d="M45 65H55" stroke={snowColor} strokeWidth="1" strokeLinecap="round" />
          </svg>
        );
        
      case '50': // mist
        return (
          // Mist
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40H80" stroke={cloudColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M25 50H75" stroke={cloudColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M30 60H70" stroke={cloudColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M25 30H65" stroke={cloudColor} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
        
      default:
        // Default to partly cloudy
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="15" fill={sunColor} />
            <path d="M78 45C78 39.4772 73.5228 35 68 35C65.2711 35 62.7927 36.1308 61 37.9375C61 37.9375 60.5 37 59.5 37C54.2533 37 50 41.2533 50 46.5C50.0002 46.6699 50.0135 46.8393 50.0398 47.0074C48.8435 46.386 47.4584 46 46 46C41.5817 46 38 49.5817 38 54C38 58.4183 41.5817 62 46 62H76C80.4183 62 84 58.4183 84 54C84 49.5817 80.4183 46 76 46C75.5503 46 75.1092 46.0381 74.6797 46.1122C76.1769 44.7154 77 42.7669 77 40.5C77 38.4624 76.3308 36.5912 75.1756 35.1144C76.8295 37.7505 78 40.7459 78 44V45Z" fill={cloudColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="glassmorphism rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
        onMouseEnter={() => setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <motion.h3 
              className="text-xl md:text-2xl font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-primary">{t('weather.current')}</span> <span className="text-secondary">{t('weather.weather')}</span>
            </motion.h3>
            <motion.button
              onClick={handleRefreshWeather}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              title={t('weather.refresh')}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          {usingCurrentLocation && weather && (
            <motion.div 
              className="mb-3 text-xs text-primary flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>{t('weather.liveData')}</span>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <motion.div 
                className="h-10 w-10"
                animate={{ 
                  rotate: 360,
                  borderRadius: ["20% 50% 20% 50%", "50% 20% 50% 20%"] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <div className="h-full w-full bg-gradient-to-r from-primary to-secondary rounded-md"></div>
              </motion.div>
            </div>
          ) : error ? (
            <motion.div 
              className="text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-red-400 mb-3">{error}</p>
              <motion.button 
                onClick={handleRefreshWeather}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('weather.tryAgain')}
              </motion.button>
            </motion.div>
          ) : weather ? (
            <div>
              <div className="flex flex-col mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="text-base font-medium">{weather.location}</p>
                  <p className="text-xs text-text/60 mt-0.5">{weather.coordinates}</p>
                </motion.div>
              </div>

              <div className="flex items-start justify-between">
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <span className="text-6xl font-bold tracking-tighter">{Math.round(weather.temperature)}</span>
                    <span className="text-xl mt-1">°F</span>
                  </div>
                  <p className="text-base capitalize mt-0.5">{weather.description}</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)" }}
                >
                  {renderWeatherIcon(weather.icon)}
                </motion.div>
              </div>
              
              <motion.div 
                className="grid grid-cols-3 gap-2 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div 
                  className="glass-card p-3 rounded-xl text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="text-xs opacity-70 mb-1">{t('weather.feelsLike')}</p>
                  <p className="text-lg font-medium">{Math.round(weather.feelsLike)}<span className="text-xs align-text-top ml-0.5">°</span></p>
                </motion.div>
                <motion.div 
                  className="glass-card p-3 rounded-xl text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xs opacity-70 mb-1">{t('weather.humidity')}</p>
                  <p className="text-lg font-medium">{Math.round(weather.humidity)}<span className="text-xs align-text-top ml-0.5">%</span></p>
                </motion.div>
                <motion.div 
                  className="glass-card p-3 rounded-xl text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs opacity-70 mb-1">{t('weather.wind')}</p>
                  <p className="text-lg font-medium">{Math.round(weather.windSpeed)}<span className="text-xs align-text-top ml-0.5">mph</span></p>
                </motion.div>
              </motion.div>
            </div>
          ) : null}
        </div>
        
        <motion.div 
          className={`px-6 py-3 bg-gradient-to-r ${weather ? getWeatherGradient(weather.icon) : 'from-primary/20 to-secondary/20'} text-xs text-center backdrop-blur-sm`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-1">
            <span className="opacity-80">{t('weather.dataBy')}</span>
            <span className="font-semibold">Open-Meteo</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherCard; 