import { Chart } from "chart.js";

export function MyNewChart(canvas: HTMLCanvasElement, labels: string[], currentDayIndex: number, workedTimes: number[]): Chart {
    const newChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: ' ',
          data: workedTimes,
          borderWidth: 1,
          backgroundColor: "#EA8A79",
        }],
        
      },
      options: {
        plugins: {
          legend: {
              display: false 
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            border: {
              display: false
            },
            ticks: {
              padding: 11,
              font: {
                size: 24, 
              },
              color: '#999999',
            },
          },
          y: {
            min: 0,
            max: 100,
            position: 'right',
            border: {
              display: false
            },
            ticks: {
              padding: 22,
              font: {
                size: 12, 
              },
              color: '#333',
              stepSize: 25,
              callback: (value) => {
                if (typeof value === 'number') {
                  if (value >= 60) {
                    const hours = Math.floor(value / 60);
                    const minutes = value % 60;
                    return `${hours}ч ${minutes}мин`;
                  } else if (value === 0) {
                    return '';
                  } else {
                    return `${value}мин`;
                  }
                }
                return value;
              }
            },
          },
        },
        layout: {
          padding: {
            top: 68,
          },
        }
      }
    });
  
    return newChart;
  }

