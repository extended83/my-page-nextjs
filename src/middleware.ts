import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

// matcher uruchamia middleware tylko na stronach, pomija assety, /_next, itp.
export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
