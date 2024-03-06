import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Doura = ({ gpts, spts, bpts }) => {
  // Data for the pie chart
  const series = [gpts, spts, bpts];
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['gold Points', 'silver Points', 'bronze Points'],
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default Doura;
