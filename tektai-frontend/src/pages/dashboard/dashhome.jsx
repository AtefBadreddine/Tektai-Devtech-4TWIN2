import React from 'react';
// import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
import DefaultLayout from '../../layout/DefaultLayout';
import UserList from '../../components/User/Userlist';

const Dashhome = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
<UserList/>        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashhome;
