import React from 'react';

import Image from 'next/image';

type ContentProps = {
  temperature: any;
  humidity: number | string;
  city: string;
  setCity: (newCity: string) => void;
  windSpeed: number;
  precipitation: number;
  weather: string;
  WeatherDescription: string;
};

const capitals = [
  "Gaza","Abu Dhabi", "Accra", "Addis Ababa", "Algiers", "Amman", "Amsterdam", "Ankara", 
  "Asunción", "Athens", "Baghdad", "Baku", "Bangkok", "Beijing", "Beirut", "Belgrade", 
  "Berlin", "Bern", "Bogotá", "Brasília", "Bratislava", "Brussels", "Bucharest", 
  "Budapest", "Buenos Aires", "Cairo", "Canberra", "Caracas", "Castries", "Chisinau", 
  "Colombo", "Conakry", "Copenhagen", "Dakar", "Damascus", "Dhaka", "Dili", "Djibouti", 
  "Dodoma", "Doha", "Dublin", "Dushanbe", "Freetown", "Gaborone", "Georgetown", "Guatemala City", 
  "Hanoi", "Harare", "Havana", "Helsinki", "Honiara", "Islamabad", "Jakarta", "Jerusalem", 
  "Kabul", "Kampala", "Kathmandu", "Khartoum", "Kigali", "Kingston", "Kinshasa", "Kuala Lumpur", 
  "Kuwait City", "Libreville", "Lilongwe", "Lima", "Lisbon", "Ljubljana", "Lomé", "London", 
  "Luanda", "Lusaka", "Luxembourg", "Madrid", "Majuro", "Malabo", "Malé", "Managua", "Manama", 
  "Manila", "Maputo", "Maseru", "Mbabane", "Mexico City", "Minsk", "Mogadishu", "Monaco", 
  "Monrovia", "Montevideo", "Moroni", "Moscow", "Muscat", "Nairobi", "Nassau", "Naypyidaw", 
  "New Delhi", "Niamey", "Nicosia", "Nouakchott", "Nukuʻalofa", "Oslo", "Ottawa", "Ouagadougou", 
  "Palikir", "Panama City", "Paramaribo", "Paris", "Phnom Penh", "Podgorica", "Port Louis", 
  "Port Moresby", "Port-au-Prince", "Port of Spain", "Porto-Novo", "Prague", "Pretoria", 
  "Pyongyang", "Quito", "Rabat", "Reykjavik", "Riga", "Riyadh", "Rome", "Roseau", "Saint George's", 
  "Saint John's", "San José", "San Marino", "San Salvador", "Sana'a", "Santiago", "Santo Domingo", 
  "Sarajevo", "Seoul", "Singapore", "Skopje", "Sofia", "Stockholm", "Suva", "Tallinn", "Tarawa", 
  "Tashkent", "Tbilisi", "Tegucigalpa", "Tehran", "Thimphu", "Tirana", "Tokyo", "Tripoli", 
  "Tunis", "Ulaanbaatar", "Vaduz", "Valletta", "Vatican City", "Victoria", "Vienna", "Vientiane", 
  "Vilnius", "Warsaw", "Washington", "Wellington", "Windhoek", "Yamoussoukro", "Yaoundé", "Zagreb"
];


function getCurrentDayName() {
  const today = new Date(); // تحويل النص إلى كائن Date
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[today.getDay()];
}

function getDayName(offset: number = 0): string {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const index = (today.getDay() + offset) % 7;
  return days[index].substring(0, 3); // يعيد أول 3 أحرف من اسم اليوم
}

function formatDate() {
  const today = new Date();
  const day = today.getDate(); // يوم الشهر
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[today.getMonth()]; // اسم الشهر المختصر
  const year = today.getFullYear(); // السنة

  return `${day}-${month}-${year}`;
}

const Content: React.FC<ContentProps> = ({
  WeatherDescription, weather, precipitation, windSpeed, temperature, humidity, setCity,city
}) => {

  const getWeatherImage = (description: string) => {
    if(!description)return "/Sun.svg"; 
    if (description.includes("Clear")) return "/Sun.svg"; // صورة الشمس
    if (description.includes("Clouds")) return "/bi_cloud-sun.svg"; // صورة السحاب
    if (description.includes("Rain")) return "/bi_cloud-rain.svg"; // صورة المطر
    if (description.includes("Haze")) return "/bi_cloud-sun.svg"; // صورة الضباب
    if (description.includes("Sand")) return "/Sun.svg"; // صورة الضباب
    return "/Sun.svg";
  };

  const weatherImage = getWeatherImage(weather);

  return (
    <div className="relative w-[1440px]">
      <div>
        <Image
          alt="Rectangle 2"
          src="/Rectangle 2.svg"
          width={420}
          height={566}
          className="absolute top-[38px] left-[220px] z-[10]"
        />
        <div>
          <div className='flex flex-col ml-[250px] absolute top-[70px] gap-1 z-10 text-white'>
            <span className='font-medium text-[35px] tracking-wide'>{getCurrentDayName()}</span>
            <span>{formatDate()}</span>
            <div className='flex gap-2'>
              <Image src="/Location.svg" alt='Location' width={20} height={20} />
              <span>{city}</span>
            </div>
          </div>
          <div className='flex flex-col ml-[250px] absolute top-[400px] gap-1 z-10 text-white'>
            <Image
              alt={WeatherDescription}
              src={weatherImage}
              width={60}
              height={30}
            />
            <span className='font-medium text-[35px] tracking-wide'>{temperature} °C</span>
            <span className='font-medium text-[25px]'>{weather}</span>
          </div>
        </div>
      </div>
      <div>
        <Image
          alt="Rectangle 1"
          src="/Rectangle 1.svg"
          width={800}
          height={566}
          className="absolute top-[60px] left-[289px]"
        />
        <div className='tracking-wide text-white flex flex-col gap-6 absolute top-[100px] left-[700px]'>
          <div className='flex justify-between gap-[180px]'>
            <label>PRECIPITATION</label>
            <span>{precipitation}%</span>
          </div>
          <div className='flex justify-between gap-[180px]'>
            <label>HUMIDITY</label>
            <span>{humidity}%</span>
          </div>
          <div className='flex justify-between gap-[180px]'>
            <label>WIND</label>
            <span>{windSpeed} Km/h</span>
          </div>
        </div>
        <div className='flex w-[800px] flex-row'>
          <div className='w-[103px] h-[165px] bg-primary rounded-[6px] absolute top-[280px] left-[655px]'>
            <Image
              src={weatherImage}
              alt={WeatherDescription}
              width={50}
              height={50}
              className='pt-3 ml-7 flex flex-col flex-wrap'/>
            <div className=' text-[23px] ml-8 text-white pt-2'>{getDayName(0)}</div>
            <span className='font-medium text-[24px] p-2  text-white'>{temperature} °C</span>
          </div>
          <div className='w-[103px] h-[165px] bg-primary rounded-[6px] absolute top-[280px] left-[760px]'>
            <Image
              src={weatherImage}
              alt='sun image'
              width={50}
              height={50}
              className='pt-3 ml-7 flex flex-col flex-wrap'/>
            <div className=' text-[23px] ml-8 text-white pt-2'>{getDayName(1)}</div>
            <span className='font-medium text-[24px] p-2  text-white'>{temperature+1} °C</span>
          </div>
          <div className='w-[103px] h-[165px] bg-primary rounded-[6px] absolute top-[280px] left-[865px]'>
            <Image
              src="/bi_cloud-rain.svg"
              alt='sun image'
              width={50}
              height={50}
              className='pt-3 ml-7 flex flex-col flex-wrap'/>
            <div className=' text-[23px] ml-8 text-white pt-2'>{getDayName(2)}</div>
            <span className='font-medium text-[24px] p-2  text-white'>{temperature - 0.5} °C</span>
          </div>
          <div className='w-[103px] h-[165px] bg-primary rounded-[6px] absolute top-[280px] left-[970px]'>
            <Image
              src="/Sun.svg"
              alt='sun image'
              width={50}
              height={50}
              className='pt-3 ml-7 flex flex-col flex-wrap'/>
            <div className=' text-[23px] ml-8 text-white pt-2'>{getDayName(3)}</div>
            <span className='font-medium text-[24px] p-2  text-white'>{temperature} °C</span>
          </div>
        </div>
        <div className='cursor-pointer flex items-center w-[415px] h-[53px] rounded-[6px] bg-gradient-to-b from-custom_start to-custom_end absolute mt-[500px] ml-[660px] text-white'>
          <Image
            src="/Location.svg"
            alt='Location'
            width={30}
            height={30}
            className='m-1 ml-[10px]'/>
              <label className='w-[200px] mt-1 text-[21px]' htmlFor="city-select">Change Location </label>
              <select
                id="city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)} // تحديث المدينة عند الاختيار
                className='bg bg-gradient-to-b w-[200px] h-[50px] rounded-[6px] p-2 text-[25px] cursor-pointer'
              >
                {capitals.map((capital) => (
                  <option key={capital} value={capital} className='text-black'>
                    {capital}
                  </option>
                ))}
              </select>
        </div>
      </div>
    </div>
  );
}

export default Content;
