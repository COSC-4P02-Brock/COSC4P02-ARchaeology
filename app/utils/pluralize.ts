export function pluralize({ plural, singular }: {
  /** The plural form of the things. */
  plural: string;

  /** The singular form of the things. */
  singular: string;
}, count: number /** The number of things. */) {
  return `${count.toLocaleString("en-CA")} ${count === 1 ? singular : plural}`;
}
