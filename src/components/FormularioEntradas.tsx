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
  
    // Processar os novos nomes (limpar espaços e remover vazios)
    const novosNomesBrutos = nomesEntradas
      .split(',')
      .map((n) => n.trim()) // agora só remove espaços extras do início/fim
      .filter(Boolean);

    if (novosNomesBrutos.length !== qtd) {
      setErro(`Você informou ${qtd} entradas, mas digitou ${novosNomesBrutos.length} nome(s).`);
      return;
    }
    
  
    // Verificar duplicados internos nos novos nomes
    const nomesUnicosSet = new Set<string>();
    const nomesDuplicadosInternos: string[] = [];
  
    novosNomesBrutos.forEach((nome) => {
      if (nomesUnicosSet.has(nome)) {
        nomesDuplicadosInternos.push(nome);
      } else {
        nomesUnicosSet.add(nome);
      }
    });
  
    if (nomesDuplicadosInternos.length > 0) {
      setErro(`Os seguintes nomes estão duplicados na lista: ${nomesDuplicadosInternos.join(', ')}`);
      return;
    }
  
    const novosNomes = Array.from(nomesUnicosSet);
  
    // Obter os nomes já existentes do store (normalizados)
    const nomesExistentesOriginais = useEntradasStore.getState().nomes;
    const nomesExistentesNormalizados = nomesExistentesOriginais.map((n) => n.trim());
  
    // Separar nomes novos e já cadastrados
    const nomesNaoCadastrados: string[] = [];
    const nomesRepetidos: string[] = [];
  
    novosNomes.forEach((nome) => {
      if (nomesExistentesNormalizados.includes(nome)) {
        nomesRepetidos.push(nome);
      } else {
        nomesNaoCadastrados.push(nome);
      }
    });
  
    if (nomesNaoCadastrados.length > 0) {
      const novosNomesFinal = [...nomesExistentesOriginais, ...nomesNaoCadastrados];
      setQuantidade(novosNomesFinal.length);
      setNomes(novosNomesFinal);
      setFormularioPreenchido(true);
      fecharFormulario?.(false);
      onFechar?.();
    }
  
    if (nomesRepetidos.length > 0) {
      setErro(`Os seguintes nomes já existem e foram ignorados: ${nomesRepetidos.join(', ')}`);
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
