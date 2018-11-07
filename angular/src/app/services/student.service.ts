import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsURL = 'http://localhost/jsonapi/student/student';

  constructor() {}

  public async getStudents<T>(): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'get',
            url: this.studentsURL
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  public async getStudent<T>(id: string): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'get',
            url: `${this.studentsURL}/${id}?include=field_courses`
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

}
