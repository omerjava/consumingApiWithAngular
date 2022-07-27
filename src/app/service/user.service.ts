import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiServerUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  // fetch users
  getUsers(size: number = 10): Observable<any> {
    return this.http
      .get<any>(`${this.apiServerUrl}?results=${size}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  // fetch user by uuid
  getUser(uuid: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiServerUrl}?results=${uuid}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            username: user.login.username,
            gender: user.gender,
            address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}`,
            dateOfBirth: user.dob.date,
            phone: user.phone,
            imageUrl: user.picture.medium,
            coordinate: {
              latitude: +user.location.coordinates.latitude,
              longitude: +user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
