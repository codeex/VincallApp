import { createContext, useContext } from 'react';
import { AgentMappingDto } from '../Dto/AgentMappingDto';

export type TableContextValue = {
  reloadData: () => void;
  brokeMapping: (agent: AgentMappingDto) => void;
};

export const TableContext = createContext({} as TableContextValue);
export const TableContextProvider = TableContext.Provider;

export const useTableContext = (): TableContextValue => {
  return useContext<TableContextValue>(TableContext);
};
