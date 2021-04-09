import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {ProjectService} from '../services/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';
import {StaffService} from '../services/staff.service';

import {FormControl} from '@angular/forms';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {SkillService} from '../services/skill.service';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  providers: [
    ProjectService,
    StaffService,
    SkillService,
  ]
})

export class ProjectDetailComponent implements OnInit {

  item: any = null;
  id: any = null;

  staff: any;
  fund: any = null;
  
  skills: {id: any, name: string}[] = [];
  persons: {id: any, name: string}[] = [];
  skill: any;
  teams: any = [];
  files: any = [];
  tracks: any = [];

  series:any = '';
  cats: any = [
    {id: '', name: 'โครงการเดี่ยว'},
    {id: 1, name: 'โครงการชุด'},
  ];


  canEdit = false;

  themeSelectOptions: any = {
    label: 'สาขาการวิจัย',
    items: [],
    selected: '',
    css: 'w-50'
  };
  
  
  types: any = [];
  type: any;
  type_select:any = '';
  typeSelectOptions: any = {
    label: 'ประเภทการวิจัย',
    items: [],
    selected: '',
  };


  strategies: any = [];
  strategy: any;
  strategy_select:any = '';
  strategySelectOptions: any = {
    label: 'ประเด็นการวิจัย',
    items: [],
    selected: '',
    css: 'w-100'
  };



  asyncSelectedStaff: any;
  dataSourceStaff: any;

  skillObserve: any;
  skillValidators: any;
  personObserve: any;
  personValidators: any;

  errorMessages: any = {
    'validSkill': 'Not Allowed Number or Special Characters'
  };

  params: any = {
    token: localStorage.getItem('token')
  };

  uploadUrl = 'https://eservice.yru.ac.th/apis/research/project-files';
  options: FileUploaderOptions = {};
  fileUpload = {
    uploader: new FileUploader({url: this.uploadUrl + '?token=' + this.params.token}),
    options: this.options,
    uploaded: 0
  };

  er1: any;

  errMessage: any;
  message2: any;
  errors = false;

  year: any = '';

  

  links: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private staffService: StaffService,
    private skillService: SkillService,
    public snackBar: MatSnackBar,

  ) {

    this.year = this.route.snapshot.paramMap.get('year') || '';

    this.setLinks();

    this.dataSourceStaff = Observable.create((observer: any) => {
      this.staffService.gets({q: this.asyncSelectedStaff})
        .subscribe((res: any) => {
          observer.next(res.data);
        });
    });

    this.skillObserve = (text: string): Observable<any> => {
      return this.skillService.gets({q: text})
      .pipe(map((res: any) => res.data));
    };
    this.skillValidators = [this.validSkill];

    this.personObserve = (text: string): Observable<any> => {
      return this.staffService.gets({q: text, custom: 1})
      .pipe(map((res: any) => res.data));
    };
    this.personValidators = [this.validSkill];

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getItem();

    this.fileUpload.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };


  }

  back() {
    this.router.navigate(['/project', this.links]);
  }

  getItem() {
    this.projectService.getUserProject(this.id)
      .subscribe((res: any) => {
        this.item = res.data;
        this.themeSelectOptions.items = res.themes;
        this.themeSelectOptions.selected = res.data.theme ? res.data.theme.id : null;
        // this.themeSelect = res.data.theme ? res.data.theme.id : null;

        this.staff = res.staff;
        this.fund = res.fund;
        this.types = res.types;
        this.strategies = res.strategies;
        this.type = res.types.filter((o: any) => o.checked).map((e: any) => e.name).join(', ');
        this.skills = res.skills;
        this.skill = res.skills.map((e: any) => e.name).join(', ');
        this.teams = res.teams;
        this.files = res.files;
        this.tracks = res.tracks;
        if (res.data.series != 0) {
          this.series = 1;
        }

        if (res.data.type_id && res.data.year >= 2564) {
          for (let i = 0; i < res.types.length; i ++) {
            if (!res.types[i].childs.length && res.types[i].id === res.data.type_id) {
              this.type_select = res.data.type_id;
              break;
            }
            else {
              
              for (let j = 0; j < res.types[i].childs.length; j ++) {
                if (res.types[i].childs[j].id === res.data.type_id) {
                  this.typeSelectOptions.items = res.types[i].childs;
                  this.type_select = res.types[i].id;
                  this.typeSelectOptions.selected = res.data.type_id;
                  break;
                }
              }
            }
          }
        }

        const si = res.data.strategy_id;
        if (si) {
          const d = this.strategies.find((x: any) => x.id === si);
          if (d) {
            this.strategySelectOptions.items = d.childs;
          }
        }
        this.strategy_select = si;
        for (let i = 0; i < res.strategies.length; i ++) {
          if (!res.strategies[i].childs.length && res.strategies[i].id === si) {
            this.strategy_select = si;
            break;
          }
          else {            
            
            for (let j = 0; j < res.strategies[i].childs.length; j ++) {
              if (res.strategies[i].childs[j].id === si) {
                this.strategySelectOptions.items = res.strategies[i].childs;
                this.strategy_select = res.strategies[i].id;
                this.strategySelectOptions.selected = si;
                break;
              }
            }
          }
        }



        if (res.data.status.id === null || res.data.status.id === 1 || res.data.status.id === 4) {
          if (res.data.is_owner === true) {
            this.canEdit = true;
          }
        }

      },
      err => {
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
    this.projectService.updateUserProject(this.id, data)
      .subscribe((res: any) => {
        this.getItem();
        this.snackBar.open('Saved', 'OK', { duration: 2000 });
      },
      err => {
        this.snackBar.open(err, 'Error', { duration: 3000 });
      });

  }


  typeSelect(d: any) {
    for (let  i = 0; i < this.types.length; i ++) {
      if (this.types[i].id === d.id) {
        this.types[i].checked ? this.types[i].checked = false : this.types[i].checked = true;
      }
    }
    const t = this.types.filter((o: any) => o.checked).map((e: any) => e.id).join(',');
    this.save(t, 'types');
  }

  typeChange(e: any) {
    if (!e.value) {
      return;
    }
    const d = this.types.find((x: any) => x.id === e.value);
    if (d.childs.length) {
      this.typeSelectOptions.items = d.childs;
    }
    else {
      this.save(e.value, 'type_id');
    }
  }

  strategyChange(e: any) {
    if (!e.value) {
      return;
    }
    const d = this.strategies.find((x: any) => x.id === e.value);

    if (d.childs.length) {
      this.strategySelectOptions.items = d.childs;
      this.strategySelectOptions.selected = null;
    }

    this.save(e.value, 'strategy_id');

  }


  typeaheadOnSelectStaff(e: TypeaheadMatch): void {
    this.asyncSelectedStaff = '';
    e.item.type_id = 1;
    this.save(e.item, 'add_team');
  }

  addCustomStaff(d: any) {
    this.er1 = '';
    if (/^[\u0E00-\u0E7Fa-zA-Z ]*$/.test(d)) {
      console.log(d);
    } else {
      this.er1 = 'Not allowed number or special characters.';
    }
    this.addPerson({id: d, name: d});
  }

  deleteTeam(d: any) {
    this.save({id: d.id}, 'remove_team');
  }

  selectSkill(e: any) {
    console.log(e);
  }

  removeSkill(e: any) {
    this.save(e, 'remove_skill');
  }

  addSkill(e: any) {
    this.save(e, 'add_skill');
  }

  validSkill(control: FormControl) {
    if (/[`~,.<>;':"/\\[\]|{}()=_+-0123456789]/.test(control.value)) {
      return {
        'validSkill': true
      };
    }
    return null;
  }

  addPerson(e: any) {
    this.persons = [];
    e.type_id = 2;
    this.save(e, 'add_team');

  }


  upload() {
    this.fileUpload.options.additionalParameter = {project_id: this.id};
    this.fileUpload.uploader.setOptions(this.fileUpload.options);
    this.fileUpload.uploader.uploadAll();

    this.fileUpload.uploader.onErrorItem = (item, response, status, headers) => {
      console.log(response);
    };
    this.fileUpload.uploader.onSuccessItem = (item, response, status, headers) => {
      this.fileUpload.uploaded ++;
      this.getItem();
    };

  }

  deleteFile(d: any) {
    this.save({id: d.id}, 'remove_file');
  }


  send() {
    if (this.files.length === 0) {
      this.message2 = '* กรุณาแนบไฟล์ Proposal';
      // return;
    }
    this.message2 = '';
    this.canEdit = false;
    this.save('1', 'send');
  }

  pullback() {
    this.save('1', 'pullback');
  }



  setLinks() {
    const links: any = {};

    if (this.year !== '') {
      links['year'] = this.year;
    }

    this.links = links;

  }

}
