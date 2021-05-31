import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../validators/confirm.validator';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted=false;
  data:any;

  constructor(
    private formBuilder:FormBuilder,
    private dataService:DataService,
    private toastr:ToastrService
    ) { }

    createForm(){
      this.form = this.formBuilder.group({
        name:[null, Validators.required],
        email:[null,[Validators.required,Validators.email]],
        password:[null,[Validators.required,Validators.minLength(6)]],
        confirm_password:[null,Validators.required]
      }, {
        validator: MustMatch('password','confirm_password'),
      });
    }

  ngOnInit(): void {
    this.createForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(): void{
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.registerUser(this.form.value)
    .subscribe(
      res =>{
        this.data=res;
       // console.log(res);
        
       //data from backend. status 1 is success
        if (this.data.status === 1){
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
            timeOut:2000,
            progressBar:true
          })
        } else {
          this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
            timeOut:2000,
            progressBar:true
          });
        }

        //resetting values in the test field to null after form submission
        this.submitted=false;
        this.form.get('name').reset();
        this.form.get('email').reset();
        this.form.get('password').reset();
        this.form.get('confirm_password').reset();
        
      }
    );
  }

}
