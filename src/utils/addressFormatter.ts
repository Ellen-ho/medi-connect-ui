interface Location {
  city: string;
  line1: string;
  line2: string;
  country: string;
  postalCode: string;
  countryCode: string;
  stateProvince: string;
}

const addressFormatter = (location: Location): string => {
  const { line1, line2, city, stateProvince, postalCode, country } = location;
  return `${line1}, ${line2}, ${city}, ${stateProvince}, ${postalCode}, ${country}`;
};

export default addressFormatter;
