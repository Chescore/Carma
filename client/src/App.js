import React from 'react';
import Router from './Router';
import axios from 'axios'

import { ConsumerAuthContextProvider } from './hoc/AuthContext/consumer_auth';
import { DealerAuthContextProvider } from './hoc/AuthContext/dealer_auth';
import { ConsumerContextProvider } from './hoc/AuthContext/consumer_username';
import { DealerContextProvider } from './hoc/AuthContext/dealer_username'
import Layout from './hoc/Layout/layout';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <DealerAuthContextProvider>
        <ConsumerAuthContextProvider>
          <DealerContextProvider>
            <ConsumerContextProvider>
              <Layout>
                <Router/>
              </Layout>
            </ConsumerContextProvider>
          </DealerContextProvider>
        </ConsumerAuthContextProvider>
      </DealerAuthContextProvider>
    </div>
  );
};

export default App;