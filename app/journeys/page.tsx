"use client";

import axios from "axios";
import { ArrowBigLeft, Link, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";

export interface journeyItem {
  id: number;
  vehicle: Vehicle;
  country: string;
  description: string;
  departure: string;
  capacity: number | null;
  pictureUrl: string;
}

export interface Vehicle {
  id: number;
  type: string;
}

export default function PaginationExamplePage() {
  const [journeys, setJourneys] = useState<journeyItem[]>([]);
  const [numberOfRecords, setNumberOfRecords] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const limit: number = 2;

  useEffect(() => {
    async function getViewpoints() {
      const res = await axios.get(
        `http://localhost:3000/api/journeys/${actualPage}/${limit}/${searchTerm || "*"}`, 
      );
      console.log(res.headers);
      setJourneys(res.data);
      setNumberOfRecords(res.headers["number-of-records"]);
      setNumberOfPages(Math.ceil(numberOfRecords / limit) || 1);
      setActualPage(numberOfPages < actualPage ? numberOfPages : actualPage);
      console.log(actualPage, numberOfPages, numberOfRecords, searchTerm);
    }
    getViewpoints();
  }, [numberOfPages, actualPage, searchTerm, numberOfRecords]);
  return (
    <div className="justify-top flex flex-col items-center">
      {/* Input serch term */}
      <div className="m-3">
        <label className="input">
          <Search className="input-icon" />
          <input
            placeholder="Keresés..."
            required
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      
      <div className="overflow-x-auto my-6 shadow-sm rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-left text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
          <tr>
            <th className="px-4 py-3">Kép</th>
            <th className="px-4 py-3">Ország</th>
            <th className="px-4 py-3">Indulás</th>
            <th className="px-4 py-3">Jármű</th>
            <th className="px-4 py-3">Kapacitás</th>
            <th className="px-4 py-3">Leírás</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {journeys.map((journey) => (
            <tr 
              key={journey.id} 
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-4 py-4">
                <Image
                    width={100}
                    height={100}
                  src={journey.pictureUrl} 
                  alt={`Kép - ${journey.country}`} 
                  className="w-24 h-auto rounded object-cover shadow-sm" 
                />
              </td>
              <td className="px-4 py-4 font-bold text-gray-900">
                {journey.country}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {journey.departure}
              </td>
              <td className="px-4 py-4 capitalize">
                {journey.vehicle.type}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {journey.capacity !== null ? (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {journey.capacity} fő
                  </span>
                ) : (
                  <span className="text-gray-400 italic">Nincs megadva</span>
                )}
              </td>
              <td className="px-4 py-4 text-gray-600 leading-relaxed">
                {journey.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* First, previous, next, last buttons */}
      <div className="flex space-x-2">
        <button
          className="btn btn-primary"
          disabled={actualPage === 1}
          onClick={() => setActualPage(1)}
        >
            First
        </button>
        <button
          className="btn btn-primary"
          disabled={actualPage === 1}
          onClick={() => setActualPage(actualPage - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          disabled={numberOfPages === actualPage}
          onClick={() => setActualPage(actualPage + 1)}
        >
          Next
        </button>
        <button
          className="btn btn-primary"
          disabled={numberOfPages === actualPage}
          onClick={() => setActualPage(numberOfPages)}
        >
          Last
        </button>
      </div>
    </div>
  );
}
