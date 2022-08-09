import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';

import GlobalStyle from './styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </>
  )
}

