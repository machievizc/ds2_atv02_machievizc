import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: string;

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public login() {
    if (
      this.loginForm.controls['user'].value.toLowerCase() == 'admin' &&
      this.loginForm.controls['password'].value.toLowerCase() == 'admin'
    ) {
      this.auth.setUser(this.loginForm.getRawValue());
      this.auth.setToken(this.loginForm.controls['user'].value);
      setTimeout(() => {
        this.router.navigate(['/usuarios']);
      }, 100);
    } else {
      setTimeout(() => {
        this.error = 'Usuário ou password incorretos.';
      }, 100);
    }
  }
}
