"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoanEvaluationEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanEvaluationEngine = void 0;
const common_1 = require("@nestjs/common");
let LoanEvaluationEngine = LoanEvaluationEngine_1 = class LoanEvaluationEngine {
    logger = new common_1.Logger(LoanEvaluationEngine_1.name);
    evaluate(request) {
        this.logger.log(`Evaluating loan for: ${request.applicantId}`);
        if (!request.creditScore) {
            return { applicantId: request.applicantId, status: 'REJECTED', interestRate: null, reason: 'Credit score missing' };
        }
        if (request.creditScore >= 750) {
            return { applicantId: request.applicantId, status: 'APPROVED', interestRate: 7.5, reason: 'Excellent profile' };
        }
        if (request.creditScore >= 600) {
            return { applicantId: request.applicantId, status: 'APPROVED', interestRate: 12.0, reason: 'Standard profile' };
        }
        return { applicantId: request.applicantId, status: 'REJECTED', interestRate: null, reason: 'Credit score too low' };
    }
};
exports.LoanEvaluationEngine = LoanEvaluationEngine;
exports.LoanEvaluationEngine = LoanEvaluationEngine = LoanEvaluationEngine_1 = __decorate([
    (0, common_1.Injectable)()
], LoanEvaluationEngine);
//# sourceMappingURL=loan-evaluation.engine.js.map