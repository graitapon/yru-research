import { Component, OnInit } from '@angular/core';

import {AnnounceService} from '../services/announce.service';
import {AnnounceService as ACAService} from '../services/academic/announce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    AnnounceService,
    ACAService,
  ]
})

export class HomeComponent implements OnInit {

  researchAnnounces: any = [];
  academicAnnounces: any = [];

  message1: any;
  message2: any;

  constructor(
    private announceService: AnnounceService,
    private acaService: ACAService,

  ) { }

  ngOnInit() {
    this.getResearch();
    this.getAcademic();
  }

  getResearch() {
    this.announceService.gets()
      .subscribe((res: any) => {
        this.researchAnnounces = res.data;
        if (res.data.length === 0) {
          this.message1 = '* ยังไม่มีทุนใหม่.';
        }
      }, err => {
        console.log(err);
      });

  }

  getAcademic() {
    this.acaService.gets()
      .subscribe((res: any) => {
        this.academicAnnounces = res.data;
        if (res.data.length === 0) {
          this.message2 = '* ยังไม่มีประกาศใหม่';
        }
      }, err => {
        console.log(err);
      });

  }



}
