import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute
  ) {}

  errorMsg: any;
  successMsg: any;
  getparamid: any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res) => {
        this.userForm.patchValue({
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
        });
      });
    }
  }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
  });

  userSubmit() {
    if (this.userForm.valid) {
      this.service.createData(this.userForm.value).subscribe((res) => {
        this.userForm.reset();
        this.successMsg = res.message;
      });
    } else {
      this.errorMsg = 'All fields are required!!';
    }
  }

  userUpdate() {
    if (this.userForm.valid) {
      this.service
        .updateData(this.userForm.value, this.getparamid)
        .subscribe((res) => {
          this.successMsg = res.message;
        });
    } else {
      this.errorMsg = 'All fields are required!!';
    }
  }
}
