import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SmsService } from '../services/smsservice/sms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifySmsRequest } from '../models/VerifySmsRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.css']
})
export class SmsVerificationComponent implements OnInit{

  phoneUser:any | null;
  verificationCode: string[] = ['', '', '', '', ''];
  phoneNumber: string = '';

  SmsVerifyWithNumber:FormGroup;

  constructor(private title:Title,private smsService:SmsService,private fb:FormBuilder){
    this.title.setTitle("التحقق من الحساب")
    this.phoneUser = smsService.getphoneUser();
    this.initilizeFormWithNumber();

  }

  ngOnInit(): void {
    
  }


  initilizeFormWithNumber() {
    this.SmsVerifyWithNumber = this.fb.group({
      phoneNumber: ['', Validators.required],
      verificationCode: ['', Validators.required]
    });
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
              text: 'تم التحقق من الحساب بنجاح.'
            });
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
