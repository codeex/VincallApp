import { Values } from '@comm100/framework/Components/Table';
import { UIState, useEventCallback } from '@comm100/framework/Helpers';
import { VincallDomainService } from '../../../domains/VincallDomainService';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';

const testData: VinCallAgentDto[] = [
  {
    id: 'test',
    userAccount: 'agent'
  }
];
export type DrawerTableAppProps = {
  loadingState: UIState<boolean>;
  agentsState: UIState<VinCallAgentDto[]>;
  onRadioSelected: (index: number[], vincallAgent: VinCallAgentDto[]) => void;
};

export type DrawerTableApp = {
  loading: boolean;
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
  onRadioSelected
}: DrawerTableAppProps): DrawerTableApp => {
  const vincallAgentService = new VincallDomainService({
    url: `/api/agents`
  });
  const searchHandler = useEventCallback(async (values: Values) => {
    const vincallAgents = await vincallAgentService.getList(values);
    setAgents(vincallAgents as VinCallAgentDto[]);
  });
  const loadHandler = useEventCallback(async () => {
    const vincallAgents = await vincallAgentService.getList();
    setAgents(vincallAgents as VinCallAgentDto[]);
    setLoading(false);
  });

  const radioSelectedHandler = useEventCallback(
    (selected: number[], rows?: VinCallAgentDto[]) => {
      onRadioSelected(selected, rows!);
    }
  );

  return {
    loading,
    agents,
    searchHandler,
    loadHandler,
    radioSelectedHandler
  };
};
