import { Component, OnInit } from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {MenuService} from '../services/menu.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})

export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public menuService: MenuService,
  ) {

  }

  ngOnInit() {
  }

}
