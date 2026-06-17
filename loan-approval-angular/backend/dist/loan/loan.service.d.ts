import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
import { LoanEvaluationEngine } from './loan-evaluation.engine';
import { EligibilitySummaryDto } from './eligibility-summary.dto';
export declare class LoanService {
    private readonly evaluationEngine;
    constructor(evaluationEngine: LoanEvaluationEngine);
    evaluate(request: LoanRequestDto): LoanDecisionDto;
    getEligibilitySummary(applicantId: string, creditScore: number): EligibilitySummaryDto;
    private generateEligibilityMessage;
}
