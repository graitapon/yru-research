import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SkillService {
  params = {
    token: localStorage.getItem('token')
  };

  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/skills';
  url: any = 'https://eservice.yru.ac.th/apis/research/skills';


  gets(options?: any) {
    return this.http.get(this.url, {params: options});
  }



}
