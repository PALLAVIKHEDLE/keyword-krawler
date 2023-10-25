import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

if (!ChartJS?.plugins?.getPlugin('customLabels')) {
  ChartJS.register({
    id: 'customLabels',
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const customLabels = chart.options.plugins.customLabels;

      if (customLabels && customLabels.labels) {
        customLabels.labels.forEach((label, index) => {
          const dataset = chart.data.datasets[0];
          const meta = chart.getDatasetMeta(0);
          const point = meta.data[index].getCenterPoint();

          // Draw the label at the center of each bubble
          ctx.fillStyle = 'black'; // Set label color
          ctx.font = '12px Arial'; // Set label font
          ctx.textAlign = 'center';
          ctx.fillText(label.text, point.x, point.y);
        });
      }
    },
  });
}

const KeywordBubbleChart = ({ keywordListData }) => {
  const calculateBubbleRadius = (count) => {
    // Adjust this factor as needed to control the scaling of bubbles
    const scalingFactor = 9;
    return Math.sqrt(count) * scalingFactor;
  };

  const bubbleData = keywordListData.topKeywordListings.map((item) => ({
    r: calculateBubbleRadius(item.count),
    original: item.original,
  }));

  const data = {
    datasets: [
      {
        label: 'Keyword Dataset',
        data: bubbleData.map((item) => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: item.r,
        })),
        backgroundColor: bubbleData.map((item) => {
          if (item.r > 65) {
            return 'rgba(255, 255, 0, 0.5)'; // yellow
          } else if (item.r > 35) {
            return 'rgba(255, 165, 0, 0.5)'; // orange
          } else {
            return 'rgba(53, 162, 235, 0.5)'; // blue
          }
        }),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },

    plugins: {
      customLabels: {
        labels: bubbleData.map((item) => ({
          text: item.original,
        })),
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const original = bubbleData[context.dataIndex].original;
            return `${label}: ${original}`;
          },
        },
      },
    },
  };

  return <Bubble options={options} data={data} style={{ margin: '6%' }} />;
};
export default KeywordBubbleChart;