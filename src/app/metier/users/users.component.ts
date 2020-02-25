import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/service/users.service';
import { User } from '@app/shared/user';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers() 
    .pipe(first())
    .subscribe( data => {
      this.users = data;
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

}
