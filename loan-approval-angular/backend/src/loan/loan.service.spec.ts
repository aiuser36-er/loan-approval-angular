import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { LoanEvaluationEngine } from './loan-evaluation.engine';
import { LoanRequestDto, LoanDecisionDto } from './loan.dto';

describe('LoanService', () => {
  let service: LoanService;
  let engine: LoanEvaluationEngine;

  const mockDecision: LoanDecisionDto = {
    applicantId: 'A001',
    status: 'APPROVED',
    interestRate: 7.5,
    reason: 'Excellent profile',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: LoanEvaluationEngine,
          useValue: { evaluate: jest.fn().mockReturnValue(mockDecision) },
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    engine = module.get<LoanEvaluationEngine>(LoanEvaluationEngine);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delegate evaluate() to LoanEvaluationEngine', () => {
    const request: LoanRequestDto = {
      applicantId: 'A001',
      requestedAmount: 10000,
      creditScore: 780,
      annualIncome: 60000,
      employmentStatus: 'SALARIED',
    };

    const result = service.evaluate(request);

    expect(engine.evaluate).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockDecision);
  });
});
