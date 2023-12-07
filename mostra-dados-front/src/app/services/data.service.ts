import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Extracts, Users } from '../interfaces/database-tables';
import { environment } from 'src/environments/environment';
import { UserOptions } from '../interfaces/user-options';

interface ColumnResponse {
  columns: { column_name: string }[];
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  setTable: string = ''
  userOptions!: UserOptions;

  constructor(private http: HttpClient) { }

  getData(userOptions: UserOptions) {
    const queryParams = `cardValueID=${userOptions.cardValueID}&chartType=${userOptions.chartType}&selectedOptions=${userOptions.selectedOptions.join(',')}&startDate=${userOptions.startDate}&endDate=${userOptions.endDate}&aggregate=${userOptions.aggregate}&timeGrouping=${userOptions.timeGrouping}&specificFilter=${userOptions.specificFilter}`;

    return this.http.get<any[]>(`${environment.api}/extracts/getQuery?${queryParams}`);
  }

  sendFavorite(userOptions: UserOptions): Observable<any[]> {
    return this.http.post<any[]>(`${environment.api}/users/createOrUpdateData`, userOptions);
  }

  getFavorite(userId: number) {
    return this.http.get<any[]>(`${environment.api}/users/${userId}/data`);
  }


  getExtractsColumn(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/extracts/getExtractColumns`)
  }

  getUsersColumn(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/users/getUsersColumns`)
  }

  getUsers(): Observable<any[]> {
    return this.http.get<string[]>(`${environment.api}/users/getUsers`)
  }

  getSegments(): Observable<any[]> {
    return this.http.get<string[]>(`${environment.api}/users/getSegments`)
  }

  getDocTypes(): Observable<any[]> {
    return this.http.get<string[]>(`${environment.api}/extracts/getDocTypes`)
  }

}
