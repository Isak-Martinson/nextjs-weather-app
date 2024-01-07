import { apiKey } from '@/config';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=${apiKey}`;
  const response = await fetch(baseUrl);
  const data = await response.json();
  const lat = JSON.stringify(data[0].lat);
  const lon = JSON.stringify(data[0].lon);
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const responseTwo = await fetch(weatherUrl);
  const dataTwo = await responseTwo.json();
  return new Response(JSON.stringify(dataTwo));
}
