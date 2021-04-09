import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';

import {MenuService} from './services/menu.service';
import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any = 'ระบบสารสนเทศการวิจัยและบริการวิชาการ มหาวิทยาลัยราชภัฏยะลา';

  navbar: any = {
    title: this.title,
    menus: []
  };

  content: { title?: string; } = {
    title: ''
  };

  isAdmin = false;
  sidebarToggle = false;

  // mode as view 1 = public, 2 = admin
  _mode: any = 1;
  mode: any = 1;


  constructor(
    public router: Router,
    public titleService: Title,
    public authService: AuthService,
    public menuService: MenuService
  ) {

    if (!authService.isLoggedIn) {
      this.authService.getUser();
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const url = this.router.url.split('/');

        let data: any = this.router.routerState.root.firstChild?.snapshot.data;

        if (url[1] === 'login') {
          // this.treeMenus = [];
        } else if (url[1] === 'admin') {
          this.isAdmin = true;
          this.mode = 2;

          data = this.router.routerState.root.firstChild?.children[0].snapshot.data;

        } else {
          this.isAdmin = false;
          this.mode = 1;
        }

        if (this.mode !== this._mode) {
          this.menuService.setMenu(this.isAdmin);
          this._mode = this.mode;
        }



        let title = this.title;
        const _title = data.title || null;
        this.content.title = _title;
        if (_title) {
          title = _title + ' ~ ' + this.title;
        }

        this.titleService.setTitle(title);


      }
    });

  }

  menuToggle(e: any): void {
    e.preventDefault();
    this.sidebarToggle = !this.sidebarToggle;
  }


}
