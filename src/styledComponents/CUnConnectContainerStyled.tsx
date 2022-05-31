import React from 'react';
import { makeStyles, createStyles, Theme } from '@comm100/styledComponents';
import { StyledComponentProps } from '@comm100/styledComponents/types';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '400px',
      position: 'relative',
      '& button': {
        marginTop: theme.spacing(4)
      },
      '& img': {
        marginBottom: theme.spacing(2)
      },
      '& p': {
        position: 'absolute',
        bottom: 0,
        margin: 0,
        color: theme.palette.text.secondary,
        fontSize: 12
      }
    }
  })
);

export const CUnConnectContainerStyled = (
  props: StyledComponentProps<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >
) => {
  const classes = useStyle();
  return <div className={classes.root} {...props} />;
};
CUnConnectContainerStyled.displayName = 'CUnConnectContainerStyled';
