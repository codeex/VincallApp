import { Pagination, Values } from '@comm100/framework/Components/Table';
import { UIState } from '@comm100/framework/Helpers';
import { APPClient } from '@comm100/app-client';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { CSelectOption } from '@comm100/framework/Components/CSelect/CSelect';

const testData: AgentMappingDto[] = [
  {
    agentId: 'agent1',
    agentName: 'agent1',
    vincallAgentId: 'vincall',
    vincallAgentName: 'vi1'
  }
];
export type AgentMappingTableAppProps = {
  loadingState: UIState<boolean>;
  agentMappingsState: UIState<AgentMappingDto[]>;
  totalCountState: UIState<number>;
  paginationState: UIState<Pagination>;
};

export type AgentMappingTableApp = {
  statusOptions: CSelectOption[];
  loading: boolean;
  totalCount: number;
  agentMappings: AgentMappingDto[];
  pagination: Pagination;
  searchHandler: (values: Values) => void;
  unmapHandler: (agentMapping: AgentMappingDto) => void;
  paginationHandler: (pagination: Pagination) => void;
  loadHandler: () => void;
};

export const agentMappingTableApp = ({
  loadingState: [loading, setLoading],
  agentMappingsState: [agentMappings, setAgentMappings],
  paginationState: [pagination, setPagination],
  totalCountState: [totalCount, setTotalCount]
}: AgentMappingTableAppProps): AgentMappingTableApp => {
  const client = APPClient.init();

  const searchHandler = (values: Values) => {
    console.log('search');
  };
  const unmapHandler = (agentMapping: AgentMappingDto) => {
    console.log('click unmap');
  };
  const loadHandler = async () => {
    const agents = await client.request('/api/Global/agents');
    if (agents.data) {
      setAgentMappings(
        agents.data.agents.map((agent) => ({
          agentId: agent.id,
          agentName: agent.displayName
        }))
      );
      setTotalCount(agents.data.total);
    }
    setLoading(false);
  };

  const paginationHandler = (pageInfo: Pagination) => {
    console.log('page');
  };

  const statusOptions: CSelectOption[] = [
    {
      label: 'Mapping Broken',
      value: 'brokenmapping'
    },
    {
      label: 'Mapped',
      value: 'mapped'
    },
    {
      label: 'Not Mapped',
      value: 'unmapped'
    }
  ];

  return {
    statusOptions,
    totalCount,
    pagination,
    loading,
    agentMappings,
    searchHandler,
    unmapHandler,
    loadHandler,
    paginationHandler
  };
};
