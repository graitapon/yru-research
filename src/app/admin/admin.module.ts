import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import {AdminNotFoundComponent} from './admin-not-found.component';
import { AcademicAnnounceComponent } from './academic-announce/academic-announce.component';
import { AcademicPerformanceComponent } from './academic-performance/academic-performance.component';

import { AcademicProgressComponent } from './academic-progress/academic-progress.component';
import { AcademicProjectComponent } from './academic-project/academic-project.component';
import { ContractComponent } from './contract/contract.component';
import {ContractDetailComponent} from './contract/contract-detail.component';
import { FundComponent } from './fund/fund.component';
import {FundDetailComponent} from './fund/fund-detail.component';
import { KpiComponent } from './kpi/kpi.component';
import { ProjectComponent } from './project/project.component';
import {ProjectDetailComponent} from './project/project-detail.component';
import { PublishComponent } from './publish/publish.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';


import {RoleGuardComponent} from '../auth/role-guard.component';
import {FormsModule} from '@angular/forms';

import {DateThaiModule} from '../thai/date-thai.module';
import {XeditModule} from '../xedit/xedit.module';
import {AcademicProjectDetailComponent} from './academic-project/academic-project-detail.component';
import {AcademicProgressDetailComponent} from './academic-progress/academic-progress-detail.component';
import {AcademicPerformanceDetailComponent} from './academic-performance/academic-performance-detail.component';

import { AcademicSettingComponent } from './academic-setting/academic-setting.component';

import {PublishDetailComponent} from './publish/publish-detail.component';
import {FileUploadModule} from 'ng2-file-upload';
import {PerformanceComponent} from './performance/performance.component';
import {PerformanceDetailComponent} from './performance/performance-detail.component';
// import {TagInputModule} from 'ngx-chips';
import {ChartModule} from 'angular-highcharts';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatSnackBarModule,

    TypeaheadModule.forRoot(),

    DateThaiModule,
    XeditModule,
    

    ChartModule,
    // TagInputModule,
    AngularMyDatePickerModule,
    
    FileUploadModule,
    



    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminNotFoundComponent,
    AcademicAnnounceComponent,

    AcademicPerformanceComponent,
    AcademicPerformanceDetailComponent,
    AcademicProgressComponent,
    AcademicProgressDetailComponent,
    AcademicProjectComponent,
    AcademicProjectDetailComponent,
    ContractComponent,
    ContractDetailComponent,
    FundComponent,
    FundDetailComponent,
    KpiComponent,

    ProjectComponent,
    ProjectDetailComponent,
    PerformanceComponent,
    PerformanceDetailComponent,
    PublishComponent,
    PublishDetailComponent,


    RoleGuardComponent,


    AcademicSettingComponent,

  ],
})
export class AdminModule { }
