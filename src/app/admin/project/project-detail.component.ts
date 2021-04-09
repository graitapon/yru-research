import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SkillService} from '../../services/skill.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProjectService} from '../../services/project.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';
import {StaffService} from '../../services/staff.service';

import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';

import {map} from 'rxjs/operators';


@Component({
  selector: 'app-admin-project-detail',
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
  types: any = [];
  type: any;
  skills: {id: any, name: string}[] = [];
  persons: {id: any, name: string}[] = [];
  skill: any;
  teams: any = [];
  files: any = [];
  tracks: any = [];


  canEdit = false;

  themeSelect: any;

  themeSelectOptions = {
    data: [],
    value: 'id',
    text: 'name'
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

  // uploadUrl = 'http://localhost/apis/research/project-files';
  uploadUrl = 'https://eservice.yru.ac.th/apis/research/project-files';
  options: FileUploaderOptions = {};
  fileUpload = {
    uploader: new FileUploader({url: this.uploadUrl + '?token=' + this.params.token}),
    options: this.options,
    uploaded: 0
  };

  er1: any;

  errMessage: any;
  errors = false;

  text1: any = '';
  message1: any;
  text2: any = '';
  message2: any;


  year: any = '';
  depId: any = '';
  typeId: any = '';

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
    this.depId = this.route.snapshot.paramMap.get('dep_id') || '';
    this.typeId = this.route.snapshot.paramMap.get('type_id') || '';

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
    this.router.navigate(['/admin/project', this.links]);
  }

  getItem() {
    this.projectService.getByAdmin(this.id)
      .subscribe((res: any) => {
          this.item = res.data;
          this.themeSelectOptions.data = res.themes;
          this.themeSelect = res.data.theme ? res.data.theme.id : null;
          this.staff = res.staff;
          this.fund = res.fund;
          this.types = res.types;
          this.type = res.types.filter((o: any) => o.checked).map((e: any) => e.name).join(', ');
          this.skills = res.skills;
          this.skill = res.skills.map((e: any) => e.name).join(', ');
          this.teams = res.teams;
          this.files = res.files;
          this.tracks = res.tracks;

          if (res.data.status.id === null || res.data.status.id === 1 || res.data.status.id === 4) {
            if (res.data.is_owner === true) {
              this.canEdit = true;
            }
          }

          this.canEdit = res.data.can_edit;

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
    this.projectService.updateByAdmin(this.id, data)
      .subscribe((res: any) => {
          this.getItem();
          this.snackBar.open('Saved', 'OK', { duration: 2000 });
        },
        err => {
          // console.log(err);
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
  }

  deleteTeam(d: any) {
    this.save({id: d.id}, 'remove_team');
  }

  selectSkill(e: any) {
    // console.log(e);
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
    //
  }

  send(status: any) {
    const data: any = {
      status_id: status
    };

    if (status === 4) {
      this.message1 = '';
      if (this.text1.trim().length < 10) {
        this.message1 = '* กรุณาป้อนข้อเสนอแนะอย่างน้อย 10 ตัวอักษร';
        return;
      }
      data['note'] = this.text1;
    }

    this.save(data, 'status');

  }

  cancel() {
    this.message2 = '';
    if (this.text2.trim().length < 10) {
      this.message2 = '* กรุณาป้อนข้อเสนอแนะอย่างน้อย 10 ตัวอักษร';
      return;
    }
    this.save({note: this.text2}, 'cancel');

  }

  pullback() {
    //
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

    this.links = links;

  }


}
