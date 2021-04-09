import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProjectService {
  params: any = {
    token: localStorage.getItem('token')
  };

  // url = 'http://localhost/apis/research/projects';
  // url2 = 'http://localhost/apis/research/user-projects';
  // url3 = 'http://localhost/apis/research/admin-projects';
  url: any = 'https://eservice.yru.ac.th/apis/research/projects';
  url2: any = 'https://eservice.yru.ac.th/apis/research/user-projects';
  url3: any = 'https://eservice.yru.ac.th/apis/research/admin-projects';

  constructor(private http: HttpClient) {
  }


  getProjects(options?: any) {
    return this.http.get(this.url, {params: options});
  }

  getProject(id: number) {
    return this.http.get(this.url + '/' + id);
  }



  getUserProjects(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url2, {params: merged});
  }

  getUserProject(id: number) {
    return this.http.get(this.url2 + '/' + id, {params: this.params});
  }

  addUserProject(data: any) {
    return this.http.post(this.url2, data, {params: this.params});
  }

  updateUserProject(id: number, data: any) {
    return this.http.put(this.url2 + '/' + id, data, {params: this.params});
  }





  getsByAdmin(options?: any) {
    const merged = {...this.params, ...options};
    return this.http.get(this.url3, {params: merged});
  }

  getByAdmin(id: number) {
    return this.http.get(this.url3 + '/' + id, {params: this.params});
  }

  updateByAdmin(id: number, data: any) {
    return this.http.put(this.url3 + '/' + id, data, {params: this.params});
  }


}
