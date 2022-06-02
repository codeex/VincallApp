import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { CFormSkeleton } from '@comm100/framework/Components/Form';
import { APPClient } from '@comm100/app-client';
import { CFormContent } from '../../components/integration/form/CFormContent';
import { CIntegrationForm } from '../../components/integration/form/CIntegrationForm';
import { CPage } from '../../components/CPage';
import { CUnConnected } from '../../components/CUnConnected';
import { delayOpenWindow } from '@comm100/framework/Helpers';
import { CCircularProgressStyled } from '@comm100/styledComponents/Button/CCircularProgressStyled';
import { CVincallConnectContainerStyled } from '../../styledComponents/CVincallConnectContainerStyled';
import { VincallDomainService } from '../../domains/VincallDomainService';
import { getSiteId } from '../../helper/getSiteInfo';
import { ConnectState } from '../../domains/bo/ConnectStateBo';
import { PageContextProvider } from './PageContext';

export type ConnectStatus = 'connecting' | 'connected' | 'unconnected';

export const SettingsPage = () => {
  const client = APPClient.init();
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [connectStatus, setConnectStatus] = useState<ConnectStatus>(
    'connecting'
  );
  const [connectData, setConnectData] = useState<ConnectState>();
  const handleRef = useRef(null as any);

  const clickGoBackHandle = (event: MouseEvent) => {
    client.do('navigation.goto', '..');
  };
  const clickConnectHandle = (event: MouseEvent) => {
    const currentHref = window.location.href.substring(
      0,
      window.location.href.indexOf('?')
    );
    const callbackHref = currentHref.replace(
      /\/([^\/]*)\.html/gi,
      '/vincallCallback.html'
    );
    handleRef.current = delayOpenWindow(
      async () => {
        return [
          'https://oauthvincall.comm100dev.io/connect/authorize',
          '?client_id=vincall',
          '&response_type=code',
          '&scope=api',
          `&redirect_uri=${encodeURIComponent(
            `https://apivincall.comm100dev.io/open/login/callback?redirect_uri=${encodeURIComponent(
              callbackHref
            )}&siteId=${getSiteId()}&domain=${'https://oauthvincall.comm100dev.io'}`
          )}`
        ].join('');
      },
      'connect',
      {
        width: 480,
        height: 600,
        top: 100,
        left: 100
      }
    );
  };

  const handleLoadConnectState = () => {
    const connectStateService = new VincallDomainService({
      url: `/open/connectState?siteId=${getSiteId()}`
    });
    connectStateService
      .get()
      .then((data) => {
        setConnectStatus(data.connected ? 'connected' : 'unconnected');
        setConnectData(data as ConnectState);
      })
      .catch((err) => {
        setConnectStatus('unconnected');
      });
  };
  const handleMessage = async (event: any) => {
    const { code } = event.data;
    const pathname = event.source.location.pathname;

    if (pathname.toLowerCase().indexOf('vincallcallback.html') >= 0 && code) {
      setIsIntegrating(true);

      handleRef.current.then((h) => h.close());

      handleLoadConnectState();
    }
  };
  const handleLoad = () => {
    // check connect state
    handleLoadConnectState();
    //register message event
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  };
  useEffect(() => {
    return handleLoad();
  }, []);

  const PageContext = React.createContext({});

  return (
    <CPage
      id='settingsPage'
      title='VinCall Integration'
      description='You can use vincall to enable the phone channel. We allow Agent to use Vincall directly in the Agent Console to answer calls or call users directly.'
      onClickGoBack={clickGoBackHandle}
    >
      <PageContextProvider
        value={{
          disconnectCallback: () => {
            setConnectStatus('unconnected');
          }
        }}
      >
        {connectStatus === 'connecting' && <CFormSkeleton />}
        {connectStatus === 'unconnected' && (
          <>
            {isIntegrating && (
              <CVincallConnectContainerStyled>
                <CCircularProgressStyled size={50} />
              </CVincallConnectContainerStyled>
            )}
            {!isIntegrating && <CUnConnected onClick={clickConnectHandle} />}
          </>
        )}
        {connectStatus === 'connected' && connectData && (
          <CIntegrationForm connect={connectData}>
            <CFormContent />
          </CIntegrationForm>
        )}
      </PageContextProvider>
    </CPage>
  );
};
