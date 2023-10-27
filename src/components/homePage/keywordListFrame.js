import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import faker from 'faker';
import { f } from 'html2pdf.js';

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
  const calculateBubbleRadius = (index) => {
    if (index > 7) {
      return 50 ;
    } else if (index > 3) {
      return 65;
    } else {
      return 85;
    }
  }
  const calculateBubbleX = (index) => {
    return faker.datatype.number({ min: -100, max: 100 });
  };
  
  const calculateBubbleY = (index) => {
    return faker.datatype.number({ min: -100, max: 100 });
  };

  const bubbleData = keywordListData?.topKeywordListings.map((item, index) => (

    {
    r: calculateBubbleRadius(index),
    x: calculateBubbleX(index),
    y: calculateBubbleY(index),
    originalKeyword: item.originalKeyword,
  }));

  const data = {
    datasets: [
      {
        label: 'Keyword',
        data: bubbleData?.map((item) => ({
          x: item.x ,
          y: item.y ,
          r: item.r,
        })),
        backgroundColor: bubbleData?.map((item) => {
          if (item.r > 65) {
            return '#F74C4C'; // red
          } else if (item.r > 50) {
            return '#FABB2E'; // yellow
          } else if (item.r > 0) {
            return '#70C1B3'; // blue-green
          } else {
            return '#70C1B3'; // blue-green
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
        labels: bubbleData?.map((item) => ({
          text: item.originalKeyword,
        })),
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const original = bubbleData[context.dataIndex].originalKeyword;
            return `${label}: ${original}`;
          },
        },
      },
    },
  };

  return <Bubble options={options} data={data} style={{ margin: '6%', marginTop:'3%' }} />;
};
export default KeywordBubbleChart;