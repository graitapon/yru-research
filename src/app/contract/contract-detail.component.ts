import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {ContractService} from '../services/contract.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {StaffService} from '../services/staff.service';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';


@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  providers: [
    ContractService,
    StaffService,
  ]
})

export class ContractDetailComponent implements OnInit {

  item: any = null;
  id: any = null;

  guarantors: any = [];
  files: any = [];
  downloads: any = [];
  tracks: any = [];

  canEdit = false;

  message: any;
  errMessage: any;
  errors = false;

  year: any = '';

  token: any = localStorage.getItem('token');

  asyncSelectedStaff: any;
  dataSourceStaff: any;

  maxGuarantor = 1;

  links: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    public snackBar: MatSnackBar,
    private staffService: StaffService,
  ) {
    this.year = this.route.snapshot.paramMap.get('year') || '';

    this.setLinks();

    this.dataSourceStaff = Observable.create((observer: any) => {
      this.staffService.gets({q: this.asyncSelectedStaff})
        .subscribe((res: any) => {
          observer.next(res.data);
        });
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getItem();
  }

  back() {
    this.router.navigate(['/contract', this.links]);
  }

  getItem() {
    this.contractService.get(this.id)
    .subscribe((res: any) => {
        this.item = res.data;
        this.guarantors = res.guarantors;
        this.files = res.files;
        this.downloads = res.downloads;
        this.tracks = res.tracks;

        if (res.data.status.id === null || res.data.status.id === 1 || res.data.status.id === 4) {
            this.canEdit = true;
        }
        const budget = res.data.project.budget_edit ? res.data.project.budget_edit : res.data.project.budget;

        if (budget > 500000) {
          const i = Math.floor(budget / 500000);
          this.maxGuarantor = 1 + i;
        }

      },
      err => {
        console.log(err);
        this.errors = true;
        if (err.status === 403) {
          this.errMessage = 'ยังไม่มีสิทธิในการใช้งาน กรุณาติดต่อผู้ดูแลระบบ';
        } else {
          this.errMessage = 'Data error, Please refresh web browser or contact Admin';
        }

      });

  }

  save(value: any, attr: any) {
    const data: any = {};
    data[attr] = value;
    this.contractService.update(this.id, data)
      .subscribe((res: any) => {
          this.getItem();
          this.snackBar.open('Saved', 'OK', { duration: 2000 });
        },
        err => {
          // console.log(err);
          this.snackBar.open('Data error, Please refresh web browser.', 'Error', { duration: 3000 });
        });

  }

  delete() {
    console.log('can delete');
  }

  send() {
    if (this.guarantors.length === 0) {
      this.message = '* กรูณาเลือกผู้ค้ำประกัน';
      return;
    }
    this.canEdit = false;
    this.save('1', 'send');
  }

  pullback() {
    this.save('1', 'pullback');
  }


  typeaheadOnSelectStaff(e: TypeaheadMatch): void {
    this.asyncSelectedStaff = '';
    // console.log(e.item);
    this.guarantors.push(e.item);
    const n = this.guarantors.map((x: any) => x.staffid).join();
    this.save(n, 'guarantors');
  }

  deleteGuarantor(i: any) {
    this.guarantors.splice(i, 1);
    const n = this.guarantors.map((x: any) => x.staffid).join();
    this.save(n, 'guarantors');
  }


  setLinks() {
    const links: any = {};

    if (this.year !== '') {
      links['year'] = this.year;
    }

    this.links = links;

  }


}
