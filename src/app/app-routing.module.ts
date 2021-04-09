import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';

import {MenuService} from './services/menu.service';

import { NotFoundComponent } from './not-found.component';

import {LoginComponent} from './auth/login.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {ContractComponent} from './contract/contract.component';
import {PersonComponent} from './person/person.component';
import {FundComponent} from './fund/fund.component';

import {PublishComponent} from './publish/publish.component';
import {ProjectComponent} from './project/project.component';

import {ReportComponent} from './report/report.component';
import {SummaryComponent} from './summary/summary.component';

import {AcademicComponent} from './academic/academic.component';
import {AcademicDetailComponent} from './academic/academic-detail.component';
import {AcademicReportComponent} from './academic-report/academic-report.component';
import {AcademicReportDetailComponent} from './academic-report/academic-report-detail.component';
import {AcademicPerformanceComponent} from './academic-performance/academic-performance.component';
import {AcademicSummaryComponent} from './academic-summary/academic-summary.component';
import {AcademicProgressComponent} from './academic-progress/academic-progress.component';
import {AcademicPerformanceDetailComponent} from './academic-performance/academic-performance-detail.component';
import {AcademicProgressDetailComponent} from './academic-progress/academic-progress-detail.component';

import {PublishedComponent} from './published/published.component';
import {PublishedDetailComponent} from './published/published-detail.component';
import {ProjectDetailComponent} from './project/project-detail.component';
import {ContractDetailComponent} from './contract/contract-detail.component';

import {ReportDetailComponent} from './report/report-detail.component';
import {PerformanceComponent} from './performance/performance.component';
import {PerformanceDetailComponent} from './performance/performance-detail.component';
import {PublishDetailComponent} from './publish/publish-detail.component';
import {PersonDetailComponent} from './person/person-detail.component';
// import {KpiComponent} from './kpi/kpi.component';



const routes: Routes = [

  { path: '', component: HomeComponent },
  // { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },

  { path: 'login', component: LoginComponent },

  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - เสนอโครงการขอทุน'} },
  { path: 'project/:id', component: ProjectDetailComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - รายละเอียดโครงการ'} },
  { path: 'contract', component: ContractComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - จัดทำสัญญารับทุนวิจัย'} },
  { path: 'contract/:id', component: ContractDetailComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - รายละเอียดสัญญารับทุน'} },
  { path: 'performance', component: PerformanceComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - รายงานผลดำเนินงาน'} },
  { path: 'performance/:id', component: PerformanceDetailComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - รายละเอียดรายงานผลดำเนินงาน'} },
  { path: 'publish', component: PublishComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - หลักฐานการเผยแพร่'} },
  { path: 'publish/:id', component: PublishDetailComponent, canActivate: [AuthGuard], data: { title: 'วิจัย - รายละเอียดหลักฐานการเผยแพร่'} },

  { path: 'published', component: PublishedComponent, data: { title: 'เผยแพร่ผลงาน'} },
  { path: 'published/:id', component: PublishedDetailComponent, data: { title: 'รายละเอียดการเผยแพร่ผลงาน'} },
  { path: 'report', component: ReportComponent, data: { title: 'วิจัย - รายงานตามความต้องการ'} },
  { path: 'report/:id', component: ReportDetailComponent, data: { title: 'รายละเอียดโครงการวิจัย'} },

  { path: 'person', component: PersonComponent, data: { title: 'นักวิจัย / ผู้เชี่ยวชาญ'} },
  { path: 'person/:id', component: PersonDetailComponent, data: { title: 'รายละเอียด นักวิจัย / ผู้เชี่ยวชาญ'} },
  { path: 'fund', component: FundComponent, data: { title: 'แหล่งทุนวิจัย'} },
  { path: 'summary', component: SummaryComponent, data: { title: 'รายงานสรุป - ภาพรวมงานวิจัย'} },
  // { path: 'kpi', component: KpiComponent, data: { title: 'รายงานตัวชี้วัดประกันคุณภาพ'} },


  { path: 'academic-project', component: AcademicComponent, canActivate: [AuthGuard],
    data: { title: 'บริการวิชาการ - เสนอโครงการ'} },
  { path: 'academic-project/:id', component: AcademicDetailComponent, canActivate: [AuthGuard],
    data: { title: 'บริการวิชาการ - รายละเอียดโครงการ'} },
  { path: 'academic-progress', component: AcademicProgressComponent, canActivate: [AuthGuard],
    data: { title: 'บริการวิชาการ - รายงานความก้าวหน้า'} },
  { path: 'academic-progress/:id', component: AcademicProgressDetailComponent, canActivate: [AuthGuard],
    data: { title: 'บริการวิชาการ - รายละเอียดความก้าวหน้า'} },
  { path: 'academic-performance', component: AcademicPerformanceComponent, canActivate: [AuthGuard],
    data: { title: 'บริการวิชาการ - รายงานผลดำเนินงาน'} },
  { path: 'academic-performance/:id', component: AcademicPerformanceDetailComponent, canActivate: [AuthGuard],
    data: { title: 'บริการวิชาการ - รายละเอียดผลดำเนินงาน'} },

  { path: 'academic-report', component: AcademicReportComponent, data: { title: 'บริการวิชาการ - รายงานตามความต้องการ'} },
  { path: 'academic-report/:id', component: AcademicReportDetailComponent, data: { title: 'รายละเอียดโครงการบริการวิชาการ'} },
  { path: 'academic-summary', component: AcademicSummaryComponent, data: { title: 'รายงานสรุป - ภาพรวมงานบริการวิชาการ'} },


  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data: { title: 'Administrator' }
  },
  

  { path: '**', component: NotFoundComponent }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ],
  providers: [
    AuthGuard,
    AuthService,
    MenuService
  ]

})

export class AppRoutingModule {}
