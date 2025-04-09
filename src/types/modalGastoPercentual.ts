import { Dispatch, SetStateAction } from 'react';

export interface ModalGastoPercentualProps {
  nome: string;
  percentual: string;
  setNome: Dispatch<SetStateAction<string>>;
  setPercentual: Dispatch<SetStateAction<string>>;
  onAdicionar: () => void;
  onCancelar: () => void;
}
