'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import CountriesItem from "./CountriesItem";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries/available`
    );
    setCountries(response.data);
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Available Countries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountriesItem key={country.countryCode} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
