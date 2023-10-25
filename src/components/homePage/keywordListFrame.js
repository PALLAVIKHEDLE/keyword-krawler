import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import faker from 'faker'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const KeywordBubbleChart = ({ keywordListData }) => {
  const bubbleData = keywordListData.topKeywordListings.map(item => ({
    r: item.count,
    original:item.original
    
  }));

  const data = {
    datasets: [
      {
        label: 'Keyword Dataset',
        data: bubbleData.map(item => ({
            x: faker.datatype.number({ min: -100, max: 100 }),
            y: faker.datatype.number({ min: -100, max: 100 }),
            r: item.r,
            
          })),
        backgroundColor: (context) => {
          const count = context.dataset.data[context.dataIndex].r;
          if (count > 65) {
            return 'rgba(255, 255, 0, 0.5)'; // yellow
          } else if (count > 35) {
            return 'rgba(255, 165, 0, 0.5)'; // orange
          } else {
            return 'rgba(53, 162, 235, 0.5)'; // blue
          }
        },
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
        tooltip: {
        callbacks: {
          label: (context) => {
            const original = bubbleData[context.dataIndex].original;
            return `Original: ${original}`;
          },
        },
      },
      },
    };

 return <Bubble options={options} data={data} style={{margin:'6%'}} />;
};
export default KeywordBubbleChart;