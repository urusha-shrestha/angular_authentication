import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
//initial part of api url is defined in environment folder so that it is reusable everywhere

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  registerUser(data)
  {
    return this.http.post(environment.apiUrl+'/api/register',data);
  }

  login(data)
  {
    return this.http.post(environment.apiUrl+'/api/login',data);
  }
}
