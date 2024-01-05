import { apiKey } from '@/config';

export async function GET(req: string) {
  console.log('api route hit');
  console.log('request: ', req);
  const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${'gothenburg'}&limit=&appid=${apiKey}`;
  const response = await fetch(baseUrl);
  const data = await response.json();
  console.log(JSON.stringify(data));
  return new Response(JSON.stringify(data));
}
