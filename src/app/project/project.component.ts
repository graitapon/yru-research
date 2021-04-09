import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  providers: [
    ProjectService,
  ]
})
export class ProjectComponent implements OnInit {

  years: any = [];
  year: any = '';
  funds: any = [];
  fundId: any;
  staffId: any;

  items: any = [];

  message: any;
  errMessage: any;
  errors = false;

  adding = false;

  canAdd = false;

  ready = false;

  links = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
  ) {
    this.year = this.route.snapshot.paramMap.get('year') || '';
  }

  ngOnInit() {
    this.gets();
  }


  gets() {
    this.canAdd = false;
    this.setLinks();

    this.projectService.getUserProjects({year: this.year})
      .subscribe((res: any) => {
        this.years = res.years;
        this.year = this.year === '' ? res.years[0] : +this.year;
        this.items = res.data;
        this.funds = res.funds;
        this.staffId = res.staff_id;
        if (res.funds.length > 0) {
          this.canAdd = true;
        }
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


  add() {
    this.adding = true;
  }

  back() {
    this.adding = false;
  }

  doAdd() {
    const data = {
      fund_id: this.fundId
    };
    this.projectService.addUserProject(data)
      .subscribe((res: any) => {
        this.router.navigate(['/project', res.data.id, this.links]);
      }, err => {
        this.errors = true;
        if (err.status === 403) {
          this.errMessage = 'ยังไม่มีสิทธิในการใช้งาน กรุณาติดต่อผู้ดูแลระบบ';
        } else {
          this.errMessage = 'Data error, Please refresh web browser or contact Admin';
        }

      });
  }

  delete1(id: any) {
    
  }


  setLinks() {
    const links: any = {};

    if (this.year !== '') {
      links['year'] = this.year;
    }

    this.router.navigate(['/project', links]);
    this.links = links;

  }


}
