export interface SelecionarEntradaParaEdicaoProps {
  onSelecionarEntrada: (entrada: { nome: string; index: number }) => void;
  onCancelar: () => void;
}