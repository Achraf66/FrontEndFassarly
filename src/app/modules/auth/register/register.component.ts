import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/RegisterRequest';
import { RoleService } from '../services/role.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SmsService } from '../services/smsservice/sms.service';
import { CookieService } from 'ngx-cookie-service';
import { PasswordSuggestionService } from '../services/passwordSuggestion/password-suggestion.service';
import { Clipboard } from '@angular/cdk/clipboard'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ,'../../../../styles.css']
})
export class RegisterComponent implements OnInit{
  suggestedPassword: string = '';

  signupForm: FormGroup;
  submitted = false;

  loading: boolean = false;

  showPassword = false;
  showConfirmPassword = false;
  passwordsDoNotMatch: boolean = false;
  error = '';
  successmsg: boolean = false;
  passwordControl: any;
  confirmPasswordControl: any;
  accountCreated : boolean = false;


  roles:any

  constructor(
    private title:Title,
    private authenticationService: AuthService,
    private formBuilder:FormBuilder,
    private roleservice:RoleService,
    private router:Router,
    private smsService:SmsService,
    private cookieService:CookieService,
    private passwordSuggestionService: PasswordSuggestionService,
    private clipboard: Clipboard,
    private messageService:MessageService
        ){
    this.title.setTitle("فسرلي | التسجيل")
  }

  ngOnInit(): void {

    this.roleservice.getAllroles().subscribe(
      (data:any) => {
        if (data) {
          this.roles = data.filter((role: any) => role.name !== 'admin');
        } 
      },  
      error => {
        console.log(error)
      }
    );
    
    

    
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
    this.loading = true;
    
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
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'خطأ في اختيار المستوى الأكاديمي باللغة العربية',
            });
          }
          if (data.errormessage === 'Phone number is already registered.') {
            this.loading = false;
            Swal.fire({
              icon: 'warning',
              title: 'تحذير',
              text: 'الرقم الذي تم إدخاله مستخدم بالفعل. يرجى استخدام رقم هاتف آخر.'
            });            
          }

          if (data.successmessage === 'Register Success') {
            this.loading = false;
            this.accountCreated=true;
            this.cookieService.set('numtel', formData.numTel);
            this.cookieService.set('password', formData.password);  
            this.signupForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'نجاح',
              html: `
                <p style="font-size: 1.2em; color: #333;">تم تسجيل الحساب بنجاح. ستتلقى رسالة تأكيد عبر الهاتف لتأكيد حسابك.</p>
                <p style="font-size: 1.2em; color: #333;">الرجاء إدخال الرمز</p>
              `,
              confirmButtonText: 'نعم',
              confirmButtonColor: '#3085d6'
            });
                        
            this.smsService.setphoneUser(formData.numTel)
                    setTimeout(() => {
              this.router.navigate(['/auth/smsVerification']); 
            }, 5000);
          }
        },
        (error) => {
          this.loading = false; 
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.',
          });
        })
    

  }



  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.showSuccessMessage("تم نسخ كلمة المرور المقترحة")
  }


    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  };



  suggestPassword() {
     this.suggestedPassword = this.passwordSuggestionService.generateRandomPassword();
    this.signupForm.patchValue({ password: this.suggestedPassword, confirmPassword: this.suggestedPassword });
  }

  
  showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'تم نسخ كلمة المرور المقترحة',
    });

    setTimeout(() => {
      this.clearMessages();
    }, 2000); 
  }

  clearMessages() {
    this.messageService.clear();
  }
}
