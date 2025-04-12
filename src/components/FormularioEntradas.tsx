'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useEntradasStore } from '@/store/useEntradasStore';
import { FormularioEntradasProps } from '@/types';




export const FormularioEntradas = ({onFechar, login,  fecharFormulario,   }: FormularioEntradasProps) => {

  const [quantidadeEntradas, setQuantidadeEntradas] = useState('');
  const [nomesEntradas, setNomesEntradas] = useState('');
  const [erro, setErro] = useState('');
  const { setQuantidade, setNomes, setFormularioPreenchido } = useEntradasStore();
  const router = useRouter();

  const handleFinalizar = () => {
    const qtd = parseInt(quantidadeEntradas);
  
    if (isNaN(qtd) || qtd <= 0) {
      setErro('Insira uma quantidade válida.');
      return;
    }
  
    // Remover espaços e filtrar nomes válidos
    const novosNomes = nomesEntradas
      .split(',')
      .map((n) => n.trim().replace(/\s/g, '')) // remove espaços
      .filter(Boolean);
  
    // Verificar duplicados internos (dentro dos novos nomes)
    const nomesSet = new Set<string>();
    const nomesDuplicadosInternos: string[] = [];
  
    novosNomes.forEach((nome) => {
      if (nomesSet.has(nome)) {
        nomesDuplicadosInternos.push(nome);
      } else {
        nomesSet.add(nome);
      }
    });
  
    if (nomesDuplicadosInternos.length > 0) {
      setErro(`Nomes repetidos entre os novos: ${nomesDuplicadosInternos.join(', ')}`);
      return;
    }
  
    const novosNomesSemEspacos: string[] = Array.from(nomesSet);
  
    const nomesExistentes = useEntradasStore.getState().nomes.map((n) =>
      n.trim().replace(/\s/g, '')
    );
  
    const nomesNaoRepetidos: string[] = [];
    const nomesDuplicados: string[] = [];
  
    novosNomesSemEspacos.forEach((nome) => {
      if (nomesExistentes.includes(nome)) {
        nomesDuplicados.push(nome);
      } else {
        nomesNaoRepetidos.push(nome);
      }
    });
  
    if (nomesNaoRepetidos.length > 0) {
      setQuantidade(nomesExistentes.length + nomesNaoRepetidos.length);
      setNomes([...useEntradasStore.getState().nomes, ...nomesNaoRepetidos]);
      setFormularioPreenchido(true);
    }
  
    if (nomesDuplicados.length > 0) {
      setErro(
        `Os seguintes nomes já existiam e não foram adicionados: ${nomesDuplicados.join(', ')}`
      );
    } else {
      setErro('');
    }
  
    return true;
  };
  

  // if (!mostrarFormulario) return null;

  return (
    <div className="space-y-4">
      <Input
        type="number"
        placeholder="Quantas entradas de renda existem?"
        value={quantidadeEntradas}
        onChange={(e) => setQuantidadeEntradas(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Digite os nomes das entradas separadas por vírgulas"
        value={nomesEntradas}
        onChange={(e) => setNomesEntradas(e.target.value)}
      />

      {erro && <p className="text-red-600 text-sm font-medium">{erro}</p>}

      <div className="flex flex-col md:flex-row gap-4">
      <Button
          onClick={() => {
            const sucesso = handleFinalizar();
            if (sucesso) {
              router.push('/renda-familiar');
            }
          }}
          className="w-full text-lg bg-indigo-600 text-white"
        >
          {login === 'Login' ? 'Entrar na aplicação' : 'Salvar'}
        </Button>

        <Button
            onClick={() => {
              if (login === 'Login') {
                localStorage.removeItem('user-store');
                window.location.reload();
              } else {
                fecharFormulario?.(false);
                onFechar?.()
              }
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Voltar
          </Button>

      </div>
    </div>
  );
};
