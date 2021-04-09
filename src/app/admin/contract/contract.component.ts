import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractService} from '../../services/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  providers: [
    ContractService,
  ]
})
export class ContractComponent implements OnInit {

  dep_id: any = '';
  deps: any = [];

  years: any = [];
  year: any = '';

  types: any = [];
  type_id: any = '';

  items: any = [];

  links: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
  ) {
    this.year = this.route.snapshot.paramMap.get('year') || '';
    this.dep_id = this.route.snapshot.paramMap.get('dep_id') || '';
    this.type_id = this.route.snapshot.paramMap.get('type_id') || '';

  }

  ngOnInit() {
    this.gets();

    if (this.year !== '') {
      this.year = +this.year;
    }
    if (this.dep_id !== '') {
      this.dep_id = +this.dep_id;
    }
  }


  gets() {
    this.setLinks();

    this.contractService.getsByAdmin({dep_id: this.dep_id, year: this.year, type_id: this.type_id})
      .subscribe((res: any) => {
        this.years = res.years;
        this.deps = res.deps;
        if (this.dep_id === '') {
          this.dep_id = res.deps[0].id;
        }
        if (this.year === '') {
          this.year = res.year;
        }

        this.types = res.types;
        this.items = res.data;
      }, err => {
      });
  }


  setLinks() {
    const links: any = {};

    if (this.dep_id !== '') {
      links['dep_id'] = this.dep_id;
    }
    if (this.year !== '') {
      links['year'] = this.year;
    }
    if (this.type_id !== '') {
      links['type_id'] = this.type_id;
    }

    this.router.navigate(['/admin/contract', links]);
    this.links = links;

  }


}
