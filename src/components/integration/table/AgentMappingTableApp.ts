import { Pagination, Values } from '@comm100/framework/Components/Table';
import { UIState } from '@comm100/framework/Helpers';
import { APPClient } from 'comm100-app';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { TableContextValue } from './TableContext';
import { VincallDomainService } from '../../../domains/VincallDomainService';
import { getSessionStorageAccessToken, getSiteId } from '../../../helper/getSiteInfo';
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
  },
  {
    agentId: 'agent2',
    agentName: 'agent2',
    vincallAgentId: '',
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
  filterState: UIState<Values>;
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
  totalCountState: [totalCount, setTotalCount],
  filterState: [searchFilter, setSearchFilter]
}: AgentMappingTableAppProps): AgentMappingTableApp => {
  const client = APPClient.init();
  const mappedAgentsRef = useRef<AgentMappingBo[]>();
  const currentMappedAgentRef = useRef<AgentMappingBo>();
  const agentMappingService = new VincallDomainService({
    url: `/open/agentMappings?siteId=${getSiteId()}`,
    token: getSessionStorageAccessToken()!
  });

  const brokeMapping = async (agent: AgentMappingDto) => {
    const mappedAgents = mappedAgentsRef.current || [];
    mappedAgentsRef.current = mappedAgents.filter(
      (item) => item.comm100AgentId !== agent.agentId
    );
    await agentMappingService.update(mappedAgentsRef.current);
    client.do('controlpanel.message.snack', {
      message: `Agent unmapping successfully.`
    });
    await loadHandler();
  };

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
    await agentMappingService.update(mappedAgentsRef.current);
    client.do('controlpanel.message.snack', {
      message: `Agent mapping successfully.`
    });
    await loadHandler();
  };

  const radioSelected = (
    agent: AgentMappingDto,
    vincallAgent: VinCallAgentDto
  ) => {
    currentMappedAgentRef.current = {
      comm100AgentId: agent.agentId,
      email: agent.email,
      partnerId: agent.partnerId.toString(),
      siteId: agent.siteId.toString(),
      vincallAgentId: vincallAgent.userAccount
    };
  };

  const searchHandler = async (values: Values) => {
    const newPagination = { ...pagination, page: 1 };
    await loadAgents(newPagination, values);
    setPagination(newPagination);
    setSearchFilter(values);
  };

  const loadAgents = async (pageInfo: Pagination, values: Values) => {
    if (process.env.NODE_ENV === 'production') {
      const agents = await client.request('/api/Global/agents', {
        params: {
          ...values,
          pageIndex: pageInfo.page > 0 ? pageInfo.page.toString() : '1',
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
    await loadAgents(pagination, searchFilter);
    setLoading(false);
  };

  const paginationHandler = async (pageInfo: Pagination) => {
    await loadAgents(pageInfo, searchFilter);
    setPagination(pageInfo);
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
