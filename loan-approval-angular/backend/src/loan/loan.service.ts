import { Injectable } from '@nestjs/common';
import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
import { LoanEvaluationEngine } from './loan-evaluation.engine';

@Injectable()
export class LoanService {
  constructor(private readonly evaluationEngine: LoanEvaluationEngine) {}

  evaluate(request: LoanRequestDto): LoanDecisionDto {
    return this.evaluationEngine.evaluate(request);
  }
}