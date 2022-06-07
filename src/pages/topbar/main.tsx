import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { APPClient } from '@comm100/app-client';
import { vincallDomain } from 'src/config';

const App = () => {
  const client = APPClient.init();
  const popperOpenRef = useRef<boolean>(false);

  useEffect(() => {
    client.on('agentconsole.topBar.buttons.click', function(topBar) {
      if (!popperOpenRef.current) {
        client
          .do('agentconsole.popper.open', {
            widgetId: 'vincall-top-bar',
            url: `${vincallDomain}/#/phonedialer`,
            width: 337,
            height: 585
          })
          .then(function({ data }) {
            popperOpenRef.current = true;
          });
      } else {
        client.do('agentconsole.popper.close').then(function() {
          popperOpenRef.current = false;
        });
      }
    });
    client
      .do('agentconsole.popper.open', {
        widgetId: 'vincall-top-bar',
        url: `./integration.html`,
        open: false
      })
      .then(function({ data }) {
        popperOpenRef.current = false;
      });
  }, []);
  return <></>;
};

render(<App />, document.getElementById('main'));
