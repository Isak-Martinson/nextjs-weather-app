const getApiKey = () => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error('API_KEY is not set in environment variables');
  }

  return apiKey;
};

export const apiKey = getApiKey();
export const weatherApiUrl = `test`;
