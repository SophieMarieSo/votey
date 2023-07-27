export const trim = (text: string, limit: number, suffix?: string) => {
  return text.slice(0, limit) + (suffix ?? "...");
};
