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

if (!ChartJS?.plugins?.getPlugin('customLabels')) {
  ChartJS.register({
    id: 'customLabels',
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const customLabels = chart.options.plugins.customLabels;

      if (customLabels && customLabels.labels) {
        customLabels?.labels.forEach((label, index) => {
          const dataset = chart.data.datasets[0];
          const meta = chart.getDatasetMeta(0);
          const point = meta.data[index].getCenterPoint();

          // Draw the label at the center of each bubble
          ctx.fillStyle = 'black'; // Set label color
          ctx.font = '13px Arial'; // Set label font
          ctx.textAlign = 'center';
          ctx.fillText(label.text, point.x, point.y);
        });
      }
    },
  });
}

const AlgoComparision = ({ multialgo }) => {
  const algoData = multialgo?.data.map(item => ({
    algoName: item.algoName,
    algoExecutionTime: item.algoExecutionTime,
  }));

  const data = {
    labels: algoData?.map(item => item.algoName),
    datasets: [
      {
        data: algoData?.map(item => item.algoExecutionTime),
        borderColor: 'white',
        backgroundColor: '#FABB2E',
        // barPercentage:1 , 
        // categoryPercentage: 0.5, 
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 5, 
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, 
        ticks: {
          color: 'white',
        },
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
        color: 'white',
        font: {
          size: 16, 
          weight: 'bold', 
        },
      },
      customLabels: {
        labels: algoData?.map((item) => ({
          text: item.algoName,
        })),
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            return `${label}` 
          },
        },
      },
    },
  };


  return <Bar options={options} data={data} style={{ marginRight:'10%',marginLeft:'13%', marginTop: "10%" , marginBottom: "10%"}} />;
};

export default AlgoComparision;
