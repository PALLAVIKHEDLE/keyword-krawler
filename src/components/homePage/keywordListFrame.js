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
          ctx.font = '13px Arial'; // Set label font
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
        label: 'Keyword',
        data: bubbleData.map((item) => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: item.r,
        })),
        backgroundColor: bubbleData.map((item) => {
          if (item.r > 65) {
            return '#FABB2E'; // yellow
          } else if (item.r > 35) {
            return '#F2510A'; // orange
          }else if(item.r>25){
            return '#5b209a'; //purple
          }else {
            return '#287e29'; // green
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
        display:false
      },
      y: {
        beginAtZero: true,
        display:false
      },
    },

    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: 'Word Frequency Bubble',
        color: 'white',
        font: {
          size: 26, 
          weight: 'bold', 
        },
       marginBottom:'4%'
      },
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

  return <Bubble options={options} data={data} style={{ margin: '6%', marginTop:'3%' }} />;
};
export default KeywordBubbleChart;