import { Injectable, computed, signal } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoanDecision, LoanRequest } from './loan.model';
import { LoanService } from './loan.service';

@Injectable({ providedIn: 'root' })
export class LoanStateService {
  private readonly decision = signal<LoanDecision | null>(null);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  readonly decision$ = computed(() => this.decision());
  readonly loading$ = computed(() => this.loading());
  readonly error$ = computed(() => this.error());

  constructor(private readonly loanService: LoanService) {}

  /**
   * Submits a loan evaluation request and updates reactive state signals accordingly.
   * Sets loading to true and clears any previous error before calling the API.
   * On success, stores the decision and resets loading.
   * On error, stores the error message and resets loading.
   * @param request - The loan application data to evaluate
   */
  evaluate(request: LoanRequest): void {
    this.loading.set(true);
    this.error.set(null);

    this.loanService.evaluate(request).pipe(
      catchError((err: unknown) => {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        this.error.set(message);
        this.loading.set(false);
        return throwError(() => err);
      }),
    ).subscribe({
      next: (decision) => {
        this.decision.set(decision);
        this.loading.set(false);
      },
    });
  }
}
