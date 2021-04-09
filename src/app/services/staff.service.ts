import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class StaffService {
  params = {
    token: localStorage.getItem('token')
  };

  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/staffs';
  url: any = 'https://eservice.yru.ac.th/apis/research/staffs';


  gets(options?: any) {
    return this.http.get(this.url, {params: options});
  }


}
