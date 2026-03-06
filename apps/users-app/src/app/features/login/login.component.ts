import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  TuiFieldErrorPipe,
  TuiPassword
} from '@taiga-ui/kit';
import {
  TuiButton,
  TuiNotification,
  TuiTextfield,
  TuiError,
  TuiLabel,
  TuiIcon
} from '@taiga-ui/core';
import {
  TuiButtonLoading
} from '@taiga-ui/kit';
import { AuthFacade } from '@willdom-test/users-lib';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiButtonLoading,
    TuiError,
    TuiFieldErrorPipe,
    TuiNotification,
    TuiTextfield,
    TuiLabel,
    TuiPassword,
    TuiIcon
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);

  loginForm = this.fb.group({
    email: ['admin@willdom.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required, Validators.minLength(6)]],
  });

  loading$ = this.authFacade.loading$;
  error$ = this.authFacade.error$;

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authFacade.login(email!, password!);
    }
  }
}
