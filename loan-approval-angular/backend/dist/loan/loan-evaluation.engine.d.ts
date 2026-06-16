import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
export declare class LoanEvaluationEngine {
    private readonly logger;
    evaluate(request: LoanRequestDto): LoanDecisionDto;
}
