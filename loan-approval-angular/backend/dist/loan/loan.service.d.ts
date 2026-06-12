import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
export declare class LoanService {
    evaluate(request: LoanRequestDto): LoanDecisionDto;
}
