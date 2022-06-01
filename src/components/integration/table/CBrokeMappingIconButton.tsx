import { CButton } from '@comm100/framework/Components/CButton';
import { CIconButton } from '@comm100/framework/Components/CIconButton';
import { CDrawer } from '@comm100/framework/Components/Drawer/CDrawer';
import { CFormAction } from '@comm100/framework/Components/Form/CFormAction';
import { CDrawerActionsStyled } from '@comm100/styledComponents/Drawer/CDrawerActionsStyled';
import React, { MouseEvent, useState } from 'react';
import { CPage } from '../../CPage';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';
import { CDrawerTable } from './CDrawerTable';
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
