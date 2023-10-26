import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
        data: algoData.map(item => item.algoExecutionTime),
        borderColor: 'white',
        backgroundColor: '#FABB2E',
        barPercentage:1 , 
        categoryPercentage: 0.5, 
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 5, // Add border radius for smaller bars
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, 
      },
      x: {
        beginAtZero: true, 
        ticks: {
          color: 'white',
        },
      },
   
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: 'String Algorithm Comparison',
        color:'white'
      },
    },
  };

  return <Bar options={options} data={data} style={{ margin: '30%',marginTop:'10%' }} />;
};

export default AlgoComparision;
