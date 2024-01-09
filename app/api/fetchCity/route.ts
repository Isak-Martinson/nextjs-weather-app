import { apiKey } from '@/config';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=${apiKey}`;
  const response = await fetch(baseUrl);
  const data = await response.json();
  return new Response(JSON.stringify(data));
}
