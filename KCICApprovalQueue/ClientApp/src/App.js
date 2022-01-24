import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Queue from './components/WarrantyClaimQueue';

const App = () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/queue' component={Queue} />
  </Layout>
);

export default App;
