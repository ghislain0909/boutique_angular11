import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../shared/service/users.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css']
})
export class RoleUpdateComponent implements OnInit {

  protected roles : [];
  protected updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UsersService) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      username: ['', Validators.required]
    })
  }

  public getRoles()  {

  }

}
