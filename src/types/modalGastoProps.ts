import { Dispatch, SetStateAction } from 'react';
import { Gasto } from './simulador';

export type ModalGastoProps = {
  index?: number;
  gasto?: Gasto;
  nomeGasto: string;
  valorGasto: string;
  setNomeGasto: Dispatch<SetStateAction<string>>;
  setValorGasto: Dispatch<SetStateAction<string>>;
  onAdicionar: () => void;
  onCancelar: () => void;
  onClose?: () => void;
  isEditing?: boolean;
};
