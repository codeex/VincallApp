import React from 'react';
import { render } from 'react-dom';
import { CProviders } from '../../components/CProviders';
import '../../CSS/main.css';
import { SettingsPage } from './SettingsPage';

const App = () => {
  return (
    <CProviders>
      <SettingsPage />
    </CProviders>
  );
};

render(<App />, document.getElementById('main'));
