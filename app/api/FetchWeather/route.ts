import { apiKey } from '@/config';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lon = req.nextUrl.searchParams.get('lon');
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return new Response(JSON.stringify(data));
}
