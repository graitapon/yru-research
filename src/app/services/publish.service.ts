import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PublishService {

  params: any = {
    token: localStorage.getItem('token')
  };

  constructor(private http: HttpClient) {
  }

  // url = 'http://localhost/apis/research/publishes';
  // url2 = 'http://localhost/apis/research/published';
  url: any = 'https://eservice.yru.ac.th/apis/research/publishes';
  url2: any = 'https://eservice.yru.ac.th/apis/research/published';
  url3: any = 'https://eservice.yru.ac.th/apis/research/admin-publishes';


  gets(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url, {params: merged});
  }

  get(id: number) {
    return this.http.get(this.url + '/' + id, {params: this.params});
  }

  add(data: any) {
    return this.http.post(this.url, data, {params: this.params});
  }


  update(id: any, data: any) {
    return this.http.put(this.url + '/' + id, data, {params: this.params});
  }

  delete(id: any) {
    return this.http.delete(this.url + '/' + id);
  }




  getPublisheds(options?: any) {
    return this.http.get(this.url2, {params: options});
  }

  getPublished(id: number) {
    return this.http.get(this.url2 + '/' + id);
  }




  getsByAdmin(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url3, {params: merged});
  }

  getByAdmin(id: number) {
    return this.http.get(this.url3 + '/' + id, {params: this.params});
  }

  addByAdmin(data: any) {
    return this.http.post(this.url3, data, {params: this.params});
  }


  updateByAdmin(id: any, data: any) {
    return this.http.put(this.url3 + '/' + id, data, {params: this.params});
  }

  deleteByAdmin(id: any) {
    return this.http.delete(this.url3 + '/' + id);
  }


}
