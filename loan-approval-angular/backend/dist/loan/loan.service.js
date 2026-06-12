"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const common_1 = require("@nestjs/common");
let LoanService = class LoanService {
    evaluate(request) {
        console.log('Evaluating loan for:', request.applicantId);
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
exports.LoanService = LoanService;
exports.LoanService = LoanService = __decorate([
    (0, common_1.Injectable)()
], LoanService);
//# sourceMappingURL=loan.service.js.map