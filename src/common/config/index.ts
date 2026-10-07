import Constants from 'expo-constants';

const MOCK_API_PORT = 3000;

function resolveApiUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  // Expo Go reaches the dev machine through the same host that serves the bundle.
  const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
  return `http://${host}:${MOCK_API_PORT}`;
}

export const config = {
  apiUrl: resolveApiUrl(),
};
