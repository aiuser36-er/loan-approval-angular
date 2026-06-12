export declare class LoanRequestDto {
    applicantId: string;
    requestedAmount: number;
    creditScore: number;
    annualIncome: number;
    employmentStatus: string;
}
export declare class LoanDecisionDto {
    applicantId: string;
    status: 'APPROVED' | 'REJECTED';
    interestRate: number | null;
    reason: string;
}
