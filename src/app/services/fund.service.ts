import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FundService {
  params: any = {
    token: localStorage.getItem('token')
  };

  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/funds';
  // url2 = 'http://localhost/apis/research/fund-deps';
  url: any = 'https://eservice.yru.ac.th/apis/research/funds';
  url2: any = 'https://eservice.yru.ac.th/apis/research/fund-deps';
  url3: any = 'https://eservice.yru.ac.th/apis/research/fund-files';

  gets(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url, {params: merged});
  }

  get(id: any) {
    return this.http.get(this.url + '/' + id, {params: this.params});
  }

  getsByAdmin(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url2, {params: merged});
  }

  getByAdmin(depId: any) {
    return this.http.get(this.url2 + '/' + depId, {params: this.params});

  }

  updateByAdmin(id: any, data: any) {
    return this.http.put(this.url2 + '/' + id, data, {params: this.params});
  }

  addByAdmin(data: any) {
    return this.http.post(this.url2, data, {params: this.params});

  }

  deleteFile(id: any) {
    return this.http.delete(this.url3 + '/' + id, {params: this.params});
  }


}
