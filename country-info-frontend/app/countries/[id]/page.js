"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function CountryInfoPage() {
  const pathname = usePathname(); 
  const [countryInfo, setCountryInfo] = useState(null);

  const id = pathname.split("/").pop(); 

  useEffect(() => {
    if (!id) return;

    async function fetchCountryInfo() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries/info/${id}`
        );
        setCountryInfo(response.data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    }
    fetchCountryInfo();
  }, [id]);

  if (!countryInfo) return <div>Loading...</div>;

  const populationData = countryInfo.populationData.map((data) => ({
    year: data.year,
    population: data.value,
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img
              src={countryInfo.flagUrl}
              alt={`Flag of ${countryInfo.commonName}`}
              className="w-20 h-auto mr-4"
            />
            <h1 className="text-4xl font-bold text-black">
              {countryInfo.commonName}
            </h1>{" "}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Border Countries</h2>
            <div className="flex flex-wrap gap-2">
              {countryInfo.borders.map((borderCountry) => (
                <a
                  key={borderCountry.countryCode} 
                  href={`/countries/${borderCountry.countryCode}`}
                  className="bg-blue-100 text-black px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                >
                  {borderCountry.commonName}{" "}
                </a>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Population Over Time
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <LineChart  width={800} height={400} data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="population" stroke="#ff7300" />
                </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
