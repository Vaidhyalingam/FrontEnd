import { Component, OnInit } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface formDataInterface {
  name: string;
  email: string;
  [key: string]: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSignup(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      var poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId, // Your client id here
      };
      var userPool = new CognitoUserPool(poolData);
      var attributeList = [];
      let formData: formDataInterface = {
        name: this.name,
        email: this.email,
      };

      for (let key in formData) {
        let attrData = {
          Name: key,
          Value: formData[key],
        };
        let attribute = new CognitoUserAttribute(attrData);
        attributeList.push(attribute);
      }
      console.log(this.password);
      userPool.signUp(
        this.name,
        this.password,
        attributeList,
        [],
        (err, result) => {
          this.isLoading = false;
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          } else {
            console.log('Hello World');
            this.router.navigate(['/']);
          }
        }
      );
    }
  }
}
