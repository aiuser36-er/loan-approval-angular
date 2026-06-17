"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanController = void 0;
const common_1 = require("@nestjs/common");
const loan_dto_1 = require("./loan.dto");
const loan_service_1 = require("./loan.service");
const eligibility_summary_dto_1 = require("./eligibility-summary.dto");
const auth_guard_1 = require("../common/guards/auth.guard");
let LoanController = class LoanController {
    loanService;
    constructor(loanService) {
        this.loanService = loanService;
    }
    evaluate(request) {
        return this.loanService.evaluate(request);
    }
    getEligibilitySummary(applicantId, creditScore) {
        if (!creditScore) {
            throw new common_1.BadRequestException('creditScore query parameter is required');
        }
        const parsedScore = parseInt(creditScore, 10);
        if (isNaN(parsedScore) || parsedScore < 0) {
            throw new common_1.BadRequestException('creditScore must be a valid non-negative number');
        }
        if (!applicantId) {
            throw new common_1.NotFoundException('applicantId query parameter is required');
        }
        return this.loanService.getEligibilitySummary(applicantId, parsedScore);
    }
};
exports.LoanController = LoanController;
__decorate([
    (0, common_1.Post)('evaluate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loan_dto_1.LoanRequestDto]),
    __metadata("design:returntype", loan_dto_1.LoanDecisionDto)
], LoanController.prototype, "evaluate", null);
__decorate([
    (0, common_1.Get)('eligibility-summary'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('applicantId')),
    __param(1, (0, common_1.Query)('creditScore')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", eligibility_summary_dto_1.EligibilitySummaryDto)
], LoanController.prototype, "getEligibilitySummary", null);
exports.LoanController = LoanController = __decorate([
    (0, common_1.Controller)('api/loans'),
    __metadata("design:paramtypes", [loan_service_1.LoanService])
], LoanController);
//# sourceMappingURL=loan.controller.js.map