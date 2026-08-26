import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Taxpayer } from '../models/taxpayer';

const BASE_URL = `${environment.apiUrl}/taxpayers`;

/**
 * TaxpayerService — talks to the Spring Boot backend's /api/taxpayers
 * endpoints. Keeps a local signal cache so every page (dashboard counts,
 * the table, etc.) re-renders instantly after a create/update/delete
 * without each of them re-fetching the whole list.
 */
@Injectable({
  providedIn: 'root',
})
export class TaxpayerService {
  private readonly _taxpayers = signal<Taxpayer[]>([]);
  private readonly _loaded = signal(false);

  readonly taxpayers = this._taxpayers.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly totalCount = computed(() => this._taxpayers().length);
  readonly pendingCount = computed(
    () => this._taxpayers().filter((t) => t.status === 'En attente').length
  );
  readonly activeCount = computed(
    () => this._taxpayers().filter((t) => t.status === 'Actif').length
  );

  constructor(private http: HttpClient) {}

  /** Fetches the full list from the backend and refreshes the local cache. */
  refresh(): Observable<Taxpayer[]> {
    return this.http.get<Taxpayer[]>(BASE_URL).pipe(
      tap((data) => {
        this._taxpayers.set(data);
        this._loaded.set(true);
      })
    );
  }

  /** Cached list, synchronous — use in templates. Call refresh() first if you need it fresh. */
  getAll(): Taxpayer[] {
    return this._taxpayers();
  }

  /** Always hits the backend directly, e.g. when opening the edit form straight from a URL. */
  getById(id: number): Observable<Taxpayer> {
    return this.http.get<Taxpayer>(`${BASE_URL}/${id}`);
  }

  add(taxpayer: Omit<Taxpayer, 'id'>): Observable<Taxpayer> {
    return this.http
      .post<Taxpayer>(BASE_URL, taxpayer)
      .pipe(tap((created) => this._taxpayers.update((list) => [...list, created])));
  }

  update(id: number, changes: Omit<Taxpayer, 'id'>): Observable<Taxpayer> {
    return this.http
      .put<Taxpayer>(`${BASE_URL}/${id}`, changes)
      .pipe(
        tap((updated) =>
          this._taxpayers.update((list) => list.map((t) => (t.id === id ? updated : t)))
        )
      );
  }

  deleteTaxpayer(id: number): Observable<void> {
    return this.http
      .delete<void>(`${BASE_URL}/${id}`)
      .pipe(tap(() => this._taxpayers.update((list) => list.filter((t) => t.id !== id))));
  }
}
