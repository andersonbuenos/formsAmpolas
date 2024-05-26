import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  passwordConfirm: FormControl<string | null>
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^.+@saude\.ms\.gov\.br$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.loginService.signup(name!, email!, password!).subscribe({
        next: () => {
          this.toastService.success("Bem-vindo(a), " + name + "!");
          this.router.navigate(['/user']); // Redireciona para a página de login após o cadastro bem-sucedido
        },
        error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
      });
    }
  }
  

  navigate() {
    this.router.navigate(["user"]);
  }
}