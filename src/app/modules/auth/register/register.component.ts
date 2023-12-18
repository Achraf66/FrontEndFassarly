import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/RegisterRequest';
import { RoleService } from '../services/role.service';
import Swal from 'sweetalert2';
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

    
    this.signupForm = this.formBuilder.group({
      numtel: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      roles: [[] ,Validators.required ]}
    ,      {validators: this.passwordMatchValidator});

    
        this.passwordControl = this.signupForm.get('password');
    this.confirmPasswordControl = this.signupForm.get('confirmPassword');


  }

  get f() { return this.signupForm.controls; }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }



  onSubmit() {

    this.submitted = true;

   

    const formData: RegisterRequest = {
      firstname: this.signupForm.value.firstname ,
      lastname: this.signupForm.value.lastname,
      numTel: this.signupForm.value.numtel,
      password: this.signupForm.value.password,
      roles: [this.signupForm.value.roles.name],
    };
  
  
      this.authenticationService.register(formData).subscribe(

        data=>{
          if (data.errormessage === 'Some roles are not valid.') {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'خطأ في اختيار المستوى الأكاديمي باللغة العربية',
            });
          }
          if (data.successmessage === 'User Already Exisits') {
            Swal.fire({
              icon: 'warning',
              title: 'تحذير',
              text: 'الرقم الذي تم إدخاله مستخدم بالفعل. يرجى استخدام رقم هاتف آخر.'
            });            
          }

          if(data.successmessage === 'Register Success'){
            Swal.fire({
              icon: 'success',
              title: 'نجاح',
              text: 'تم تسجيل المستخدم بنجاح',
            });
          }

        }
        

      )
    

  }





    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

}
