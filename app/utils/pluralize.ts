/**
 * Given a count, return the count and the correct pluralization of the word.
 * Uses the Canadian English locale for number formatting.
 */
export function pluralize(
  { plural, singular }: {
    /** The plural form of the things. */
    plural: string;

    /** The singular form of the things. */
    singular: string;
  }, 
  
  /** The number of the things. */
  count: number
) {
  return `${count.toLocaleString("en-CA")} ${count === 1 ? singular : plural}`;
}
