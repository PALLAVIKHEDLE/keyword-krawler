import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AlgoComparision = ({ multialgo }) => {
  const algoData = multialgo.data.map(item => ({
    algoName: item.algoName,
    algoExecutionTime: item.algoExecutionTime,
  }));

  const data = {
    labels: algoData.map(item => item.algoName),
    datasets: [
      {
        label: 'Execution Time',
        data: algoData.map(item => item.algoExecutionTime),
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'String Algorithm Comparison',
      },
    },
  };

  return <Bar options={options} data={data} style={{ margin: '10%' }} />;
};

export default AlgoComparision;
