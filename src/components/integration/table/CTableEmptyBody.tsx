import React from 'react';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { CTableNoRecordsCellStyled } from '@comm100/styledComponents/Table/CTableNoRecordsCellStyled';
import assetsUrl from '../../../images/norecordsfound.svg';

export interface CTableEmptyBodyProps {
  message?: string;
}
export const CTableEmptyBody = ({ message }: CTableEmptyBodyProps) => {
  return (
    <TableBody>
      <TableRow>
        <CTableNoRecordsCellStyled>
          <img src={assetsUrl} alt='No records found.' />
          <Typography>{message}</Typography>
        </CTableNoRecordsCellStyled>
      </TableRow>
    </TableBody>
  );
};
CTableEmptyBody.displayName = 'CTableEmptyBody';
