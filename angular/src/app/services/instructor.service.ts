import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private instructorsURL = 'http://localhost/jsonapi/instructor/instructor';

  constructor() {}

  public async getInstructors<T>(): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'get',
            url: `${this.instructorsURL}`
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  public async getInstructor<T>(id: string): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'get',
            url: `${this.instructorsURL}/${id}`
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  public async patchInstructor<T>(id: string, body: Object): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'patch',
            url: `${this.instructorsURL}/${id}`,
            data: body
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  public async postInstructor<T>(body: Object): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'post',
            url: this.instructorsURL,
            data: body
        });
        return( axiosResponse.data );
    } catch ( error ) {
        return( Promise.reject( this.handleError( error ) ) );
    }
  }

  public async deleteInstructor<T>(id: string): Promise<T> {
    try {
        const axiosResponse = await axios.request<T>({
            method: 'delete',
            url: `${this.instructorsURL}/${id}`
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
