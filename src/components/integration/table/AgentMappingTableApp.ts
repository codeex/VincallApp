import { Pagination, Values } from '@comm100/framework/Components/Table';
import { UIState } from '@comm100/framework/Helpers';
import { APPClient } from '@comm100/app-client';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { CSelectOption } from '@comm100/framework/Components/CSelect/CSelect';
import { TableContextValue } from './TableContext';
import { VincallDomainService } from '../../../domains/VincallDomainService';
import { getSiteId } from '../../../helper/getSiteInfo';
import { AgentMappingBo } from '../../../domains/bo/AgentMappingBo';
import { useRef } from 'react';

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
  tableContextValue: TableContextValue;
  searchHandler: (values: Values) => void;
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
  const agentMappingsRef = useRef<AgentMappingBo[]>();

  const searchHandler = (values: Values) => {
    console.log('search');
  };
  const loadHandler = async () => {
    const agentMappingService = new VincallDomainService({
      url: `/open/agentMappings?siteId=${getSiteId()}`
    });
    agentMappingsRef.current = ((await agentMappingService.getList()) ||
      []) as AgentMappingBo[];
    if (process.env.NODE_ENV === 'production') {
      const agents = await client.request('/api/Global/agents', {
        params: {
          pageIndex: pagination.page.toString(),
          pageSize: pagination.pageSize.toString()
        }
      } as any);
      if (agents.data) {
        setAgentMappings(
          agents.data.agents.map((agent) => {
            const mappingAgent = agentMappingsRef.current?.find(
              (item) => item.comm100AgentId === agent.id
            );
            return {
              agentId: agent.id,
              agentName: agent.displayName,
              vincallAgentId: mappingAgent?.vincallAgentId
            };
          })
        );
        setTotalCount(agents.data.total);
      }
    } else {
      setAgentMappings(testData);
      setTotalCount(100);
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

  const brokeMapping = (agent: AgentMappingDto) => {
    console.log('todo: brokeMapping');
  };

  return {
    statusOptions,
    totalCount,
    pagination,
    loading,
    agentMappings,
    tableContextValue: {
      reloadData: loadHandler,
      brokeMapping
    },
    searchHandler,
    loadHandler,
    paginationHandler
  };
};
