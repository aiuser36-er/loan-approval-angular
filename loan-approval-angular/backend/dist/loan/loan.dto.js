"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanDecisionDto = exports.LoanRequestDto = void 0;
class LoanRequestDto {
    applicantId;
    requestedAmount;
    creditScore;
    annualIncome;
    employmentStatus;
}
exports.LoanRequestDto = LoanRequestDto;
class LoanDecisionDto {
    applicantId;
    status;
    interestRate;
    reason;
}
exports.LoanDecisionDto = LoanDecisionDto;
//# sourceMappingURL=loan.dto.js.map