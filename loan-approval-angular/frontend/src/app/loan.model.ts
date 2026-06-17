export interface LoanRequest {
  applicantId: string;
  requestedAmount: number;
  creditScore: number;
  annualIncome: number;
  employmentStatus: string;
}

export interface LoanDecision {
  applicantId: string;
  status: 'APPROVED' | 'REJECTED';
  interestRate: number | null;
  reason: string;
}

export interface EligibilitySummary {
  applicantId: string;
  creditScore: number;
  message: string;
  isEligible: boolean;
}