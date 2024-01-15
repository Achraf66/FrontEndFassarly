import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SmsService } from '../services/smsservice/sms.service';
import { FormBuilder } from '@angular/forms';
import { VerifySmsRequest } from '../models/VerifySmsRequest';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.css']
})
export class SmsVerificationComponent implements OnInit{

  phoneUser:any | null;
  verificationCode: string[] = ['', '', '', '', ''];
  phoneNumber: string = '';

  verificationCodewithoutNumber : string[] = ['', '', '', '', ''];

  constructor(private title:Title,private smsService:SmsService,private fb:FormBuilder,private router:Router){
    this.title.setTitle("التحقق من الحساب")
    this.phoneUser = smsService.getphoneUser();

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
    const concatenatedCode = this.verificationCode.join('');
    const verifySmsRequest: VerifySmsRequest = {
      phoneNumber: this.phoneNumber,
      verificationCode: concatenatedCode
    };
      this.smsService.verifySmsCode(verifySmsRequest).subscribe(
        (data) => {
          if (data.errormessage === 'Incorrect verification code.') {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'رمز التحقق غير صحيح.'
            });
          } else if (data.errormessage === 'User not found for phone number') {
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
}
