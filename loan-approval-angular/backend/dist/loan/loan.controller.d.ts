import { LoanRequestDto, LoanDecisionDto } from './loan.dto';
import { LoanService } from './loan.service';
import { EligibilitySummaryDto } from './eligibility-summary.dto';
export declare class LoanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    evaluate(request: LoanRequestDto): LoanDecisionDto;
    getEligibilitySummary(applicantId: string, creditScore: string): EligibilitySummaryDto;
}
