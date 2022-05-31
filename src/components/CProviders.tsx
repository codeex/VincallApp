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
  }
];

export const CProviders = ({ children }: CProvidersProps) => {
  return (
    <IconProvider overrideIcons={icons}>
      <ThemeProvider theme={theme()}>{children}</ThemeProvider>
    </IconProvider>
  );
};
