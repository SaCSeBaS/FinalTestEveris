import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  submitted: Boolean = false;
  hide: Boolean = false;

  userFeedback: String = '';

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  signUp(form: FormGroup) {
    this.submitted = true;

    if (this.form.invalid) return;

    const { email, password, name, lastname } = this.form.value;

    this.authService.signUp({ email, password })
    
    .then((res) => {
      let user: User = {
        uid: res.user.uid,
        name: `${name} ${lastname}`
      };

      this.userService.fsAddUser(user);
      this.toastrService.success('¡Usuario registrado!');
      this.router.navigate(['']);
    })
    .catch((err) => {
      this.errorHandlerService.handleAuth(err, 'register');
    })
      
  }

  backToHome() {
    this.router.navigate(['']);
  }

}
