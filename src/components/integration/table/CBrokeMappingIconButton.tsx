import { CIconButton } from '@comm100/framework/Components/CIconButton';
import React, { MouseEvent } from 'react';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { useTableContext } from './TableContext';

export type CBrokeMappingIconButtonProps = {
  agentMapping: AgentMappingDto;
};

export const CBrokeMappingIconButton = ({
  agentMapping
}: CBrokeMappingIconButtonProps) => {
  const { brokeMapping } = useTableContext();
  const clickHandler = (event: MouseEvent) => {
    brokeMapping(agentMapping);
  };

  return (
    <>
      <CIconButton
        icon='disconnect'
        title='Unmap'
        onClick={clickHandler}
        disabled={!agentMapping.vincallAgentId}
      />
    </>
  );
};

CBrokeMappingIconButton.displayName = 'CBrokeMappingIconButton';
