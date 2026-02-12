import getReadingTime from 'reading-time';

export function readingTime(text: string): string {
  return getReadingTime(text).text;
}
