import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ContractService {
  params: any = {
    token: localStorage.getItem('token')
  };

  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/contracts';
  // url2 = 'http://localhost/apis/research/admin-contracts';
  url: any = 'https://eservice.yru.ac.th/apis/research/contracts';
  url2: any = 'https://eservice.yru.ac.th/apis/research/admin-contracts';

  gets(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url, {params: merged});
  }

  get(id: number) {
    return this.http.get(this.url + '/' + id, {params: this.params});
  }

  update(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data, {params: this.params});
  }



  getsByAdmin(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url2, {params: merged});
  }

  getByAdmin(id: number) {
    return this.http.get(this.url2 + '/' + id, {params: this.params});
  }


}
