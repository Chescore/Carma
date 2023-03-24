import React from 'react';
import Router from './Router';
import axios from 'axios'

import { ConsumerAuthContextProvider } from './hoc/AuthContext/consumer_auth';
import { DealerAuthContextProvider } from './hoc/AuthContext/dealer_auth';
import Layout from './hoc/Layout/layout';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <DealerAuthContextProvider>
        <ConsumerAuthContextProvider>
          <Layout>
            <Router/>
          </Layout>
        </ConsumerAuthContextProvider>
      </DealerAuthContextProvider>
    </div>
  );
};

export default App;