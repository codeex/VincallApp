import { Values } from '@comm100/framework/Components/Table';
import { UIState } from '@comm100/framework/Helpers';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';

const testData: VinCallAgentDto[] = [
  {
    id: 'test',
    displayName: 'agent'
  }
];
export type DrawerTableAppProps = {
  loadingState: UIState<boolean>;
  agentsState: UIState<VinCallAgentDto[]>;
  selectedIndexesStatus: UIState<number[]>;
  onRadioSelected: (index: number, vincallAgent: VinCallAgentDto) => void;
};

export type DrawerTableApp = {
  loading: boolean;
  agents: VinCallAgentDto[];
  selectedIndexes: number[];
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
  selectedIndexesStatus: [selectedIndexes, setSelectedIndexes],
  onRadioSelected
}: DrawerTableAppProps): DrawerTableApp => {
  const searchHandler = (values: Values) => {
    console.log('search');
  };
  const loadHandler = async () => {
    setAgents(testData);
    setLoading(false);
  };

  const radioSelectedHandler = (
    selected: number[],
    rows?: VinCallAgentDto[]
  ) => {
    onRadioSelected(selected[0], rows![0]);
    setSelectedIndexes(selected);
  };

  return {
    selectedIndexes,
    loading,
    agents,
    searchHandler,
    loadHandler,
    radioSelectedHandler
  };
};
