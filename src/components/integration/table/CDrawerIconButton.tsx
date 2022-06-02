import { CButton } from '@comm100/framework/Components/CButton';
import { CIconButton } from '@comm100/framework/Components/CIconButton';
import { CDrawer } from '@comm100/framework/Components/Drawer/CDrawer';
import { CFormAction } from '@comm100/framework/Components/Form/CFormAction';
import { useEventCallback } from '@comm100/framework/Helpers';
import React, { MouseEvent, useState } from 'react';
import { CPage } from '../../CPage';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { CDrawerTable } from './CDrawerTable';
import { useTableContext } from './TableContext';

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
  const { saveAgentMappings } = useTableContext();

  const iconClickHandler = useEventCallback((event: MouseEvent) => {
    setOpen(true);
  });

  const closeHandler = useEventCallback(() => {
    setOpen(false);
  });

  const okHandler = useEventCallback(() => {
    setOpen(false);
    saveAgentMappings();
  });

  return (
    <>
      <CIconButton icon={icon} title={title} onClick={iconClickHandler} />
      <CDrawer open={open} onClose={closeHandler}>
        <CPage
          isInDrawer
          title={`Edit Agent Mapping - ${agentMapping.agentName}`}
        >
          <CDrawerTable agentMapping={agentMapping} />
          <CFormAction>
            <CButton text={'OK'} variant='contained' onClick={okHandler} />
            <CButton text={'Cancel'} onClick={closeHandler} />
          </CFormAction>
        </CPage>
      </CDrawer>
    </>
  );
};
