import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/RegisterRequest';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ,'../../../../styles.css']
})
export class RegisterComponent implements OnInit{
  
  signupForm: FormGroup;
  submitted = false;


  showPassword = false;
  showConfirmPassword = false;
  passwordsDoNotMatch: boolean = false;
  error = '';
  successmsg: boolean = false;
  passwordControl: any;
  confirmPasswordControl: any;


  roles:any;

  constructor(
    private title:Title,private router: Router, 
    private authenticationService: AuthService,
    private titleService:Title,private formBuilder:FormBuilder,
    private roleservice:RoleService
    ){
    title.setTitle("فسرلي | التسجيل")
  }

  ngOnInit(): void {

   this.roleservice.getAllroles().subscribe(

    data=>this.roles = data

   )
    const passwordRegexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    
    this.signupForm = this.formBuilder.group({
      numtel: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8)]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.pattern(passwordRegexPattern)]],
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      roles: [[] ,Validators.required ]
    }, { validators: this.passwordsMatch });


    // this.signupForm = this.formBuilder.group({
    //   numtel: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //   firstname : new FormControl('', Validators.required),
    //   lastname : new FormControl('', Validators.required),
    //   roles: [[] ,new FormControl('', Validators.required) ]
    // }, { validators: this.passwordsMatch });


  }

  get f() { return this.signupForm.controls; }






  onSubmit() {

    this.submitted = true;

   

    const formData: RegisterRequest = {
      firstname: this.signupForm.value.firstname ,
      lastname: this.signupForm.value.lastname,
      numTel: this.signupForm.value.numtel,
      password: this.signupForm.value.password,
      roles: [this.signupForm.value.roles.name],
    };
  
  
      console.log(formData)
      this.authenticationService.register(formData).subscribe(

        (data)=>console.log(data)

      )
    

  }





  passwordsMatch(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordsNotMatch': true };
    }
  
    return null;
  }
  

}
