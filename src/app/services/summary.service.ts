import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SummaryService {
  constructor(
    private http: HttpClient,
  ) { }

  // url = 'http://localhost/apis/research/summary';
  url: any = 'https://eservice.yru.ac.th/apis/research/summary';

  get(id: any, options?: any) {
    return this.http.get(this.url + '/' + id, {params: options});
  }


}
