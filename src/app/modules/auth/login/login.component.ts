import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import Swal from 'sweetalert2';
import { User } from '../../admin/adminmodules/users/models/User';
import { jwtDecode } from 'jwt-decode';

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
    this.numtel = this.authenticationService.getUserId();
    this.fetchUserbytel(this.numtel);
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
              if (this.CurrentUser?.roles.some((role) => role.name.includes('admin'))) {
                const token = localStorage.getItem('accesstoken');
                  this.router.navigate(['/admin/admindashboard']);
                
              } else {
                // Navigate to the matieres page without triggering a full page reload
                  this.router.navigate(['/matieres/matieres']).then(()=>{
                  window.location.reload()
                })
              }
            }
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: 'الاعتمادات غير صحيحة. الرجاء التحقق من صحة الرقم أو استخدام رقم هاتف آخر.',
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
