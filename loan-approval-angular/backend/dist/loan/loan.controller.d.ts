import { LoanRequestDto, LoanDecisionDto } from './loan.dto';
import { LoanService } from './loan.service';
export declare class LoanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    evaluate(request: LoanRequestDto): LoanDecisionDto;
}
