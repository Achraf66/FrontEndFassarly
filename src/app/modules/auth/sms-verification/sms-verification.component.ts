import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SmsService } from '../services/smsservice/sms.service';
import { FormBuilder } from '@angular/forms';
import { VerifySmsRequest } from '../models/VerifySmsRequest';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.css']
})
export class SmsVerificationComponent implements OnInit{
  isError: boolean = false;
  phoneUser:any | null;
  verificationCode: string[] = ['', '', '', '', ''];
  phoneNumber: string = '';
  loading :boolean = false;
  verificationCodewithoutNumber : string[] = ['', '', '', '', ''];
  disabledConfirm:boolean = false;
  constructor(
    private title:Title,
    private smsService:SmsService,
    private fb:FormBuilder,
    private router:Router,
    private authenticationService:AuthService,
    private cookieService:CookieService
  ){
    this.title.setTitle("التحقق من الحساب")
    this.phoneUser = smsService.getphoneUser();
    // const savedNumtel = this.cookieService.get('numtel');
    // if (savedNumtel) {
    //   this.phoneUser = savedNumtel;
    // }
  }

  ngOnInit(): void {
    
  }

    onSubmitWithoutNumber(){
      const concatenatedCode = this.verificationCodewithoutNumber.join('');
      const verifySmsRequest: VerifySmsRequest = {
        phoneNumber: this.phoneUser,
        verificationCode: concatenatedCode
      };
      this.smsService.verifySmsCode(verifySmsRequest).subscribe(
        (data) => {
          if (data.errormessage === 'Incorrect verification code.') {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'رمز التحقق غير صحيح.',
              confirmButtonText: 'حسناً'
            });
          } else if (data.errormessage === 'User not found for phone number') {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'المستخدم غير موجود لرقم الهاتف المحدد.',
              confirmButtonText: 'حسناً'
            });
          } else if (data.successmessage === 'Verification successful. SMS is now verified.') {
            Swal.fire({
              icon: 'success',
              title: 'نجاح',
              text: 'تم التحقق من الحساب بنجاح.',
              confirmButtonText: 'حسناً'
            });
            this.disabledConfirm = true;
            localStorage.setItem('accesstoken', data.access_token);
            this.router.navigate(['/matieres/matieres']).then(() => {
              this.authenticationService.setUserId(this.phoneUser)
              window.location.reload();
            });

            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 3000);
            
          }

          else if (data.errormessage === 'An error occurred during code verification.'){
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'خطأ.'
            });
          }
        }
      )
    }




  onSubmit(){
    this.loading = true
    const concatenatedCode = this.verificationCode.join('');
    const verifySmsRequest: VerifySmsRequest = {
      phoneNumber: this.phoneNumber,
      verificationCode: concatenatedCode
    };
      this.smsService.verifySmsCode(verifySmsRequest).subscribe(
        (data) => {
          if (data.errormessage === 'User is already verified.') {
            setTimeout(() => {
              this.loading = false;
              Swal.fire({
                icon: 'info',
                title: 'تنبيه',
                text: 'لقد قمت بالفعل بالتحقق من حسابك.',
              });
              this.router.navigate(['/auth/login']);

            }, 5000);
          }  

          if (data.errormessage === 'Incorrect verification code.') {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'رمز التحقق غير صحيح.'
            });
          } else if (data.errormessage === 'User not found for phone number') {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'المستخدم غير موجود لرقم الهاتف المحدد.'
            });
          } else if (data.successmessage === 'Verification successful. SMS is now verified.') {
            Swal.fire({
              icon: 'success',
              title: 'نجاح',
              text: 'تم التحقق من الحساب بنجاح.',
              confirmButtonText: 'حسناً'
            });
            this.loading = false;
            localStorage.setItem('accesstoken', data.access_token);
            setTimeout(() => {
              this.router.navigate(['/matieres/matieres']).then(() => {
                this.authenticationService.setUserId(this.phoneUser)
                window.location.reload();
              });
              }
              , 3000);
          }

          else if (data.errormessage === 'An error occurred during code verification.'){
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'خطأ.'
            });
          }
        }
      )

  }

  resendCode(numTel: string) {
    if(!numTel){
      this.isError = false;
      this.smsService.reSendSmsCode(this.phoneUser).subscribe(
          (data) => {
              if (data.errormessage === 'This user does not exist.') {
                  Swal.fire({
                      icon: 'error',
                      title: 'خطأ',
                      text: 'هذا المستخدم غير موجود',
                      confirmButtonText: 'نعم',
                      closeButtonAriaLabel: 'إغلاق',
                      confirmButtonAriaLabel: 'نعم',
                      cancelButtonAriaLabel: 'إلغاء',
                      denyButtonAriaLabel: 'رفض'
                  });
              }
              if (data.errormessage === 'This user is already verified.') {
                  Swal.fire({
                      icon: 'info',
                      title: 'معلومات',
                      text: 'هذا المستخدم تم التحقق منه بالفعل',
                      confirmButtonText: 'نعم',
                      closeButtonAriaLabel: 'إغلاق',
                      confirmButtonAriaLabel: 'نعم',
                      cancelButtonAriaLabel: 'إلغاء',
                      denyButtonAriaLabel: 'رفض'
                  });
              }
              if (data.successmessage === 'Verification code resent successfully.') {
                  Swal.fire({
                      icon: 'success',
                      title: 'نجاح',
                      text: 'تم إعادة إرسال رمز التحقق بنجاح',
                      confirmButtonText: 'نعم',
                      closeButtonAriaLabel: 'إغلاق',
                      confirmButtonAriaLabel: 'نعم',
                      cancelButtonAriaLabel: 'إلغاء',
                      denyButtonAriaLabel: 'رفض'
                  });
              }
              if (data.errormessage === 'An error occurred while resending verification code.') {
                  Swal.fire({
                      icon: 'error',
                      title: 'خطأ',
                      text: 'حدث خطأ أثناء إعادة إرسال رمز التحقق',
                      confirmButtonText: 'نعم',
                      closeButtonAriaLabel: 'إغلاق',
                      confirmButtonAriaLabel: 'نعم',
                      cancelButtonAriaLabel: 'إلغاء',
                      denyButtonAriaLabel: 'رفض'
                  });
              }
          },
          (error) => {
              console.log(error);
              Swal.fire({
                  icon: 'error',
                  title: 'خطأ',
                  text: 'حدث خطأ في الاتصال بالخادم',
                  confirmButtonText: 'نعم',
                  closeButtonAriaLabel: 'إغلاق',
                  confirmButtonAriaLabel: 'نعم',
                  cancelButtonAriaLabel: 'إلغاء',
                  denyButtonAriaLabel: 'رفض'
              });
          }
      );

    }
    if (!numTel && !this.phoneNumber && this.phoneNumber.trim() === '' && !this.phoneUser) {
        this.isError = true;
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'يرجى إدخال رقم الهاتف',
            confirmButtonText: 'نعم',
            closeButtonAriaLabel: 'إغلاق',
            confirmButtonAriaLabel: 'نعم',
            cancelButtonAriaLabel: 'إلغاء',
            denyButtonAriaLabel: 'رفض'
        }).then(() => {
            (document.querySelector('input[name="phone"]') as HTMLInputElement)?.focus();
        });
        return;
    } else {
        this.isError = false;
        this.smsService.reSendSmsCode(numTel).subscribe(
            (data) => {
                if (data.errormessage === 'This user does not exist.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطأ',
                        text: 'هذا المستخدم غير موجود',
                        confirmButtonText: 'نعم',
                        closeButtonAriaLabel: 'إغلاق',
                        confirmButtonAriaLabel: 'نعم',
                        cancelButtonAriaLabel: 'إلغاء',
                        denyButtonAriaLabel: 'رفض'
                    });
                }
                if (data.errormessage === 'This user is already verified.') {
                    Swal.fire({
                        icon: 'info',
                        title: 'معلومات',
                        text: 'هذا المستخدم تم التحقق منه بالفعل',
                        confirmButtonText: 'نعم',
                        closeButtonAriaLabel: 'إغلاق',
                        confirmButtonAriaLabel: 'نعم',
                        cancelButtonAriaLabel: 'إلغاء',
                        denyButtonAriaLabel: 'رفض'
                    });
                }
                if (data.successmessage === 'Verification code resent successfully.') {
                    Swal.fire({
                        icon: 'success',
                        title: 'نجاح',
                        text: 'تم إعادة إرسال رمز التحقق بنجاح',
                        confirmButtonText: 'نعم',
                        closeButtonAriaLabel: 'إغلاق',
                        confirmButtonAriaLabel: 'نعم',
                        cancelButtonAriaLabel: 'إلغاء',
                        denyButtonAriaLabel: 'رفض'
                    });
                }
                if (data.errormessage === 'An error occurred while resending verification code.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطأ',
                        text: 'حدث خطأ أثناء إعادة إرسال رمز التحقق',
                        confirmButtonText: 'نعم',
                        closeButtonAriaLabel: 'إغلاق',
                        confirmButtonAriaLabel: 'نعم',
                        cancelButtonAriaLabel: 'إلغاء',
                        denyButtonAriaLabel: 'رفض'
                    });
                }
            },
            (error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'حدث خطأ في الاتصال بالخادم',
                    confirmButtonText: 'نعم',
                    closeButtonAriaLabel: 'إغلاق',
                    confirmButtonAriaLabel: 'نعم',
                    cancelButtonAriaLabel: 'إلغاء',
                    denyButtonAriaLabel: 'رفض'
                });
            }
        );
    }
}


}
