export interface FormularioPatrimonioProps {
  onSalvar: (propriedade: string, valor: number) => void;
  onCancelar: () => void;
  propriedadeInicial?: string;
  valorInicial?: string | number;
}
