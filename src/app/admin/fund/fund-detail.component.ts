import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {FundService} from '../../services/fund.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';

@Component({
  selector: 'app-admin-fund-detail',
  templateUrl: './fund-detail.component.html',
  providers: [
    FundService,
  ]
})

export class FundDetailComponent implements OnInit {

  item: any = null;
  id: any = null;

  files: any = [];
  submisSets: any = [];

  canEdit = true;

  // myDateRangePickerOptions: any = {
  //   dateFormat: 'dd mmm yyyy',
  //   firstDayOfWeek: 'su',
  //   showClearDateRangeBtn: true,
  //   showClearBtn: false,
  //   showApplyBtn: false,
  //   editableDateRangeField: false,
  //   openSelectorOnInputClick: true,
  //   monthLabels: { 1: 'ม.ค', 2: 'ก.พ', 3: 'มี.ค', 4: 'เม.ย', 5: 'พ.ค', 6: 'มิ.ย',
  //     7: 'ก.ค', 8: 'ส.ค', 9: 'ก.ย', 10: 'ต.ค', 11: 'พ.ย', 12: 'ธ.ค' }
  // };

  date_range: any;

  params: any = {
    token: localStorage.getItem('token')
  };

  // uploadUrl = 'http://localhost/apis/research/fund-files';
  uploadUrl = 'https://eservice.yru.ac.th/apis/research/fund-files';
  options: FileUploaderOptions = {};
  fileUpload = {
    uploader: new FileUploader({url: this.uploadUrl + '?token=' + this.params.token}),
    options: this.options,
    uploaded: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fundService: FundService,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getItem();

    this.fileUpload.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

  }

  back() {
    this.router.navigate(['/admin/fund']);
  }

  getItem() {
    this.fundService.getByAdmin(this.id)
    .subscribe((res: any) => {
        this.item = res.data;
        this.files = res.files;

        // let s = new Date(res.data.start);
        // let e = new Date(res.data.end);

        // this.date_range = {
        //   beginDate: {
        //     year: s.getFullYear(),
        //     month: s.getMonth() + 1,
        //     day: s.getDate()
        //   },
        //   endDate: {
        //     year: e.getFullYear(),
        //     month: e.getMonth() + 1,
        //     day: e.getDate()
        //   }
        // };
        this.date_range = res.data.start + ',' + res.data.end;


        for (let i = 0; i < res.submis_sets.length; i ++) {
          if (res.submis_sets[i].start) {
            // const s = new Date(res.submis_sets[i].start);
            // const e = new Date(res.submis_sets[i].end);
            // res.submis_sets[i].date_range = {
            //   beginDate: {
            //     year: s.getFullYear(),
            //     month: s.getMonth() + 1,
            //     day: s.getDate()
            //   },
            //   endDate: {
            //     year: e.getFullYear(),
            //     month: e.getMonth() + 1,
            //     day: e.getDate()
            //   }
            // };
            res.submis_sets[i].date_range = res.submis_sets[i].start + ',' + res.submis_sets[i].end;
          }
        }
        this.submisSets = res.submis_sets;


      },
      err => {
        console.log(err);
      });

  }

  save(value: any, attr: any) {
    const data: any = {};
    data[attr] = value;
    this.fundService.updateByAdmin(this.id, data)
      .subscribe((res: any) => {
          this.getItem();
          this.snackBar.open('Saved', 'OK', { duration: 2000 });
        },
        err => {
          this.snackBar.open('Data error', 'Error', { duration: 3000 });
        });

  }

  onDateRangeChanged(event: any) {
    console.log(event);return;
    const data = {
      start: event.beginDate,
      end: event.endDate
    };
    this.save(data, 'date_range');
  }

  submisSetSave(value: any, attr: any, id: any) {
    const data: any = {
      id: id,
    };
    data[attr] = value;
    this.save(data, 'submis_set_edit');
  }

  addSubmisSet() {
    const data = {
      fund_id: this.id,
    };
    this.save(data, 'submis_set_add');
  }

  deleteSubmisSet(d: any) {
    const data = {
      id: d.id
    };
    this.save(data, 'submis_set_remove');
  }



  upload() {
    this.fileUpload.options.additionalParameter = {fund_id: this.id};
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

  toggleCheck(d: any) {
    this.save(d.enabled + '', 'enable');
  }

  deleteFile(id: any) {
    this.fundService.deleteFile(id)
      .subscribe((res: any) => {
          this.getItem();
          this.snackBar.open('Saved', 'OK', { duration: 2000 });
        },
        err => {
          this.snackBar.open('Data error', 'Error', { duration: 3000 });
        });

  }

}
