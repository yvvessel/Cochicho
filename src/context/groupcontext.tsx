import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

export type Mensagem = {
  id: number;
  texto: string;
  enviadoPorMim: boolean;
  timestamp: number;
};

export type Grupo = {
  id: string;
  nomeGrupo: string;
  fotoGrupo: string;
  membrosGrupo: string[];
  mensagens: Mensagem[];
};

type GrupoContextTipo = {
  grupos: Grupo[];
  setGrupos: React.Dispatch<React.SetStateAction<Grupo[]>>;
  adicionarGrupo: (grupo: Grupo) => void;
  atualizarGrupo: (id: string, grupoAtualizado: Partial<Grupo>) => void;
  adicionarMensagem: (grupoId: string, mensagem: Mensagem) => void;
  obterGrupo: (id: string) => Grupo | undefined;
  deletarGrupo: (id: string) => void;
};

type ProviderProps = {
  children: ReactNode;
};

export const GrupoContext = createContext<GrupoContextTipo>({
  grupos: [],
  setGrupos: () => {},
  adicionarGrupo: () => {},
  atualizarGrupo: () => {},
  adicionarMensagem: () => {},
  obterGrupo: () => undefined,
  deletarGrupo: () => {},
});

export const GrupoProvider = ({ children }: ProviderProps) => {
  const [grupos, setGrupos] = useState<Grupo[]>([
    {
      id: "1",
      nomeGrupo: "Meu Grupo",
      fotoGrupo:
        "https://digest.med.br/wp-content/uploads/2024/07/no-image.jpg",
      membrosGrupo: [],
      mensagens: [],
    },
  ]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const gruposSalvos = await AsyncStorage.getItem("grupos");
        if (gruposSalvos) {
          setGrupos(JSON.parse(gruposSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar grupos do AsyncStorage:", error);
      }
    };
    loadAllData();
  }, []);

  useEffect(() => {
    const saveGrupos = async () => {
      try {
        if (grupos.length > 0) {
          await AsyncStorage.setItem("grupos", JSON.stringify(grupos));
        }
      } catch (error) {
        console.error("Erro ao salvar grupos:", error);
      }
    };
    saveGrupos();
  }, [grupos]);

  const adicionarGrupo = (grupo: Grupo) => {
    setGrupos((prev) => [...prev, grupo]);
  };

  const atualizarGrupo = (id: string, grupoAtualizado: Partial<Grupo>) => {
    setGrupos((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...grupoAtualizado } : g)),
    );
  };

  const adicionarMensagem = (grupoId: string, mensagem: Mensagem) => {
    setGrupos((prev) =>
      prev.map((g) =>
        g.id === grupoId ? { ...g, mensagens: [...g.mensagens, mensagem] } : g,
      ),
    );
  };

  const obterGrupo = (id: string): Grupo | undefined => {
    return grupos.find((g) => g.id === id);
  };

  const deletarGrupo = (id: string) => {
    setGrupos((prev) => prev.filter((g) => g.id !== id));
  };

  const value: GrupoContextTipo = {
    grupos,
    setGrupos,
    adicionarGrupo,
    atualizarGrupo,
    adicionarMensagem,
    obterGrupo,
    deletarGrupo,
  };

  return (
    <GrupoContext.Provider value={value}>{children}</GrupoContext.Provider>
  );
};
