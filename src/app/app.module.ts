import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { MatTabsModule } from '@angular/material/tabs';

// import {MatCheckboxModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { AccordionModule } from 'ngx-bootstrap/accordion';

import { TreeviewModule } from 'ngx-treeview';
import {GoTopButtonModule} from 'ng-go-top-button';
import {DatetimeModule} from './datetime/datetime.module';


import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import { NotFoundComponent } from './not-found.component';

import { AppRoutingModule } from './app-routing.module';
import {NavbarComponent} from './navbar/navbar.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './auth/login.component';

// import {OrgComponent} from './org/org.component';
// import {StaffComponent} from './staff/staff.component';
import {ProjectComponent} from './project/project.component';
import {ContractComponent} from './contract/contract.component';

import {PublishComponent} from './publish/publish.component';
import {ReportComponent} from './report/report.component';
import {AcademicComponent} from './academic/academic.component';
import {AcademicProgressComponent} from './academic-progress/academic-progress.component';
import {AcademicPerformanceComponent} from './academic-performance/academic-performance.component';
import {AcademicReportComponent} from './academic-report/academic-report.component';
import {PersonComponent} from './person/person.component';
import {FundComponent} from './fund/fund.component';
import {PublishedComponent} from './published/published.component';
import {SummaryComponent} from './summary/summary.component';
import {AcademicSummaryComponent} from './academic-summary/academic-summary.component';
import { AcademicDetailComponent } from './academic/academic-detail.component';

import {DateThaiModule} from './thai/date-thai.module';
import {PublishedDetailComponent} from './published/published-detail.component';
import {ProjectDetailComponent} from './project/project-detail.component';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ChartModule} from 'angular-highcharts';
import {AcademicPerformanceDetailComponent} from './academic-performance/academic-performance-detail.component';
import {AcademicProgressDetailComponent} from './academic-progress/academic-progress-detail.component';
import {PersonDetailComponent} from './person/person-detail.component';
import {PublishDetailComponent} from './publish/publish-detail.component';
import {ReportDetailComponent} from './report/report-detail.component';

import {AcademicReportDetailComponent} from './academic-report/academic-report-detail.component';
import {PerformanceComponent} from './performance/performance.component';
import {PerformanceDetailComponent} from './performance/performance-detail.component';
// import {TagInputModule} from 'ngx-chips';

import {XeditModule} from './xedit/xedit.module';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {FileUploadModule} from 'ng2-file-upload';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { KpiComponent } from './kpi/kpi.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ContactComponent,

    NavbarComponent,
    SidenavComponent,
    LoginComponent,

    ProjectComponent,
    ProjectDetailComponent,
    ContractComponent,
    ContractDetailComponent,
    PerformanceComponent,
    PerformanceDetailComponent,
    ReportComponent,
    ReportDetailComponent,
    PersonComponent,
    PersonDetailComponent,
    FundComponent,
    PublishComponent,
    PublishDetailComponent,
    PublishedComponent,
    PublishedDetailComponent,
    SummaryComponent,

    AcademicComponent,
    AcademicDetailComponent,
    AcademicProgressComponent,
    AcademicProgressDetailComponent,
    AcademicPerformanceComponent,
    AcademicPerformanceDetailComponent,
    AcademicReportComponent,
    AcademicReportDetailComponent,
    AcademicSummaryComponent,
    KpiComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    HttpClientModule,

    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),

    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    // MatToolbarModule,
    MatSnackBarModule,

    TreeviewModule.forRoot(),
    GoTopButtonModule,
    DatetimeModule,

    DateThaiModule,

    ChartModule,
    // TagInputModule,

    XeditModule,
    FileUploadModule,
    AngularMyDatePickerModule,
    // MyDatePickerModule,
    // MyDateRangePickerModule,

    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
