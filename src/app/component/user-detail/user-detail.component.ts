import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Coordinate } from 'src/app/interface/coordinate.interface';
import * as Leaflet from 'leaflet';
// import { Response } from 'src/app/interface/response.interface';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User = {
    uuid: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    gender: '',
    address: '',
    dateOfBirth: '',
    phone: '',
    imageUrl: '',
    coordinate: {
      latitude: 0,
      longitude: 0,
  }  
};
marker = new Leaflet.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
  iconSize: [32, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize: [41, 41]
});

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
      this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]));
      this.loadMap(this.user.coordinate);
    // we used resolver above as an alternative to below code. both are possible
   // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
     // this.userService
      //  .getUser(params.get('uuid')!)
      //  .subscribe((response: any) => {
      //    console.log(response);
      //    this.user = response.results[0];
      //  });
    //   });
  }

  loadMap(coordinate: Coordinate): void {
      const map = Leaflet.map('map', {
        center: [coordinate.latitude, coordinate.longitude],
        zoom: 8
      });

      const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        tileSize:532,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 30,
        crossOrigin: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      mainLayer.addTo(map);
      mainLayer.addTo(map);
      const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.marker });
      marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();

  }
}
