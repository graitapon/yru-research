import { Component, OnInit } from '@angular/core';
import {FundService} from '../services/fund.service';
import {AcademicFundService} from '../services/academic/fund.service';


@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  providers: [
    FundService,
    AcademicFundService
  ]
})

export class FundComponent implements OnInit {

  years: any = [];
  years2: any = [];
  year: any = '';
  year2: any = '';
  sar_year: any;

  types: any = [
    {id: 1, name: 'งบบำรุงการศึกษา'},
    {id: 2, name: 'งบแผ่นดิน'}
  ];

  deps: any = [];
  deps5: any = [];
  kpis: any = [];
  sars: any = [];
  funds: any = [];
  fund_kpis: any = [];

  academicFunds: any = [];
  academicFundTotal = 0;

  constructor(
    private fundService: FundService,
    private academicFundService: AcademicFundService
  ) { }

  ngOnInit() {
    this.getResearchFunds();
    this.getAcademicFunds();
  }


  getResearchFunds() {
    this.fundService.gets({year: this.year})
      .subscribe((res: any) => {
        this.years = res.years;
        this.year = res.year;
        this.sar_year = res.year - 1;
        this.deps = res.deps;
        this.deps5 = res.deps5;

        this.sars = res.sars;
        this.funds = res.funds;
        this.kpis = res.kpis;
        this.fund_kpis = res.fund_kpis;
      }, err => {
        console.log(err);
      });
  }

  getAcademicFunds() {
    this.academicFundService.gets({year: this.year2})
      .subscribe((res: any) => {
        this.years2 = res.years;
        this.year2 = res.year;
        this.academicFunds = res.data;
        this.academicFundTotal = res.total;
      }, err => {
        console.log(err);
      });
  }



}
