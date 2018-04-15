import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    this.http.get<Problem[]>('api/v1/problems')
      .toPromise()
      .then((res) => {
        this.problemsSource.next(res);
      })
      .catch(this.handleError);
    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get<Problem>(`api/v1/problems/${id}`)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<Problem>('/api/v1/problems', problem, {headers: headers})
      .toPromise()
      .then((res) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<Object> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<Object>('/api/v1/build_and_run', data, {headers: headers})
      .toPromise()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
