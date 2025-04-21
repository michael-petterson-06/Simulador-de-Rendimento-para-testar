'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { SelectEntradaProps } from '@/types/selectEntradaProps';

const SelectEntrada = ({ tipoEntrada, setTipoEntrada, nomes }: SelectEntradaProps) => {
  const opcoes = ['Todas as Entradas', ...nomes];

  return (
    <div className="w-full">
      <Listbox value={tipoEntrada} onChange={setTipoEntrada}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-yellow-500 bg-black py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-400 font-medium transition-all duration-300">
            <span className="block truncate">{tipoEntrada}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronsUpDown className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black py-1 text-base shadow-lg ring-1 ring-yellow-500/20 focus:outline-none z-50">
              {opcoes.map((opcao, idx) => (
                <Listbox.Option
                  key={idx}
                  value={opcao}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-yellow-500 text-black' : 'text-yellow-300'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-semibold text-yellow-100' : 'font-normal'
                        }`}
                      >
                        {opcao}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Check className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectEntrada;
