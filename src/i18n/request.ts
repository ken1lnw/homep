import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('lang')?.value ?? 'en'; // Optional chaining for safe access
  
  // Load messages dynamically
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
