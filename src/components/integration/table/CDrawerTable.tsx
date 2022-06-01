import { CKeywordSearch } from '@comm100/framework/Components/CKeywordSearch';
import { CIconButton } from '@comm100/framework/Components/CIconButton';
import React, { useEffect, useState } from 'react';
import { useMemo } from '@comm100/framework/Helpers';
import noRecordsImage from '../../../images/norecordsfound.svg';
import {
  CTable,
  TableColumn
} from '@comm100/framework/Components/Table/CTable';
import { CTableBodyCellText } from '@comm100/framework/Components/Table/CTableBodyCellText';
import { CTableAction } from '@comm100/framework/Components/Table/CTableAction';
import { CTableFilter } from '@comm100/framework/Components/Table/CTableFilter';
import { CTableFilterControl } from '@comm100/framework/Components/Table/CTableFilterControl';
import { CTableSkeleton } from '@comm100/framework/Components/Table/CTableSkeleton';
import { CTableEmptyBody } from '@comm100/framework/Components/Table/CTableEmptyBody';
import { VinCallAgentDto } from '../Dto/VinCallAgentDto';
import { drawerTableApp } from './DrawerTableApp';

export type CDrawerTableProps = {
  selectedIndexes: number[];
  onRadioSelected: (index: number[], vincallAgent: VinCallAgentDto[]) => void;
};

export const CDrawerTable = ({
  onRadioSelected,
  selectedIndexes
}: CDrawerTableProps) => {
  const {
    loading,
    agents,
    searchHandler,
    loadHandler,
    radioSelectedHandler
  } = drawerTableApp({
    loadingState: useState<boolean>(true),
    agentsState: useState<VinCallAgentDto[]>([]),
    onRadioSelected
  });

  useEffect(() => {
    loadHandler();
  }, []);

  const columns: TableColumn<VinCallAgentDto>[] = useMemo(() => {
    return [
      {
        id: 'id',
        isAllowSort: false,
        headerText: 'ID',
        content: {
          name: 'id',
          isIcon: false,
          cellComponent: ({ row }) => <CTableBodyCellText text={row.id || ''} />
        }
      },
      {
        id: 'displayName',
        isAllowSort: false,
        headerText: 'Vincall Account',
        content: {
          name: 'displayName',
          isIcon: false,
          cellComponent: ({ row }) => (
            <CTableBodyCellText text={row.userAccount || ''} />
          )
        }
      }
    ];
  }, []);
  return (
    <>
      <CTableAction>
        <div />
        <div />
        <CTableFilter onFilter={searchHandler}>
          <CTableFilterControl
            name='keywords'
            component={CKeywordSearch}
            placeholder='Search app'
          />
        </CTableFilter>
      </CTableAction>
      {loading && <CTableSkeleton />}
      {!loading && (
        <CTable
          data={{ rows: agents, totalCount: agents.length }}
          enableSingleSelectOperation
          columns={columns}
          maxLinesOfRow={3}
          selectedIndexes={selectedIndexes}
          emptyBody={
            <CTableEmptyBody
              imgUrl={noRecordsImage}
              message='No records found'
            />
          }
          onSelect={radioSelectedHandler}
        />
      )}
    </>
  );
};
