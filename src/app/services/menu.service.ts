import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) {
  }

  menus: TreeviewItem[] = [];

  getMenus(): TreeviewItem[] {
    // const M1 = new TreeviewItem({
    //   text: 'องค์กร', value: '', collapsed: true, children: [
    //     { text: 'ข้อมูลองค์กร', value: 'org' },
    //     { text: 'บุคลากร', value: 'staff' },
    //   ]
    // });
    const M2 = new TreeviewItem({
      text: 'วิจัย', value: '', collapsed: true, children: [
        { text: 'เสนอโครงการขอทุน', value: 'project'},
        { text: 'จัดทำสัญญาวิจัย', value: 'contract'},
        { text: 'รายงานผลดำเนินงาน', value: 'performance'},
        { text: 'หลักฐานการเผยแพร่', value: 'publish'},
        { text: 'รายงานตามความต้องการ', value: 'report'},
        ]
    });
    const M3 = new TreeviewItem({
      text: 'บริการวิชาการ', value: '', collapsed: true, children: [
        { text: 'เสนอโครงการ', value: 'academic-project'},
        { text: 'รายงานความก้าวหน้า', value: 'academic-progress'},
        { text: 'รายงานผลดำเนินงาน', value: 'academic-performance'},
        { text: 'รายงานตามความต้องการ', value: 'academic-report'},
      ]
    });
    const M4 = new TreeviewItem({ text: 'นักวิจัย / ผู้เชี่ยวชาญ', value: 'person' });
    const M5 = new TreeviewItem({ text: 'ทุนวิจัย', value: 'fund' });
    const M6 = new TreeviewItem({ text: 'เผยแพร่', value: 'published' });
    const M7 = new TreeviewItem({
      text: 'รายงานสรุป', value: '', collapsed: true, children: [
        { text: 'ภาพรวมงานวิจัย', value: 'summary'},
        { text: 'ภาพรวมงานบริการวิชาการ', value: 'academic-summary'},
        // { text: 'ตัวชี้วัดประกันคุณภาพ', value: 'kpi'},
      ]
    });

    return [M2, M3, M4, M5, M6, M7];
  }

  getAdminMenus(): TreeviewItem[] {
    // const url = 'http://localhost/apis/research/menus';
    const url: any = 'https://eservice.yru.ac.th/apis/research/menus';

    const M: any = [];

    const params: any = {
      token: localStorage.getItem('token'),
    };
    this.http.get(url, {params: params})
      .subscribe((res: any) => {
        for (let i = 0; i < res.data.length; i ++) {
          M[i] = new TreeviewItem(res.data[i]);
        }
      });

    return M;
  }

  setMenu(isAdnmin: boolean = false) {

    if (isAdnmin) {
      this.menus = this.getAdminMenus();
    } else {
      this.menus = this.getMenus();
    }

  }

}
