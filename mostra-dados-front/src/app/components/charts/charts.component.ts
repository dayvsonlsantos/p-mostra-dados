import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ChartData } from 'src/app/interfaces/chart-data';
import { UserOptions } from 'src/app/interfaces/user-options';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  // cardID -> (en) Receives the chart ID.
  // userOptions -> (en) Receives the options selected by the user
  // chartOption -> (en) Receives the chart chosen by the user
  // chartOption -> (en) Receives the chart chosen by the user

  @Input() cardID!: string;
  @Input() userOptions!: UserOptions;
  @Input() chartOption!: string;
  @Input() chartClass!: string;

  constructor(
    //(en) Retrieves data from the database.
    private dataService: DataService,
  ) { }

  //(en) Receives data from the database.
  dataColumns: string[] = [];

  //(en) Will receive the value of a user option.
  chartData: ChartData = {
    value: '',
    name: ''
  }

  //(en) Display the chart title.
  showChartTitle: string = ''

  //(en) Determines whether the filtered chart has data or not.
  isData: boolean = true;

  //(en) Receives the unique value to be displayed
  uniqueValue: string = '';

  //(en) Filters used
  // stringFiltersUsed: string = '';

  // getCurrentDate = new Date();

  // currentDate = this.getCurrentDate.toISOString().slice(0, 10);

  openChart(data: any[]) {
    //(en) Checks if the values returned from the data are equal to 0, with isData set to false.
    if (data.length === 0) {
      this.isData = false;
    } else {
      this.isData = true;
    }

    // (en) Checks the possible user options and redirects to the correct assignment.
    data.forEach((item: { [key: string]: string }) => {
      // Itera sobre as chaves do objeto.
      Object.keys(item).forEach(key => {

        if (key === 'Documentos processados' || key === 'Páginas Processadas' || key === 'Páginas Acumulativas') {
          this.chartData.value = key;
        } else {
          this.chartData.name = key;
        }
      });
    });


    //(en) Map the values from your array of objects to the format expected by ECharts.
    const mappedData = data.map(item => ({
      value: Number(item[this.chartData.value]), // Certifique-se de converter para número, se necessário.
      name: item[this.chartData.name],
    }));

    //(en) Getting an HTML element from the DOM using the cardID (via this.cardID), ensuring it's not null.
    var chartDom = document.getElementById(this.cardID)!;

    //(en) Initializing an ECharts chart using the echarts instance.
    var myChart = echarts.init(chartDom);

    var option = {};

    switch (this.chartOption) {
      case 'bar':
        option = {
          title: {
            textStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#504A4C'
            },
            left: 'center', // Posição do título
            top: '2%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',

              //(en) Getting the values of the 'name' property from each object in the 'mappedData' array
              data: mappedData.map(item => item.name),
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                fontSize: 12, // Tamanho da fonte para o rótulo do eixo X
                inside: false,
                rotate: 45,
              },
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Total',
              type: 'bar',
              barWidth: '60%',
              label: {
                show: true,
                fontSize: 14, // Tamanho da fonte para as etiquetas da série
                position: 'insideTop' // Exibe o rótulo dentro da barra
              },
              itemStyle: {  // Defina a cor das barras aqui
                color: '#DB0185'  // Altere 'blue' para a cor desejada
              },

              //(en) Getting the values of the 'value' property from each object in the 'mappedData' array
              data: mappedData.map(item => item.value)
            }
          ]
        };
        break;
      case 'horizontal-bar':
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: 'category',
            data: mappedData.map(item => item.name),
            axisLabel: {
              fontSize: 12, // Tamanho da fonte para o rótulo do eixo X
              inside: false,
              rotate: 45,
            },
          },
          series: [
            {
              type: 'bar',
              data: mappedData.map(item => item.value),
              itemStyle: {
                color: '#DB0185'
              }
            }
          ]
        };
        break;
      case 'pie':
        //(en) Calculate the total sum of values from the data array.
        const totalSum = data.reduce((acc, item) => {
          const itemValue = parseInt(item[this.chartData.value]);
          if (!isNaN(itemValue)) {
            return acc + itemValue;
          } else {
            return acc;
          }
        }, 0);

        const colors = [
          '#DB0185', '#BD0067', '#8C00D8', '#5c1c7c', '#350020', '#504A4C',
          '#FF00A5', '#9F0049', '#7900E4', '#8A2BE2', '#9e2984', '#A38474',
          '#f9a5ff', '#81002B', '#9E33E7', '#4B0082', '#4B0082',
          '#f463ff', '#63000D', '#FF67FF', '#483D8B', '#800080',
          '#ee00ff', '#A600C0', '#D899EC', '#8B008B', '#6e007a',
        ];

        option = {
          title: {
            textStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#504A4C'
            },
            left: 'center', // Posição do título
            top: '2%',
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '9%',
            left: 'center'
          },
          series: [
            {
              name: this.chartData.value,
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                formatter: '{b}\n\n{d}% de ' + totalSum, // {b} representa o nome, {d} representa a porcentagem
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: 'normal'
                }
              },
              labelLine: {
                show: true
              },
              color: colors,

              //(en) Getting the values of the properties (value and name) present in the 'mappedData' array.
              data: mappedData
            }
          ]
        };
        break;
      case 'line':
        option = {
          xAxis: {
            type: 'category',
            data: mappedData.map(item => item.name),
            axisLabel: {
              fontSize: 12, // Tamanho da fonte para o rótulo do eixo X
              inside: false,
              rotate: 45,
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: mappedData.map(item => item.value),
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#DB0185'
              },
              itemStyle: {  // Defina a cor das barras aqui
                color: '#DB0185'  // Altere 'blue' para a cor desejada
              },
              label: {
                show: true,  // Exibe os valores nos pontos
                position: 'top'  // Posição dos valores (pode ser 'top', 'bottom', 'inside', etc.)
              },
            }
          ]
        };
        break;
      case 'area':
        option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: mappedData.map(item => item.name),
            axisLabel: {
              fontSize: 12, // Tamanho da fonte para o rótulo do eixo X
              inside: false,
              rotate: 45,
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: mappedData.map(item => item.value),
              type: 'line',
              areaStyle: {},
              lineStyle: {
                color: '#DB0185'
              },
              itemStyle: {  // Defina a cor das barras aqui
                color: '#DB0185'  // Altere 'blue' para a cor desejada
              },
              label: {
                show: true,  // Exibe os valores nos pontos
                position: 'top'  // Posição dos valores (pode ser 'top', 'bottom', 'inside', etc.)
              },
            }
          ]
        };
        break;
      case 'scatter':
        option = {
          xAxis: {
            type: 'category',
            data: mappedData.map(item => item.name),
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              symbolSize: 20,
              data: mappedData.map(item => item.value),
              type: 'scatter',
              itemStyle: {  // Defina a cor das barras aqui
                color: '#DB0185'  // Altere 'blue' para a cor desejada
              },
              label: {
                show: true,  // Exibe os valores nos pontos
                position: 'top'  // Posição dos valores (pode ser 'top', 'bottom', 'inside', etc.)
              },
            }
          ]
        };
        break;
      case 'uniqueValue':
        if (this.userOptions.selectedOptions.includes('only_doc_count')) {
          this.uniqueValue = (mappedData.map(item => item.value)).toString();
          this.showChartTitle = 'Total de Documentos Analisados'
        }
        if (this.userOptions.selectedOptions.includes('only_pages_process')) {
          this.uniqueValue = (mappedData.map(item => item.value)).toString();
          this.showChartTitle = 'Total de Páginas Analisadas'
        }
        if (this.userOptions.selectedOptions.includes('most_analyzed_doc')) {
          this.uniqueValue = (mappedData.map(item => item.name)).toString();
          this.showChartTitle = 'Doc. Mais Analisado'
        }
        if (this.userOptions.selectedOptions.includes('doc_most_analyzed_pages')) {
          this.uniqueValue = (mappedData.map(item => item.name)).toString();
          this.showChartTitle = 'Doc. Com Mais Páginas Analisadas'
        }
        if (this.userOptions.selectedOptions.includes('user_most_analyzed_doc')) {
          this.uniqueValue = (mappedData.map(item => item.name)).toString();
          this.showChartTitle = 'Usuário + Analisou Doc.'
        }
        if (this.userOptions.selectedOptions.includes('segment_most_analyzed_doc')) {
          this.uniqueValue = (mappedData.map(item => item.name)).toString();
          this.showChartTitle = 'Segmento + Analisou Doc.'
        }
        if (this.userOptions.selectedOptions.includes('user_most_analyzed_pages')) {
          this.uniqueValue = (mappedData.map(item => item.name)).toString();
          this.showChartTitle = 'Usuário + Analisou Páginas de Doc.'
        }
        if (this.userOptions.selectedOptions.includes('segment_most_analyzed_pages')) {
          this.uniqueValue = (mappedData.map(item => item.name)).toString();
          this.showChartTitle = 'Segmento + Analisou Páginas de Doc.'
        }
        break;
    }

    //(en) Applying the specified chart configurations stored in the 'option' variable.
    myChart.setOption(option);

    //(en) If there is a value in 'isData', showChartTitle will receive the title.
    if ((this.isData) && (this.userOptions.chartType != 'uniqueValue')) {
      this.showChartTitle = 'Relação entre: ' + Object.keys(data[0]).join(', ');
    } //(en) Otherwise, it won't have a value and will remain empty.

    window.addEventListener('resize', function () {
      myChart.resize();
    })
  }

  ngOnInit(): void {

    this.dataService.getData(this.userOptions).subscribe((dataColumns: string[]) => {
      this.openChart(dataColumns);

    });

  }
}
