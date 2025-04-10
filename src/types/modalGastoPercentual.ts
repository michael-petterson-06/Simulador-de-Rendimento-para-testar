import { Dispatch, SetStateAction } from 'react';

export interface ModalGastoPercentualProps {
  nome: string;
  percentual: string;
  tipoEntrada: string;
  setNome: Dispatch<SetStateAction<string>>;
  setPercentual: Dispatch<SetStateAction<string>>;
  setTipoEntrada: Dispatch<SetStateAction<string>>;
  onAdicionar: () => void;
  onCancelar: () => void;
}
