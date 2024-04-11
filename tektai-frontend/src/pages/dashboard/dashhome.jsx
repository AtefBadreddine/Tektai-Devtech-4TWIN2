import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import UserList from '../../components/User/Userlist';
import Chartcercle from '../../components/charts/cercelchart';
import Chartone from '../../components/charts/chartone';
import AppView from './view/app-view';
import ThemeProvider from '../../theme';
const Dashhome = () => {
  return (

   <DefaultLayout>
       <ThemeProvider>
      <AppView/>
       </ThemeProvider>
    </DefaultLayout>

 
  );
};

export default Dashhome;
