import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interface/response.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  response: Response = {
    info: {
      seed: '',
      results: 0,
      page: 0,
      version: ''
  },
    results: []
};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(15).subscribe(
      (results:any) => {
        this.response = results;
      }
    );
  }

}
