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

export type CDrawerIconButtonProps = {
  icon: string;
  title: string;
  agentMapping: AgentMappingDto;
};

export const CDrawerIconButton = ({
  icon,
  title,
  agentMapping
}: CDrawerIconButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<VinCallAgentDto>();

  const iconClickHandler = (event: MouseEvent) => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const okHandler = () => {
    console.log('okHandler', selectedAgent);
  };

  const radioSelectedHandler = (index: number, agent: VinCallAgentDto) => {
    setSelectedAgent(agent);
  };

  return (
    <>
      <CIconButton icon={icon} title={title} onClick={iconClickHandler} />
      <CDrawer open={open} onClose={closeHandler}>
        <CPage
          isInDrawer
          title={`Edit Agent Mapping - ${agentMapping.agentName}`}
        >
          <CDrawerTable onRadioSelected={radioSelectedHandler} />
          <CFormAction>
            <CButton text={'OK'} variant='contained' onClick={okHandler} />
            <CButton text={'Cancel'} onClick={closeHandler} />
          </CFormAction>
        </CPage>
      </CDrawer>
    </>
  );
};
