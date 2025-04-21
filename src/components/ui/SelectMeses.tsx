'use client';

import { useSimuladorStore } from "@/store/useSimuladorStore";
import { mesesDoAno } from "@/utils/mesesDoAno";

export const SelectMeses = () => {
  const { mesInicial, mesFinal, setMesInicial, setMesFinal } = useSimuladorStore();

  return (
    <div className="mb-6">
      <p className="text-center text-yellow-1000 font-medium text-sm uppercase tracking-wider">
        Mês Inicial até Final
      </p>
      <div className="flex justify-center gap-4 mt-2 flex-wrap">
        {/* Select do Mês Inicial */}
        <div className="relative">
          <select
            value={mesInicial}
            onChange={(e) => setMesInicial(e.target.value)}
            className="appearance-none border border-yellow-500 text-yellow-400 bg-black rounded-xl px-4 py-2 pr-10 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer"
          >
            {mesesDoAno.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
          {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-yellow-400">
            ⬇️
          </div> */}
        </div>

        {/* Select do Mês Final */}
        <div className="relative">
          <select
            value={mesFinal}
            onChange={(e) => setMesFinal(e.target.value)}
            className="appearance-none border border-yellow-500 text-yellow-400 bg-black rounded-xl px-4 py-2 pr-10 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer"
          >
            {mesesDoAno.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
          {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-yellow-400">
            ⬇️
          </div> */}
        </div>
      </div>
    </div>
  );
};
