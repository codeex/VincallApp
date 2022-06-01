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
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';

const testData: AgentMappingDto[] = [
  {
    agentId: 'agent1',
    agentName: 'agent1',
    vincallAgentId: 'vincall',
    email: '',
    partnerId: '10000',
    siteId: '1000'
  }
];
export type AgentMappingTableAppProps = {
  loadingState: UIState<boolean>;
  agentMappingsState: UIState<AgentMappingDto[]>;
  totalCountState: UIState<number>;
  paginationState: UIState<Pagination>;
};

export type AgentMappingTableApp = {
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
  const mappedAgentsRef = useRef<AgentMappingBo[]>();
  const currentMappedAgentRef = useRef<AgentMappingBo>();
  const agentMappingService = new VincallDomainService({
    url: `/open/agentMappings?siteId=${getSiteId()}`
  });

  const saveAgentMappings = async () => {
    if (!currentMappedAgentRef.current) return;
    const mappedAgents = mappedAgentsRef.current || [];
    const existedAgent = mappedAgents.find(
      (item) =>
        item.comm100AgentId === currentMappedAgentRef.current!.comm100AgentId
    );
    if (existedAgent) {
      mappedAgentsRef.current = mappedAgents.map((item) => {
        if (
          item.comm100AgentId === currentMappedAgentRef.current!.comm100AgentId
        ) {
          return { ...item, ...currentMappedAgentRef.current };
        }
        return item;
      });
    } else {
      mappedAgentsRef.current = mappedAgents.concat({
        ...currentMappedAgentRef.current
      });
    }
    await agentMappingService.put(mappedAgentsRef.current);
    await loadHandler();
  };

  const radioSelected = (
    agent: AgentMappingDto,
    vincallAgent: VinCallAgentDto
  ) => {
    currentMappedAgentRef.current = {
      comm100AgentId: agent.agentId,
      email: agent.email,
      partnerId: agent.partnerId,
      siteId: agent.siteId,
      vincallAgentId: vincallAgent.id
    };
  };

  const searchHandler = async (values: Values) => {
    const newPagination = { ...pagination, page: 1 };
    await loadAgents(newPagination, values);
    setPagination(newPagination);
  };

  const loadAgents = async (pageInfo: Pagination, values: Values = {}) => {
    if (process.env.NODE_ENV === 'production') {
      const agents = await client.request('/api/Global/agents', {
        params: {
          ...values,
          pageIndex: pageInfo.page.toString(),
          pageSize: pageInfo.pageSize.toString()
        }
      } as any);
      const currentAgent = await client.get('currentAgent');
      if (agents.data) {
        setAgentMappings(
          agents.data.agents.map((agent) => {
            const mappingAgent = mappedAgentsRef.current?.find(
              (item) => item.comm100AgentId === agent.id
            );
            return {
              agentId: agent.id,
              agentName: agent.displayName,
              email: agent.email,
              siteId: currentAgent.data.siteId,
              partnerId: currentAgent.data.partnerId,
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
  };

  const loadHandler = async () => {
    mappedAgentsRef.current = ((await agentMappingService.getList()) ||
      []) as AgentMappingBo[];
    await loadAgents(pagination);
    setLoading(false);
  };

  const paginationHandler = async (pageInfo: Pagination) => {
    await loadAgents(pageInfo);
    setPagination(pageInfo);
  };

  const brokeMapping = (agent: AgentMappingDto) => {
    console.log('todo: brokeMapping');
  };

  return {
    totalCount,
    pagination,
    loading,
    agentMappings,
    tableContextValue: {
      reloadData: loadHandler,
      brokeMapping,
      radioSelected,
      saveAgentMappings
    },
    searchHandler,
    loadHandler,
    paginationHandler
  };
};
