import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public path: string;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.path = this.router.url.slice(1, this.router.url.length);
  }

  public logout() {
    this.auth.logOut();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 100);
  }
}
