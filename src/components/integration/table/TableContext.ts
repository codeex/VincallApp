import { createContext, useContext } from 'react';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';

export type TableContextValue = {
  reloadData: () => void;
  brokeMapping: (agent: AgentMappingDto) => void;
  radioSelected: (
    agent: AgentMappingDto,
    vincallAgent: VinCallAgentDto
  ) => void;
  saveAgentMappings: () => Promise<any>;
};

export const TableContext = createContext({} as TableContextValue);
export const TableContextProvider = TableContext.Provider;

export const useTableContext = (): TableContextValue => {
  return useContext<TableContextValue>(TableContext);
};
