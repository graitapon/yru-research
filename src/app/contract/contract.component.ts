import { Component, OnInit } from '@angular/core';
import {ContractService} from '../services/contract.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  providers: [
    ContractService,
  ]
})
export class ContractComponent implements OnInit {

  years: any = [];
  year: any = '';

  items: any = [];

  message: any;
  errMessage: any;
  errors = false;

  ready = false;

  links: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService
  ) {
    this.year = this.route.snapshot.paramMap.get('year') || '';
  }

  ngOnInit() {
    this.gets();
  }


  gets() {
    this.setLinks();

    this.contractService.gets({year: this.year})
      .subscribe((res: any) => {
        this.years = res.years;
        this.year = this.year === '' ? res.years[0] : +this.year;

        this.items = res.data;
        res.data.length === 0 ? this.message = '* ยังไม่มีโครงการที่ผ่านการอนุมัติ' : this.message = '';
        this.ready = true;
      }, err => {
        console.log(err);
        this.errors = true;
        if (err.status === 403) {
          this.errMessage = 'ยังไม่มีสิทธิในการใช้งาน กรุณาติดต่อผู้ดูแลระบบ';
        } else {
          this.errMessage = 'Data error, Please refresh web browser or contact Admin';
        }

      });
  }

  selectYear() {
    this.gets();
  }

  setLinks() {
    const links: any = {};

    if (this.year !== '') {
      links['year'] = this.year;
    }

    this.router.navigate(['/contract', links]);
    this.links = links;

  }

}
