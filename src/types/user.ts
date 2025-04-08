export type UserState = {
  nome: string;
  dataNascimento: string;
  idade: number;
  setUser: (nome: string, dataNascimento: string) => void;
  logout: () => void;
};