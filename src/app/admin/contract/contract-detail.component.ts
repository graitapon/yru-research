import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ContractService} from '../../services/contract.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';


@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  providers: [
    ContractService,
  ]
})

export class ContractDetailComponent implements OnInit {

  item: any = null;
  id: any = null;

  guarantors: any = [];
  files: any = [];
  downloads: any = [];
  tracks: any = [];

  message: any;
  errMessage: any;
  errors = false;

  text1: any = '';
  message1: any;


  year: any = '';
  dep_id: any = '';
  type_id: any = '';

  links: any = {};

  params = {
    token: localStorage.getItem('token')
  };

  // uploadUrl = 'http://localhost/apis/research/contract-files';
  uploadUrl = 'https://eservice.yru.ac.th/apis/research/contract-files';
  options: FileUploaderOptions = {};
  fileUpload = {
    uploader: new FileUploader({url: this.uploadUrl + '?token=' + this.params.token}),
    options: this.options,
    uploaded: 0
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    public snackBar: MatSnackBar,
  ) {
    this.year = this.route.snapshot.paramMap.get('year') || '';
    this.dep_id = this.route.snapshot.paramMap.get('dep_id') || '';
    this.type_id = this.route.snapshot.paramMap.get('type_id') || '';

    this.setLinks();

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getItem();

    this.fileUpload.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

  }

  back() {
    this.router.navigate(['/admin/contract', this.links]);
  }

  getItem() {
    this.contractService.getByAdmin(this.id)
      .subscribe((res: any) => {
          this.item = res.data;
          this.guarantors = res.guarantors;
          this.files = res.files;
          this.downloads = res.downloads;
          this.tracks = res.tracks;

          const budget = res.data.project.budget_edit ? res.data.project.budget_edit : res.data.project.budget;

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


  upload() {
    this.fileUpload.options.additionalParameter = {contract_id: this.id};
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

    this.links = links;

  }



}
