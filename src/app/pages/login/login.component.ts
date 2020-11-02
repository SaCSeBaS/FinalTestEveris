import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  submitted: Boolean = false;
  hide: Boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  emailLogin(form) {
    this.submitted = true;

    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.authService.emailLogin({ email, password })
        .then((res) => {
        
          this.userService.fsGetUser(res.user.uid).subscribe(
            (result) => { 
              this.toastrService.info(`Hola de nuevo, ${result.name}`);   
              this.router.navigateByUrl(''); 
            }
          );
        })
        .catch((err) => this.errorHandler.handleAuth(err, 'email'));
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
