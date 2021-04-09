import { Component, OnInit } from '@angular/core';
import {FundService} from '../../services/fund.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-fund',
  templateUrl: './fund.component.html',
  providers: [
    FundService,
  ]
})
export class FundComponent implements OnInit {

  deps: any = [];
  dep_id: any = '';
  years: any = [];
  year: any = '';
  fund_types: any = [];
  fund_type_id: any = '';

  funds: any = [];

  canEdit = true;
  adding = false;

  canAdd = true;

  constructor(
    private fundService: FundService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.gets();
  }

  gets() {
    this.fundService.getsByAdmin({dep_id: this.dep_id})
      .subscribe((res: any) => {
        this.deps = res.deps;
        this.years = res.years;
        this.year = res.year;
        this.fund_types = res.fund_types;
        this.fund_type_id = res.fund_types[0].id;
        if (this.dep_id === '') {
          this.dep_id = res.deps[0].id;
        }

        this.funds = res.data;
      }, err => {
      });

  }

  add() {
    this.adding = true;
  }

  back() {
    this.adding = false;
  }

  doAdd() {
    this.canAdd = false;

    const data = {
      year: this.year,
      fund_type_id: this.fund_type_id,
      dep_id: this.dep_id
    };

    this.fundService.addByAdmin(data)
      .subscribe((res: any) => {
        this.canAdd = true;
        this.router.navigate(['/admin/fund', res.data.id]);
      }, err => {
        this.canAdd = true;
      });
  }

}
