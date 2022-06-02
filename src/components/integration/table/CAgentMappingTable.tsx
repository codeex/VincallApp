import { CKeywordSearch } from '@comm100/framework/Components/CKeywordSearch';
import { CIconButton } from '@comm100/framework/Components/CIconButton';
import React, { useEffect, useState } from 'react';
import { useMemo } from '@comm100/framework/Helpers';
import noRecordsImage from '../../../images/norecordsfound.svg';
import { agentMappingTableApp } from './AgentMappingTableApp';
import { AgentMappingDto } from '../Dto/AgentMappingDto';
import {
  CTable,
  Pagination,
  TableColumn,
  TableOperation
} from '@comm100/framework/Components/Table/CTable';
import { CTableBodyCellText } from '@comm100/framework/Components/Table/CTableBodyCellText';
import { CTableAction } from '@comm100/framework/Components/Table/CTableAction';
import { CTableFilter } from '@comm100/framework/Components/Table/CTableFilter';
import { CTableFilterControl } from '@comm100/framework/Components/Table/CTableFilterControl';
import { CTableSkeleton } from '@comm100/framework/Components/Table/CTableSkeleton';
import { CTableEmptyBody } from '@comm100/framework/Components/Table/CTableEmptyBody';
import { CDrawerIconButton } from './CDrawerIconButton';
import { CBrokeMappingIconButton } from './CBrokeMappingIconButton';
import { TableContextProvider } from './TableContext';
import { Values } from '@comm100/framework/Components/Table/CTableFilterContext';

export const CAgentMappingTable = () => {
  const {
    totalCount,
    pagination,
    loading,
    agentMappings,
    tableContextValue,
    searchHandler,
    loadHandler,
    paginationHandler
  } = agentMappingTableApp({
    loadingState: useState<boolean>(true),
    agentMappingsState: useState<AgentMappingDto[]>([]),
    paginationState: useState<Pagination>({
      page: 1,
      pageSize: 10
    }),
    filterState: useState<Values>({}),
    totalCountState: useState<number>(0)
  });

  useEffect(() => {
    loadHandler();
  }, []);

  const columns: TableColumn<AgentMappingDto>[] = useMemo(() => {
    return [
      {
        id: 'comm100AgentName',
        isAllowSort: false,
        headerText: 'Comm100 Agent',
        content: {
          name: 'agentName',
          isIcon: false,
          cellComponent: ({ row }) => (
            <CTableBodyCellText text={row.agentName || ''} />
          )
        }
      },
      {
        id: 'vincallAgentId',
        isAllowSort: false,
        headerText: 'Vincall Agent Account',
        content: {
          name: 'vincallAgentId',
          isIcon: false,
          cellComponent: ({ row }) => (
            <CTableBodyCellText text={row.vincallAgentId || ''} />
          )
        }
      }
    ];
  }, []);

  const operations = useMemo<TableOperation<AgentMappingDto>[]>(() => {
    return [
      {
        operationComponent: ({ row }) => {
          return (
            <CDrawerIconButton icon='edit' title='Edit' agentMapping={row} />
          );
        }
      },
      {
        operationComponent: ({ row }) => {
          return <CBrokeMappingIconButton agentMapping={row} />;
        }
      }
    ];
  }, []);
  return (
    <TableContextProvider value={tableContextValue}>
      <CTableAction>
        <div />
        <div />
        <CTableFilter onFilter={searchHandler}>
          <CTableFilterControl
            name='keywords'
            component={CKeywordSearch}
            placeholder='Search Comm100 Agent'
          />
        </CTableFilter>
      </CTableAction>
      {loading && <CTableSkeleton />}
      {!loading && (
        <CTable
          data={{ rows: agentMappings, totalCount: totalCount }}
          columns={columns}
          operations={operations}
          enablePagination
          pagination={pagination}
          maxLinesOfRow={3}
          emptyBody={
            <CTableEmptyBody
              imgUrl={noRecordsImage}
              message='No records found'
            />
          }
          onPaginationChange={paginationHandler}
        />
      )}
    </TableContextProvider>
  );
};
