import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PersonService {

  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/persons';
  url: any = 'https://eservice.yru.ac.th/apis/research/persons';


  gets(options?: any) {
    return this.http.get(this.url, {params: options});
  }

  get(id: number) {
    return this.http.get(this.url + '/' + id);
  }


}
