import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  providers: [
    ProjectService,
  ]
})
export class ProjectComponent implements OnInit {

  depId: any = '';
  deps: any = [];

  years: any = [];
  year: any = '';

  types: any = [];
  typeId: any = '';

  items: any = [];

  status: any = 'approve';

  links: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
  ) {
    this.year = this.route.snapshot.paramMap.get('year') || '';
    this.depId = this.route.snapshot.paramMap.get('dep_id') || '';
    this.typeId = this.route.snapshot.paramMap.get('type_id') || '';
    this.status = this.route.snapshot.paramMap.get('status') || 'approve';

  }

  ngOnInit() {
    this.gets();

    if (this.year !== '') {
      this.year = +this.year;
    }
    if (this.depId !== '') {
      this.depId = +this.depId;
    }

  }


  gets() {
    this.setLinks();

    this.projectService.getsByAdmin(this.links)
      .subscribe((res: any) => {
        this.years = res.years;
        this.deps = res.deps;
        if (this.depId === '') {
          this.depId = res.deps[0].id;
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

    if (this.depId !== '') {
      links['dep_id'] = this.depId;
    }
    if (this.year !== '') {
      links['year'] = this.year;
    }
    if (this.typeId !== '') {
      links['type_id'] = this.typeId;
    }
    if (this.status !== '') {
      links['status'] = this.status;
    }

    this.router.navigate(['/admin/project', links]);
    this.links = links;

  }

}
