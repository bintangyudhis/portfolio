import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LANG_COOKIE, type Locale } from "./i18n";

/** Read the visitor's chosen locale from the cookie (server components). */
export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(LANG_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
