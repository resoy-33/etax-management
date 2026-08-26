import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaxpayerService } from '../../services/taxpayer.service';
import { Taxpayer, TaxpayerType } from '../../models/taxpayer';

@Component({
  selector: 'app-taxpayer-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './taxpayer-form.html',
  styleUrl: './taxpayer-form.css',
})
export class TaxpayerForm implements OnInit {
  editingId: number | null = null;
  saving = false;

  readonly taxpayerForm = new FormGroup({
    taxpayerType: new FormControl<TaxpayerType | ''>('', Validators.required),
    nif: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]),
    status: new FormControl('', Validators.required),
    registrationDate: new FormControl<Date | null>(null, Validators.required),

    // Personne Physique
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    cin: new FormControl(''),
    birthDate: new FormControl<Date | null>(null),

    // Personne Morale
    companyName: new FormControl(''),
    tradeRegister: new FormControl(''),

    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
    ]),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),

    activity: new FormControl('', Validators.required),
    taxCenter: new FormControl('', Validators.required),
    taxRegime: new FormControl('', Validators.required),
  });

  constructor(
    private taxpayerService: TaxpayerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Toggle validators on the Physique/Morale-specific fields as the type changes,
    // so a "Personne Morale" record isn't blocked by an empty CIN, and vice versa.
    this.taxpayerForm.controls.taxpayerType.valueChanges.subscribe((type) => {
      this.applyConditionalValidators(type);
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taxpayerService.getById(Number(idParam)).subscribe({
        next: (taxpayer) => {
          this.editingId = taxpayer.id;
          this.taxpayerForm.patchValue({
            ...taxpayer,
            registrationDate: taxpayer.registrationDate ? new Date(taxpayer.registrationDate) : null,
            birthDate: taxpayer.birthDate ? new Date(taxpayer.birthDate) : null,
          });
          this.applyConditionalValidators(taxpayer.taxpayerType);
        },
        error: () => {
          this.snackBar.open('Contribuable introuvable.', 'Fermer', { duration: 3000 });
          this.router.navigate(['/taxpayers']);
        },
      });
    }
  }

  get isPersonneMorale(): boolean {
    return this.taxpayerForm.controls.taxpayerType.value === 'Personne Morale';
  }

  get isPersonnePhysique(): boolean {
    return this.taxpayerForm.controls.taxpayerType.value === 'Personne Physique';
  }

  private applyConditionalValidators(type: TaxpayerType | '' | null) {
    const physiqueControls = [
      this.taxpayerForm.controls.firstName,
      this.taxpayerForm.controls.lastName,
      this.taxpayerForm.controls.cin,
      this.taxpayerForm.controls.birthDate,
    ];
    const moraleControls = [
      this.taxpayerForm.controls.companyName,
      this.taxpayerForm.controls.tradeRegister,
    ];

    if (type === 'Personne Physique') {
      physiqueControls.forEach((c) => c.setValidators(Validators.required));
      moraleControls.forEach((c) => c.clearValidators());
    } else if (type === 'Personne Morale') {
      moraleControls.forEach((c) => c.setValidators(Validators.required));
      physiqueControls.forEach((c) => c.clearValidators());
    } else {
      [...physiqueControls, ...moraleControls].forEach((c) => c.clearValidators());
    }
    [...physiqueControls, ...moraleControls].forEach((c) => c.updateValueAndValidity());
  }

  saveTaxpayer() {
    if (this.taxpayerForm.invalid) {
      this.taxpayerForm.markAllAsTouched();
      this.snackBar.open('Veuillez corriger les champs invalides.', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    const raw = this.taxpayerForm.getRawValue();
    const payload: Omit<Taxpayer, 'id'> = {
      taxpayerType: raw.taxpayerType || '',
      status: (raw.status || '') as Taxpayer['status'],
      registrationDate: raw.registrationDate ? this.toIsoDate(raw.registrationDate) : '',
      birthDate: raw.birthDate ? this.toIsoDate(raw.birthDate) : '',
      nif: raw.nif ?? '',
      firstName: raw.firstName ?? '',
      lastName: raw.lastName ?? '',
      cin: raw.cin ?? '',
      companyName: raw.companyName ?? '',
      tradeRegister: raw.tradeRegister ?? '',
      phone: raw.phone ?? '',
      email: raw.email ?? '',
      address: raw.address ?? '',
      city: raw.city ?? '',
      postalCode: raw.postalCode ?? '',
      activity: raw.activity ?? '',
      taxCenter: raw.taxCenter ?? '',
      taxRegime: raw.taxRegime ?? '',
    };

    this.saving = true;
    const request$ =
      this.editingId !== null
        ? this.taxpayerService.update(this.editingId, payload)
        : this.taxpayerService.add(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open(
          this.editingId !== null ? 'Contribuable mis à jour.' : 'Contribuable enregistré.',
          'Fermer',
          { duration: 3000 }
        );
        this.router.navigate(['/taxpayers']);
      },
      error: (err) => {
        this.saving = false;
        const message =
          err?.error?.message ?? "Échec de l'enregistrement. Vérifiez les champs et réessayez.";
        this.snackBar.open(message, 'Fermer', { duration: 4000 });
      },
    });
  }

  private toIsoDate(date: Date): string {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }
}
