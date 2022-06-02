import { CKeywordSearch } from '@comm100/framework/Components/CKeywordSearch';
import React, { memo, useEffect, useState } from 'react';
import { useMemo } from '@comm100/framework/Helpers';
import noRecordsImage from '../../../images/norecordsfound.svg';
import {
  CTable,
  Pagination,
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
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import { Values } from '@comm100/framework/Components/Table/CTableFilterContext';

export type CDrawerTableProps = {
  agentMapping: AgentMappingDto;
};

export const CDrawerTable = ({ agentMapping }: CDrawerTableProps) => {
  const {
    loading,
    selectedIndexes,
    agents,
    totalCount,
    pagination,
    searchHandler,
    loadHandler,
    radioSelectedHandler,
    paginationHandler
  } = drawerTableApp({
    loadingState: useState<boolean>(true),
    agentsState: useState<VinCallAgentDto[]>([]),
    selectedIndexesState: useState<number[]>([0]),
    agentMapping,
    paginationState: useState<Pagination>({
      page: 0,
      pageSize: 10
    }),
    filterState: useState<Values>({}),
    totalCountState: useState<number>(0)
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
            placeholder='Search Vincall Agent'
          />
        </CTableFilter>
      </CTableAction>
      {loading && <CTableSkeleton />}
      {!loading && (
        <CTable
          data={{ rows: agents, totalCount: totalCount }}
          enableSingleSelectOperation
          columns={columns}
          maxLinesOfRow={3}
          enablePagination
          pagination={pagination}
          selectedIndexes={selectedIndexes}
          emptyBody={
            <CTableEmptyBody
              imgUrl={noRecordsImage}
              message='No records found'
            />
          }
          onSelect={radioSelectedHandler}
          onPaginationChange={paginationHandler}
        />
      )}
    </>
  );
};
