import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoanDecision, LoanRequest } from './loan.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  evaluate(request: LoanRequest): Observable<LoanDecision> {
    return this.http.post<LoanDecision>(`${this.apiUrl}/evaluate`, request);
  }

  /**
   * Fetches the loan history for a given applicant ID.
   * @param applicantId - The unique identifier of the applicant
   * @returns Observable of loan decisions from the applicant's history
   */
  getLoanHistory(applicantId: string): Observable<LoanDecision[]> {
    return this.http.get<LoanDecision[]>(`${this.apiUrl}/history/${applicantId}`).pipe(
      catchError((err) => {
        const message = err?.error?.message || err?.message || `Unable to fetch loan history for applicant ${applicantId}`;
        return throwError(() => new Error(message));
      })
    );
  }
}