import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  protected name: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.name = this.getUserIdentity().name;
   }

  ngOnInit() {
    this.getUserIdentity();
  }

  getUserIdentity() {
    return this.authService.currentUserValue;
  }

  logout() {
    return this.authService.logout();
    this.router.navigate(['/login']);
  }

}
