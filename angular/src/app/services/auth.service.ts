import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public tokenURL = 'http://localhost/oauth/token';
  constructor() {}

  public async login<T>(data): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'post',
            url: this.tokenURL,
            data: data
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public async refreshLogin<T>(): Promise<T> {
    try {
      const refreshData = {
        refresh_token: localStorage.getItem('refresh_token'),
        client_id: '671c1a41-66db-48af-baac-1c81b0392dea',
        client_secret: 'secret',
        grant_type: 'refresh_token'
      };
      const formData = new FormData();
      for (const key of Object.keys(refreshData)) {
        formData.append(key, refreshData[key]);
      }
      const axiosResponse = await axios.request<T>({
          method: 'post',
          url: this.tokenURL,
          data: formData
      });
      return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  getToken(): string {
    const token = localStorage.getItem('access_token');

    return token;
  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('access_token');

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
