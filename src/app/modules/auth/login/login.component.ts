import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import Swal from 'sweetalert2';
import { User } from '../../admin/adminmodules/users/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  showPassword = false;
  showConfirmPassword = false;
  passwordsDoNotMatch: boolean = false;
  error = '';
  successmsg: boolean = false;
  passwordControl: any;
  confirmPasswordControl: any;
  CurrentUser: User | undefined;
  numtel: string | null;

  constructor(
    private title: Title,
    private router: Router,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.title.setTitle("فسرلي | تسجيل الدخول");
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      numtel: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    const FormData: AuthenticationRequest = {
      numtel: this.signupForm.value.numtel,
      password: this.signupForm.value.password,
    };

    this.authenticationService.login(FormData).subscribe(
      (data) => {
        if (data.successmessage === 'Sucess login') {
          localStorage.setItem('accesstoken', data.access_token);
          Swal.fire({
            icon: 'success',
            title: 'نجاح',
            text: 'تم تسجيل الدخول بنجاح.',
            confirmButtonText: 'نعم'
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {                     
              // Navigate to the matieres page without triggering a full page reload
              this.router.navigate(['/matieres/matieres']).then(() => {
                this.authenticationService.setUserId(this.signupForm.value.numtel)
                window.location.reload();
              });
            }
          });
        } else if (data.errormessage === 'User Already logged in on another device') {
          Swal.fire({
            icon: 'warning',
            title: 'تنبيه',
            text: 'المستخدم قد قام بتسجيل الدخول بالفعل على جهاز آخر.',
            confirmButtonText: 'حسناً'
          });
        } 
        
        else if (data.errormessage === 'This User is not sms verified yet') {
          Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: ' الرجاء إكمال عملية التحقق من خلال رمز التحقق الذي تم إرساله عبر الرسالة النصية.',
            confirmButtonText: 'حسناً'

          });
        }
        
        else {
          Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: 'الاعتمادات غير صحيحة. الرجاء التحقق من صحة الرقم أو استخدام رقم هاتف آخر.',
            confirmButtonText: 'حسناً'

          });
        }
      },
    );
    
    

  }

  async fetchUserbytel(nomtel: string | null) {
    try {
      const data = await this.authenticationService.findUserBynumTel(nomtel).toPromise();
      this.CurrentUser = data || undefined; // Update here
    } catch (error) {
      console.log(error);
    }
  }
}
