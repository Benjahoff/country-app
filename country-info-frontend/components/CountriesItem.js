// app/countries/CountriesItem.js
import Link from 'next/link';

export default function CountriesItem({ country }) {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center hover:bg-blue-200 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-2 text-black">{country.name}</h3>
      <Link href={`/countries/${country.countryCode}`} className="text-black hover:underline">
          View Details
      </Link>
    </div>
  );
}
