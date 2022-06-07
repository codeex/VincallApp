import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { APPClient } from '@comm100/app-client';
import { vincallDomain } from 'src/config';

const App = () => {
  const client = APPClient.init();
  const popperOpenRef = useRef<boolean>(false);
  const popperContentUrl = `${vincallDomain}/#/phonedialer`;
  const widgetId = 'vincall-top-bar';

  const initPopper = () => {
    client
      .do('agentconsole.popper.open', {
        widgetId,
        url: popperContentUrl,
        open: false
      })
      .then(function() {
        popperOpenRef.current = false;
        client.on('agentconsole.popper.open', function() {
          popperOpenRef.current = false;
        });
      });
  };

  const openPopper = () => {
    client
      .do('agentconsole.popper.open', {
        widgetId,
        url: popperContentUrl,
        width: 337,
        height: 585
      })
      .then(function() {
        popperOpenRef.current = true;
      });
  };

  const closePopper = () => {
    client.do('agentconsole.popper.close').then(function() {
      popperOpenRef.current = false;
    });
  };

  useEffect(() => {
    client.on('agentconsole.topBar.buttons.click', function(topBar) {
      if (!popperOpenRef.current) {
        openPopper();
      } else {
        closePopper();
      }
    });
  }, []);
  initPopper();
  return <></>;
};

render(<App />, document.getElementById('main'));
