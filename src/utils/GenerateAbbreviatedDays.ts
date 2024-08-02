export default function generateAbbreviatedDays(daysObj: { [x: string]: any; }) {
  // Define a mapping of full weekday names to their abbreviations
  const dayAbbreviations: { [key: string]: string } = {
    monday: 'M',
    tuesday: 'T',
    wednesday: 'W',
    thursday: 'Th',
    friday: 'F',
    saturday: 'Sa',
    sunday: 'Su'
  };

  // Initialize an empty array to store the abbreviations
  const abbreviatedDays = [];

  // Iterate over the object and collect abbreviations for days that are true
  for (const day in daysObj) {
    if (daysObj[day]) {
      abbreviatedDays.push(dayAbbreviations[day]);
    }
  }

  // Join the abbreviations into a single string
  return abbreviatedDays.join('');
}