import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {AdminNotFoundComponent} from './admin-not-found.component';
import {AcademicAnnounceComponent} from './academic-announce/academic-announce.component';
import {AcademicPerformanceComponent} from './academic-performance/academic-performance.component';
import {AcademicProgressComponent} from './academic-progress/academic-progress.component';
import {AcademicProjectComponent} from './academic-project/academic-project.component';

import {ContractComponent} from './contract/contract.component';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ProjectComponent} from './project/project.component';
import {ProjectDetailComponent} from './project/project-detail.component';
import {PublishComponent} from './publish/publish.component';

import {RoleGuardComponent} from '../auth/role-guard.component';
import {RoleGuard} from '../auth/role-guard.service';
import {FundComponent} from './fund/fund.component';
import {FundDetailComponent} from './fund/fund-detail.component';
import {KpiComponent} from './kpi/kpi.component';

import {AcademicProjectDetailComponent} from './academic-project/academic-project-detail.component';

import {AcademicProgressDetailComponent} from './academic-progress/academic-progress-detail.component';
import {AcademicPerformanceDetailComponent} from './academic-performance/academic-performance-detail.component';

import {AcademicSettingComponent} from './academic-setting/academic-setting.component';
import {PerformanceComponent} from './performance/performance.component';
import {PerformanceDetailComponent} from './performance/performance-detail.component';
import {PublishDetailComponent} from './publish/publish-detail.component';



export const routes: Routes = [
  { path: '', component: AdminComponent, data: { title: 'Admin Dashboard', role: 'research_dev' }, canActivate: [RoleGuard] },

  { path: 'academic-project', component: AcademicProjectComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - โครงการบริการวิชาการ (สวพ.)', role: 'research_dev, academic_admin, academic_admin_dep' } },
  { path: 'academic-project/:id', component: AcademicProjectDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดโครงการบริการวิชาการ (สวพ.)', role: 'research_dev, academic_admin, academic_admin_dep' } },


  { path: 'academic-progress', component: AcademicProgressComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - ความก้าวหน้าโครงการบริการวิชาการ', role: 'research_dev, academic_admin, academic_admin_dep' } },
  { path: 'academic-progress/:id', component: AcademicProgressDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดความก้าวหน้าโครงการบริการวิชาการ', role: 'research_dev, academic_admin, academic_admin_dep' } },

  { path: 'academic-performance', component: AcademicPerformanceComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - ผลดำเนินงานโครงการบริการวิชาการ', role: 'research_dev, academic_admin, academic_admin_dep' } },
  { path: 'academic-performance/:id', component: AcademicPerformanceDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดผลดำเนินงานโครงการบริการวิชาการ', role: 'research_dev, academic_admin, academic_admin_dep' } },

  { path: 'academic-announce', component: AcademicAnnounceComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - ประกาศโครงการบริการวิชาการ', role: 'research_dev, academic_admin' } },

  { path: 'academic-setting', component: AcademicSettingComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - ตั้งค่าข้อมูลบริการวิชาการ', role: 'research_dev, academic_admin' } },


  { path: 'fund', component: FundComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - ประกาศทุนวิจัย', role: 'research_dev, research_admin, research_admin_dep' }  },
  { path: 'fund/:id', component: FundDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดประกาศทุนวิจัย', role: 'research_dev, research_admin, research_admin_dep' }  },
  { path: 'project', component: ProjectComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - โครงการวิจัย', role: 'research_dev, research_admin, research_admin_dep' }  },
  { path: 'project/:id', component: ProjectDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดโครงการวิจัย', role: 'research_dev, research_admin, research_admin_dep' }  },

  { path: 'contract', component: ContractComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - สัญญาวิจัย', role: 'research_dev, research_admin, research_admin_dep' }  },
  { path: 'contract/:id', component: ContractDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดสัญญาวิจัย', role: 'research_dev, research_admin, research_admin_dep' } },

  { path: 'performance', component: PerformanceComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายงานผลดำเนินงาน', role: 'research_dev, research_admin, research_admin_dep'  } },
  { path: 'performance/:id', component: PerformanceDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดผลดำเนินงาน', role: 'research_dev, research_admin, research_admin_dep'  } },

  { path: 'publish', component: PublishComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - การเผยแพร่ผลงาน', role: 'research_dev, research_admin, research_admin_dep' } },
  { path: 'publish/:id', component: PublishDetailComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - รายละเอียดการเผยแพร่ผลงาน', role: 'research_dev, research_admin, research_admin_dep' } },

  { path: 'kpi', component: KpiComponent, canActivate: [RoleGuard],
    data: { title: 'Admin - ตัวชี้วัด สกอ.2.2', role: 'research_dev, research_admin, research_admin_dep' }  },

  { path: 'guard', component: RoleGuardComponent },
  { path: '**', component: AdminNotFoundComponent }

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    RoleGuard
  ]


})

export class AdminRoutingModule {}
