import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return (
    <>
      <label>receive message from parent's window</label>
    </>
  );
};

render(<App />, document.getElementById('main'));
