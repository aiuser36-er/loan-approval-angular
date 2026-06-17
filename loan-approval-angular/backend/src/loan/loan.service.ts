import { Injectable } from '@nestjs/common';
import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
import { LoanEvaluationEngine } from './loan-evaluation.engine';
import { EligibilitySummaryDto } from './eligibility-summary.dto';

@Injectable()
export class LoanService {
  constructor(private readonly evaluationEngine: LoanEvaluationEngine) {}

  /**
   * Evaluates a loan request and returns a decision.
   * @param request - The loan request containing applicant information
   * @returns The loan decision with approval status and interest rate
   */
  evaluate(request: LoanRequestDto): LoanDecisionDto {
    return this.evaluationEngine.evaluate(request);
  }

  /**
   * Determines applicant eligibility based on credit score.
   * @param applicantId - The applicant identifier
   * @param creditScore - The credit score to evaluate
   * @returns Eligibility summary with score-specific feedback
   */
  getEligibilitySummary(
    applicantId: string,
    creditScore: number,
  ): EligibilitySummaryDto {
    const isEligible = creditScore >= 600;
    const message = this.generateEligibilityMessage(creditScore);

    return {
      applicantId,
      creditScore,
      message,
      isEligible,
    };
  }

  /**
   * Generates score-specific feedback message.
   * @param creditScore - The credit score
   * @returns Formatted feedback message
   */
  private generateEligibilityMessage(creditScore: number): string {
    const minimumRequired = 600;
    const eligibilityStatus = creditScore >= minimumRequired ? 'Eligible!' : 'Not eligible.';
    return `Your score is ${creditScore}, minimum required is ${minimumRequired}. ${eligibilityStatus}`;
  }
}