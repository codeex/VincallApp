import { Pagination, Values } from '@comm100/framework/Components/Table';
import { UIState, useEventCallback } from '@comm100/framework/Helpers';
import { VincallDomainService } from '../../../domains/VincallDomainService';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';
import { useTableContext } from './TableContext';

export type DrawerTableAppProps = {
  loadingState: UIState<boolean>;
  agentsState: UIState<VinCallAgentDto[]>;
  selectedIndexesState: UIState<number[]>;
  agentMapping: AgentMappingDto;
  totalCountState: UIState<number>;
  paginationState: UIState<Pagination>;
  filterState: UIState<Values>;
};

export type DrawerTableApp = {
  loading: boolean;
  selectedIndexes: number[];
  totalCount: number;
  pagination: Pagination;
  agents: VinCallAgentDto[];
  searchHandler: (values: Values) => void;
  loadHandler: () => void;
  radioSelectedHandler: (
    selectedIndexes: number[],
    rows?: VinCallAgentDto[]
  ) => void;
  paginationHandler: (pagination: Pagination) => void;
};

export const drawerTableApp = ({
  loadingState: [loading, setLoading],
  agentsState: [agents, setAgents],
  selectedIndexesState: [selectedIndexes, setSelectedIndexes],
  paginationState: [pagination, setPagination],
  totalCountState: [totalCount, setTotalCount],
  filterState: [searchFilter, setSearchFilter],
  agentMapping
}: DrawerTableAppProps): DrawerTableApp => {
  const { radioSelected } = useTableContext();
  const vincallAgentService = new VincallDomainService({
    url: `/api/agents`
  });

  const loadAgents = (pageInfo: Pagination, values: Values) => {
    return vincallAgentService.getPageList({
      ...values,
      pageNum: pageInfo.page,
      pageSize: pageInfo.pageSize
    });
  };

  const searchHandler = useEventCallback(async (values: Values) => {
    const vincallRsp = await loadAgents({ ...pagination, page: 0 }, values);
    setAgents(vincallRsp.agents as VinCallAgentDto[]);
    setTotalCount(vincallRsp.count);
    setSearchFilter(values);
  });
  const loadHandler = useEventCallback(async () => {
    const vincallRsp = await loadAgents(pagination, searchFilter);
    if (vincallRsp.agents.length > 0) {
      const index = vincallRsp.agents.findIndex(
        (item) => item.id === agentMapping.vincallAgentId
      );
      setSelectedIndexes([index >= 0 ? index : 0]);
      radioSelected(agentMapping, vincallRsp.agents[0] as VinCallAgentDto);
    }
    setAgents(vincallRsp.agents as VinCallAgentDto[]);
    setTotalCount(vincallRsp.count);
    setLoading(false);
  });

  const radioSelectedHandler = useEventCallback(
    (selected: number[], rows: VinCallAgentDto[] = []) => {
      radioSelected(agentMapping, rows[selected[0]]);
      setSelectedIndexes(selected);
    }
  );

  const paginationHandler = async (pageInfo: Pagination) => {
    const vincallRsp = await loadAgents(pageInfo, searchFilter);
    setAgents(vincallRsp.agents as VinCallAgentDto[]);
    setTotalCount(vincallRsp.count);
    setPagination(pageInfo);
  };

  return {
    totalCount,
    pagination,
    loading,
    selectedIndexes,
    agents,
    searchHandler,
    loadHandler,
    radioSelectedHandler,
    paginationHandler
  };
};
