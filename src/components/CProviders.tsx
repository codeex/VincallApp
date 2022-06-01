import React from 'react';
import { IconProvider } from '@comm100/framework/IconProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@comm100/styledComponents/Theme';

export type CProvidersProps = {
  children: React.ReactNode;
};

const icons = [
  {
    name: 'goback',
    svg: `<svg version="1.1" id="??_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
  <style type="text/css">
   .st0{fill:#526C78;}
   .st1{fill:none;}
  </style>
  <title>back</title>
  <g>
   <path class="st0" d="M14.2,6.6H6.9l4.9-4.8L9.9,0L2,7.9l7.9,7.9l1.8-1.8L6.9,9.2h7.2c0.2,0,5.3,0.5,5.3,5.1c0,4.5-4.8,5.1-5.2,5.1
    H6.8V22h7.5c2.6-0.2,7.6-2.1,7.6-7.7S17,6.9,14.2,6.6z"/>
   <rect class="st1" width="24" height="24"/>
  </g>
  </svg>`
  },
  {
    name: 'help',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M12,21.75c-5.4,0-9.75-4.35-9.75-9.75
    S6.6,2.25,12,2.25S21.75,6.6,21.75,12S17.4,21.75,12,21.75z"/>
   <rect x="10.95" y="17.25" width="2.1" height="2.1"/>
   <path d="M12,4.65c-2.25,0-4.2,1.8-4.2,4.2h2.1l0,0c0-1.2,0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1c0,0.6-0.15,1.05-0.6,1.5
    l-1.35,1.35c-0.75,0.75-1.2,1.8-1.2,2.85V15h2.1c-0.15-1.05,0.3-2.25,1.2-3l0.9-0.9l0,0c0.6-0.6,0.9-1.5,0.9-2.4
    C16.2,6.6,14.25,4.65,12,4.65z"/></svg>`
  },
  {
    name: 'disconnect',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Disconnect</title>
    <g>
      <rect width="24" height="24" style="fill: none"/>
      <path d="M12.538,18.931l-2.08-2.08L11.7,15.607l2.081,2.081a2.871,2.871,0,0,0,4.058,0h0a2.871,2.871,0,0,0,0-4.058l-2.08-2.08L17,10.306l2.081,2.081a4.628,4.628,0,0,1-6.546,6.544ZM7,13.39l-2.08-2.081a4.627,4.627,0,1,1,6.546-6.54l2.08,2.08L12.3,8.093l-2.081-2.08a2.87,2.87,0,0,0-4.058,0h0a2.869,2.869,0,0,0,0,4.058h0l2.08,2.08ZM4.278,18.261,18.414,4.124l1.309,1.309L5.587,19.57Z"/>
    </g>
  </svg>
  `
  },
  {
    name: 'edit',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>'
  },
  {
    name: 'search',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>'
  },
  {
    name: 'close',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'
  },
  {
    name: 'dot',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M24 24H0V0h24v24z"></path><circle fill="#18D000" cx="12" cy="12" r="8"></circle></svg>'
  },
  {
    name: 'graydot',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M24 24H0V0h24v24z"></path><circle fill="#BEBEBE" cx="12" cy="12" r="8"></circle></svg>'
  },
  {
    name: 'reddot',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M24 24H0V0h24v24z"></path><circle fill="#FFA352" cx="12" cy="12" r="8"></circle></svg>'
  }
];

export const CProviders = ({ children }: CProvidersProps) => {
  return (
    <IconProvider overrideIcons={icons}>
      <ThemeProvider theme={theme()}>{children}</ThemeProvider>
    </IconProvider>
  );
};
