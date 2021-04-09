import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AnnounceService {
  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/announces';
  url: any = 'https://eservice.yru.ac.th/apis/research/announces';


  gets(options?: any) {
    return this.http.get(this.url, {params: options});
  }



}
