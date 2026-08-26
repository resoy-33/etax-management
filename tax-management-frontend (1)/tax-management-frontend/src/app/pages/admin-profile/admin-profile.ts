import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfile {
  editing = false;
  saving = false;

  readonly profileForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
  });

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const admin = this.authService.currentAdmin();
    if (admin) {
      this.profileForm.patchValue(admin);
    }
  }

  startEditing() {
    this.editing = true;
  }

  cancelEditing() {
    const admin = this.authService.currentAdmin();
    if (admin) {
      this.profileForm.patchValue(admin);
    }
    this.editing = false;
  }

  save() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { fullName, email, phone } = this.profileForm.getRawValue();
    this.saving = true;

    this.authService
      .updateProfile({ fullName: fullName ?? '', email: email ?? '', phone: phone ?? '' })
      .subscribe({
        next: () => {
          this.saving = false;
          this.editing = false;
          this.snackBar.open('Profil mis à jour.', 'Fermer', { duration: 3000 });
        },
        error: (err) => {
          this.saving = false;
          const message = err?.error?.message ?? 'Échec de la mise à jour du profil.';
          this.snackBar.open(message, 'Fermer', { duration: 4000 });
        },
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
