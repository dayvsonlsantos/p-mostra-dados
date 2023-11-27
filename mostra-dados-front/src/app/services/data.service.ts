import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extracts, Users } from '../interfaces/database-tables';
import { environment } from 'src/environments/environment';
import { UserOptions } from '../interfaces/user-options';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  setTable: string = ''
  userOptions!: UserOptions;

  constructor(private http: HttpClient) { }

  getData(userOptions: UserOptions) {

    const params = {
      cardValueID: userOptions.cardValueID,
      chartType: userOptions.chartType,
      selectedOptions: userOptions.selectedOptions.join(','), // Supondo que selectedOptions é uma lista
      startDate: userOptions.startDate,
      endDate: userOptions.endDate,
      aggregate: userOptions.aggregate,
      timeGrouping: userOptions.timeGrouping,
      specificFilter: userOptions.specificFilter
      
    };

    console.log(params)

    return this.http.get<any[]>(`${environment.api}/data`, { params });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          return this.http.get<any[]>(`${environment.api}/data?userOptions=${this.userOptions}`)
  }

  getTables(): Observable<any[]> {
    return this.http.get<string[]>(`${environment.api}/data/getTables`)
  }

  getColumns(tableOption: string) {
    this.setTable = tableOption;
    return this.http.get<any[]>(`${environment.api}/data/getColumns?tableOption=${this.setTable}`)
  }

  getUsers(): Observable<any[]>{
    return this.http.get<string[]>(`${environment.api}/data/getUsers`)
  }

  getSegments(): Observable<any[]>{
    return this.http.get<string[]>(`${environment.api}/data/getSegments`)
  }

  getDocTypes(): Observable<any[]>{
    return this.http.get<string[]>(`${environment.api}/data/getDocTypes`)
  }

}
