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
import { CSelect } from '@comm100/framework/Components/CSelect';
import { CDrawerIconButton } from './CDrawerIconButton';

export const CAgentMappingTable = () => {
  const {
    statusOptions,
    totalCount,
    pagination,
    loading,
    agentMappings,
    searchHandler,
    unmapHandler,
    loadHandler,
    paginationHandler
  } = agentMappingTableApp({
    loadingState: useState<boolean>(true),
    agentMappingsState: useState<AgentMappingDto[]>([]),
    paginationState: useState<Pagination>({
      page: 1,
      pageSize: 10
    }),
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
        id: 'vincallAgentName',
        isAllowSort: false,
        headerText: 'Vincall Agent',
        content: {
          name: 'vincallAgentName',
          isIcon: false,
          cellComponent: ({ row }) => (
            <CTableBodyCellText text={row.vincallAgentName || ''} />
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
          return (
            <CIconButton
              icon='disconnect'
              title='Unmap'
              onClick={() => {
                unmapHandler(row);
              }}
              disabled={!row.vincallAgentId}
            />
          );
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
            placeholder='Status'
            name='status'
            component={CSelect}
            options={statusOptions}
            clearable
          />
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
    </>
  );
};
