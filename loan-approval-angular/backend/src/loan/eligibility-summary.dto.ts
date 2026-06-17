/**
 * DTO for eligibility summary response.
 * Contains applicant information and eligibility determination.
 */
export class EligibilitySummaryDto {
  applicantId: string;
  creditScore: number;
  message: string;
  isEligible: boolean;
}
