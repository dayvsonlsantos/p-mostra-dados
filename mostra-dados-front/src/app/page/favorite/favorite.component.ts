import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserOptions } from 'src/app/interfaces/user-options';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  //(en) Receives the IDs for each chart.
  card01 = 'favorite-01'
  card02 = 'favorite-02'
  card03 = 'favorite-03'
  card04 = 'favorite-04'
  card05 = 'favorite-05'
  card06 = 'favorite-06'
  card07 = 'favorite-07'
  card08 = 'favorite-08'



  @Input() userID!: number;
  @Input() favoriteOptions!: any;

  getCurrentDate = new Date();

  currentDate = this.getCurrentDate.toISOString().slice(0, 10);
  

  favorite01Data: UserOptions = {
    user_id: this.userID,
    cardValueID: this.card01,
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite02Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-02',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite03Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-03',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite04Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-04',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite05Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-05',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite06Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-06',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite07Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-07',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  favorite08Data: UserOptions = {
    user_id: this.userID,
    cardValueID: 'favorite-08',
    chartType: 'empty',
    selectedOptions: [],
    startDate: '2014-01-01',
    endDate: this.currentDate,
    aggregate: '',
    timeGrouping: 'month',
    specificFilter: "u.name IS NOT NULL",
  }

  ngOnInit(): void {

    if (Array.isArray(this.favoriteOptions)) {
      // Itera sobre cada objeto no array
      this.favoriteOptions.forEach(item => {

        if (item.data_cardValueID === "favorite-01") {
          this.favorite01Data = {
            user_id: this.userID,
            cardValueID: 'favorite-01',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }

        if (item.data_cardValueID === "favorite-02") {
          this.favorite02Data = {
            user_id: this.userID,
            cardValueID: 'favorite-02',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }

        if (item.data_cardValueID === "favorite-03") {
          this.favorite03Data = {
            user_id: this.userID,
            cardValueID: 'favorite-03',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }

        if (item.data_cardValueID === "favorite-04") {
          this.favorite04Data = {
            user_id: this.userID,
            cardValueID: 'favorite-04',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }

        if (item.data_cardValueID === "favorite-05") {
          this.favorite05Data = {
            user_id: this.userID,
            cardValueID: 'favorite-05',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }
        
        if (item.data_cardValueID === "favorite-06") {
          this.favorite06Data = {
            user_id: this.userID,
            cardValueID: 'favorite-06',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }

        if (item.data_cardValueID === "favorite-07") {
          this.favorite07Data = {
            user_id: this.userID,
            cardValueID: 'favorite-07',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }
        
        if (item.data_cardValueID === "favorite-08") {
          this.favorite08Data = {
            user_id: this.userID,
            cardValueID: 'favorite-08',
            chartType: item.data_chartType,
            selectedOptions: item.data_selectedOptions,
            startDate: item.data_startDate,
            endDate: item.data_endDate,
            aggregate: item.data_aggregate,
            timeGrouping: item.data_timeGrouping,
            specificFilter: item.data_specificFilter,
          }         
        }
      });
    } else {
      console.error('A resposta do servidor não é um array:', this.favoriteOptions);
    }

  }
}
