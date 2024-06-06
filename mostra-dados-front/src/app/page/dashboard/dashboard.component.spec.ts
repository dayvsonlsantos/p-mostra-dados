// Comando para rodar o test: ng test --include src/app/page/dashboard/dashboard.component.spec.ts

// Importa as classes necessárias para realizar os testes
// ComponentFixture e TestBed são fornecidos pelo Angular para configurar e manipular componentes durante os testes.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component'; //componente que será testado.
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserOptions } from 'src/app/interfaces/user-options';


// Criando um mock, um componente simulado para substituir o app-select-chart durante os testes.
@Component({
  selector: 'app-select-chart',
  template: '<div></div>'
})
class MockSelectChartComponent {
  @Input() cardID!: string;
  @Input() cardClass!: string;
  @Input() chartValues!: UserOptions;
  @Input() userID!: number;
}

// describe -> Criando um grupo de testes
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  //beforeEach é executada antes de cada teste dentro do describe.
  //Garante que um certo conjunto de passos seja executado antes de cada teste ser rodado
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent, //declara o componente
        MockSelectChartComponent //declara o mock
      ],
    }).compileComponents(); //compila
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent); // usado para configurar o módulo de teste.
    component = fixture.componentInstance; // cria uma instância do componente a ser testado.
    component.userID = 1; // Define um userID para os testes
    fixture.detectChanges(); //Chamado para garantir que o componente seja renderizado e os dados estejam disponíveis para teste.
  });



  // Este teste verifica se o componente DashboardComponent foi criado com sucesso.
  // it -> descreve um teste individual. 
  // argumento descreve o que teste está verificando
  it('deve criar o componente', () => {
    // expect é uma função que espera que algo aconteça. No caso, espera-se que component seja verdadeiro (toBeTruthy()).
    expect(component).toBeTruthy();
  });
  // if true -> passa | else  -> fail




  // Este teste verifica se o componente DashboardComponent renderiza a quantidade correta de gráficos pequenos, médios e grandes. 
  it('deve renderizar 3 gráficos pequenos e 4 grandes', () => {
    // uso método queryAll do fixture.debugElement para selecionar elementos no DOM que correspondem às classes CSS dos gráficos 
    const smallCharts = fixture.debugElement.queryAll(By.css('.chart-xs'));
    const mediumCharts = fixture.debugElement.queryAll(By.css('.h-500'));
    const largeCharts = fixture.debugElement.queryAll(By.css('.chart-sm'));

    // Esperamos que haja 3 gráficos pequenos (chart-xs), 4 gráficos médios (h-500) e 1 gráfico grande (chart-sm).
    expect(smallCharts.length).toBe(3);
    expect(mediumCharts.length).toBe(4);
    expect(largeCharts.length).toBe(1);
  });




  // Este teste verifica se os dados são passados corretamente para o componente app-select-chart
  it('deve passar os dados corretos para app-select-chart', () => {

    // Seleciona e retorna os elementos no DOM que são instâncias do componente falso MockSelectChartComponent 
    // usando fixture.debugElement.queryAll(By.directive()).
    const chartComponents = fixture.debugElement.queryAll(By.directive(MockSelectChartComponent));
    expect(chartComponents.length).toBe(8);

    // Acessa o primeiro componente app-select-chart selecionado (chartComponents[0]).
    const chart1 = chartComponents[0].componentInstance as MockSelectChartComponent;
    
    // Verifica se os dados passados para este componente correspondem aos dados esperados
    expect(chart1.cardID).toBe('dashboard-01');
    expect(chart1.chartValues).toEqual(component.dashboard01Data);
    expect(chart1.userID).toBe(component.userID);
  });




  // Este teste verifica se os elementos renderizados pelo componente DashboardComponent possuem as classes CSS corretas. 
  it('deve renderizar elementos com as classes CSS corretas', () => {

    // Verificando se existe um elemento no DOM com a classe CSS .dashboard-first-container. 
    const firstContainer = fixture.debugElement.query(By.css('.dashboard-first-container'));
    // Se esse elemento existir, o teste passará (toBeTruthy()).
    expect(firstContainer).toBeTruthy();
  
    // Seleciona todos os elementos no DOM com a classe CSS .chart-xs e verificando se há 3 elementos.
    const smallCharts = fixture.debugElement.queryAll(By.css('.chart-xs'));
    expect(smallCharts.length).toBe(3);
  
    // Para cada elemento, verifica se ele possui as classes CSS esperadas
    smallCharts.forEach(chart => {
      expect(chart.nativeElement.classList.contains('position-relative')).toBeTrue();
      expect(chart.nativeElement.classList.contains('dashboard-sm')).toBeTrue();
      expect(chart.nativeElement.classList.contains('shadow')).toBeTrue();
      expect(chart.nativeElement.classList.contains('rounded')).toBeTrue();
      expect(chart.nativeElement.classList.contains('border-pink')).toBeTrue();
    });
  
    const largeCharts = fixture.debugElement.queryAll(By.css('.h-500'));
    expect(largeCharts.length).toBe(4);
  
    largeCharts.forEach(chart => {
      expect(chart.nativeElement.classList.contains('position-relative')).toBeTrue();
      expect(chart.nativeElement.classList.contains('shadow')).toBeTrue();
      expect(chart.nativeElement.classList.contains('rounded')).toBeTrue();
      expect(chart.nativeElement.classList.contains('border-pink')).toBeTrue();
    });
  });




  // Este teste verifica se as propriedades da interface UserOptions são passadas 
  // corretamente para cada instância do componente app-select-chart.
  it('deve passar as propriedades de UserOptions corretamente para app-select-chart', () => {
    
    // Seleciona e retorna os elementos no DOM que são instâncias do componente falso MockSelectChartComponent 
    // usando fixture.debugElement.queryAll(By.directive()).
    const chartComponents = fixture.debugElement.queryAll(By.directive(MockSelectChartComponent));
    expect(chartComponents.length).toBe(8);
  
    // Define os dados esperados para cada instância do componente app-select-chart.
    const expectedData = [
      { cardID: 'dashboard-01', chartValues: component.dashboard01Data },
      { cardID: 'dashboard-02', chartValues: component.dashboard02Data },
      { cardID: 'dashboard-03', chartValues: component.dashboard03Data },
      { cardID: 'dashboard-04', chartValues: component.dashboard04Data },
      { cardID: 'dashboard-05', chartValues: component.dashboard05Data },
      { cardID: 'dashboard-06', chartValues: component.dashboard06Data },
      { cardID: 'dashboard-07', chartValues: component.dashboard07Data },
      { cardID: 'dashboard-08', chartValues: component.dashboard08Data },
    ];
  
    // Verifica, em cada instancia, se as propriedades cardID e chartValues correspondem aos dados esperados 
    // definidos em expectedData.
    // Também verifica se a propriedade userID é igual ao userID do componente DashboardComponent.
    chartComponents.forEach((chart, index) => {
      const instance = chart.componentInstance as MockSelectChartComponent;
      expect(instance.cardID).toBe(expectedData[index].cardID);
      expect(instance.chartValues).toEqual(expectedData[index].chartValues);
      expect(instance.userID).toBe(component.userID);
    });
  });
  




  // Este teste descreve que está verificando se o gráfico com ID dashboard-04 é renderizado corretamente 
  // e se os dados correspondentes são passados para ele.
  it('deve renderizar o gráfico dashboard-04 com os dados corretos', () => {
    // seleciona o elemento do DOM que possui a classe .dasboard-04 
    // e procura dentro deste elemento por uma instância do componente app-select-chart usando query(By.directive()).
    const chartComponent = fixture.debugElement.query(By.css('.dasboard-04')).query(By.directive(MockSelectChartComponent));
    
    // Acessa instancia encontrada
    const instance = chartComponent.componentInstance as MockSelectChartComponent;

    // Verificamos se as propriedades cardID, chartValues e userID desta instância correspondem aos dados esperados:
    expect(instance.cardID).toBe('dashboard-04');
    expect(instance.chartValues).toEqual(component.dashboard04Data);
    expect(instance.userID).toBe(component.userID);
  });
  




  // Esse teste verifica se a propriedade currentDate do componente DashboardComponent é configurada corretamente com a data atual. 
  it('deve configurar a data atual corretamente', () => {
    // O slice(0, 10) extrai os primeiros 10 caracteres da string, que correspondem à data no formato "YYYY-MM-DD".
    const currentDate = new Date().toISOString().slice(0, 10);
    expect(component.currentDate).toBe(currentDate);
  });




  
  // Este teste verifica se os dados dos gráficos são atualizados corretamente quando o userID é alterado.
  it('deve atualizar os dados dos gráficos ao mudar o userID', () => {

    // define o valor de userID para 2 no componente DashboardComponent
    component.userID = 2;
    fixture.detectChanges(); //garantir que as alterações de detecção de mudança sejam acionadas.
  
    // seleciona as instâncias do componente app-select-chart no DOM usando fixture.debugElement.queryAll(By.directive()).
    const chartComponents = fixture.debugElement.queryAll(By.directive(MockSelectChartComponent));
    
    // Para cada instância do componente, verifica se a propriedade userID foi atualizada corretamente para 2.
    chartComponents.forEach(chart => {
      const instance = chart.componentInstance as MockSelectChartComponent;
      expect(instance.userID).toBe(2);
    });
  });
});
