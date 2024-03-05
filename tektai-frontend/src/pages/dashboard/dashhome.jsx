import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import UserList from '../../components/User/Userlist';
import Chartcercle from '../../components/charts/cercelchart';
import Chartone from '../../components/charts/chartone';

const Dashhome = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Insert your grid items here */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-8 xl:col-span-6 2xl:col-span-8">
          <Chartcercle />
        </div>
        <div className="col-span-12 md:col-span-4 xl:col-span-3 2xl:col-span-2">
          <Chartone />
        </div>
        <div className="col-span-12 md:col-span-12 xl:col-span-3">
          <UserList />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashhome;
