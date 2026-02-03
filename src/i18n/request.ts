import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || "en";
  try {
    const messages = await import(`@/messages/${validLocale}.json`);
    return {
      locale: validLocale,
      messages: messages.default,
    };
  } catch {
    const messages = await import(`@/messages/en.json`);
    return {
      locale: "en",
      messages: messages.default,
    };
  }
});
