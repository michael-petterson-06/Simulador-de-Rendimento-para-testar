'use client';

import { useSimuladorStore } from "@/store/useSimuladorStore";

import { mesesDoAno } from "@/utils/mesesDoAno";

export const SelectMeses = () => {

  const { mesInicial, mesFinal, setMesInicial, setMesFinal } = useSimuladorStore();

  return (
    <div className="mb-4">
      <p className="text-center text-gray-700 font-medium">Mês Inicial até Final</p>
      <div className="flex justify-center gap-4 mt-2 flex-wrap">
        <div className="relative">
          <select
            value={mesInicial}
            onChange={(e) => setMesInicial(e.target.value)}
            className="appearance-none border border-indigo-300 text-indigo-700 bg-white rounded-xl px-4 py-2 pr-10 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {mesesDoAno.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-indigo-400">
            ⬇️
          </div>
        </div>

        <div className="relative">
          <select
            value={mesFinal}
            onChange={(e) => setMesFinal(e.target.value)}
            className="appearance-none border border-indigo-300 text-indigo-700 bg-white rounded-xl px-4 py-2 pr-10 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {mesesDoAno.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-indigo-400">
            ⬇️
          </div>
        </div>
      </div>
    </div>
  );
};
