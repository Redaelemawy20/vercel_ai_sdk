"use client";

import { use } from "react";

export default function ArabSingersList({
  arabListPromise,
}: {
  arabListPromise: Promise<any>;
}) {
  const { data: singers } = use(arabListPromise);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Famous Arab Singers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {singers.map((singer: any) => (
          <div
            key={singer.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {singer.name}
              </h3>
              <p className="text-2xl text-gray-600 mb-1">{singer.arabicName}</p>
              <p className="text-sm text-gray-500">{singer.country}</p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-600">
                  Era:
                </span>
                <p className="text-sm text-gray-700">{singer.era}</p>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-600">
                  Genre:
                </span>
                <p className="text-sm text-gray-700">{singer.genre}</p>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-600">
                  Famous Songs:
                </span>
                <ul className="text-sm text-gray-700 mt-1">
                  {singer.famousSongs.map((song: string, index: number) => (
                    <li key={index} className="ml-2">
                      • {song}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-600">
                  Description:
                </span>
                <p className="text-sm text-gray-700 mt-1 italic">
                  {singer.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
