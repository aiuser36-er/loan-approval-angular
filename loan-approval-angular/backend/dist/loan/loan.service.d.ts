import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
import { LoanEvaluationEngine } from './loan-evaluation.engine';
export declare class LoanService {
    private readonly evaluationEngine;
    constructor(evaluationEngine: LoanEvaluationEngine);
    evaluate(request: LoanRequestDto): LoanDecisionDto;
}
