import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  signupForm: FormGroup;
  submitted = false;


  showPassword = false;
  showConfirmPassword = false;
  passwordsDoNotMatch: boolean = false;
  error = '';
  successmsg: boolean = false;
  passwordControl: any;
  confirmPasswordControl: any;
  
  constructor(
    private title:Title,private router: Router, 
    private authenticationService: AuthService,
    private titleService:Title,private formBuilder:FormBuilder,
    private roleservice:RoleService
    ){
    title.setTitle("فسرلي | تسجيل الدخول")
  }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      numtel: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    })

    
  }


  get f() { return this.signupForm.controls; }

  onSubmit() {

    this.submitted = true;
 
 const FormData : AuthenticationRequest ={
  numtel : this.signupForm.value.numtel , 
  password :this.signupForm.value.password
 }

//  console.log(FormData)

 this.authenticationService.login(FormData).subscribe(

  (data)=> {

    if (data.successmessage === 'Sucess login') {
      localStorage.setItem('accesstoken', data.access_token);
      Swal.fire({
        icon: 'success', 
        title: 'نجاح',
        text: 'تم تسجيل الدخول بنجاح.'
      });
      this.router.navigate(['/matieres/matieres']);
      setTimeout(() => {
      }, 5000);
    }
    

        if (data.errormessage === 'BadCredentials') {
          Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: 'الاعتمادات غير صحيحة. الرجاء التحقق من صحة الرقم أو استخدام رقم هاتف آخر.'
          });
        }
        
        if (data.errormessage === 'Username Not found') {
          Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: 'الاعتمادات غير صحيحة. الرجاء التحقق من صحة الرقم أو استخدام رقم هاتف آخر.'
          });
        }
        }

 )
 
  }


  
}
