import { Values } from '@comm100/framework/Components/Table';
import { UIState, useEventCallback } from '@comm100/framework/Helpers';
import { VincallDomainService } from '../../../domains/VincallDomainService';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';
import { useTableContext } from './TableContext';

const testData: VinCallAgentDto[] = [
  {
    id: 'test',
    userAccount: 'agent'
  }
];
export type DrawerTableAppProps = {
  loadingState: UIState<boolean>;
  agentsState: UIState<VinCallAgentDto[]>;
  selectedIndexesState: UIState<number[]>;
  agentMapping: AgentMappingDto;
};

export type DrawerTableApp = {
  loading: boolean;
  selectedIndexes: number[];
  agents: VinCallAgentDto[];
  searchHandler: (values: Values) => void;
  loadHandler: () => void;
  radioSelectedHandler: (
    selectedIndexes: number[],
    rows?: VinCallAgentDto[]
  ) => void;
};

export const drawerTableApp = ({
  loadingState: [loading, setLoading],
  agentsState: [agents, setAgents],
  selectedIndexesState: [selectedIndexes, setSelectedIndexes],
  agentMapping
}: DrawerTableAppProps): DrawerTableApp => {
  const { radioSelected } = useTableContext();

  const vincallAgentService = new VincallDomainService({
    url: `/api/agents`
  });
  const searchHandler = useEventCallback(async (values: Values) => {
    const vincallAgents = await vincallAgentService.getList(values);
    setAgents(vincallAgents as VinCallAgentDto[]);
  });
  const loadHandler = useEventCallback(async () => {
    const vincallAgents = await vincallAgentService.getList();
    if (vincallAgents.length > 0) {
      const index = vincallAgents.findIndex(
        (item) => item.id === agentMapping.vincallAgentId
      );
      setSelectedIndexes([index >= 0 ? index : 0]);
      radioSelected(agentMapping, vincallAgents[0] as VinCallAgentDto);
    }
    setAgents(vincallAgents as VinCallAgentDto[]);
    setLoading(false);
  });

  const radioSelectedHandler = useEventCallback(
    (selected: number[], rows: VinCallAgentDto[] = []) => {
      radioSelected(agentMapping, rows[selected[0]]);
      setSelectedIndexes(selected);
    }
  );

  return {
    loading,
    selectedIndexes,
    agents,
    searchHandler,
    loadHandler,
    radioSelectedHandler
  };
};
