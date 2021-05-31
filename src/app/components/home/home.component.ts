
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//npm install jwt-decode to decode the jwt token and get information from it
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:any;
  userData:any;

  //to display in the home component
  message='';

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token'); //getting token value from the local storage
    this.userData = jwt_decode(this.token);
    this.message= this.userData.name;
    console.log(this.token);
    console.log(this.userData);
    
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
