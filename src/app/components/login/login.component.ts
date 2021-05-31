import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form: FormGroup;
submitted = false;
data:any;
token:any;

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private dataService:DataService,
    private toastr:ToastrService
  ) { }

  loginForm(){
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password:[null,[Validators.required]]
    });
  }

  ngOnInit(): void {
   this.loginForm();
  }

  get f(){
    return this.form.controls;
    //form.controls has the value and the validations information
  }

  submit():void{
    this.submitted=true;
    if (this.form.invalid){
      return;
    }
    this.dataService.login(this.form.value)
    .subscribe(res=>{
      this.data = res;

      if(this.data.status === 1) //checking status from backend api 
      {
        this.token = this.data.data.token; //getting token from backend response data
        localStorage.setItem('token',this.token); //setting token in local storage
        this.router.navigate(['/']);

        //displaying toast message 
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {timeOut:2000,
        progressBar:true
      });
      } else if (this.data.status === 0){
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {timeOut:2000,
        progressBar:true
      });
      }
    });
  }

}
