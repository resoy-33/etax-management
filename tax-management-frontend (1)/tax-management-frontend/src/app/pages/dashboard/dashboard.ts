import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TaxpayerService } from '../../services/taxpayer.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(public taxpayerService: TaxpayerService) {}

  ngOnInit(): void {
    this.taxpayerService.refresh().subscribe();
  }
}
