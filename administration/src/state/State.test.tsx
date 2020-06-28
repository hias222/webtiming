import React from 'react';
import ReactDOM from 'react-dom';
import State from './State';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<State />, div);
  ReactDOM.unmountComponentAtNode(div);
});
