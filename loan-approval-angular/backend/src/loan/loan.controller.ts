import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { LoanRequestDto, LoanDecisionDto } from './loan.dto';
import { LoanService } from './loan.service';
import { EligibilitySummaryDto } from './eligibility-summary.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('api/loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('evaluate')
  evaluate(@Body() request: LoanRequestDto): LoanDecisionDto {
    return this.loanService.evaluate(request);
  }

  /**
   * Retrieves applicant eligibility summary based on credit score.
   * @param applicantId - The applicant identifier (query parameter)
   * @param creditScore - The credit score (query parameter)
   * @returns Eligibility summary with score-specific feedback
   * @throws BadRequestException if creditScore is invalid or missing
   * @throws NotFoundException if applicant is not found
   */
  @Get('eligibility-summary')
  @UseGuards(AuthGuard)
  getEligibilitySummary(
    @Query('applicantId') applicantId: string,
    @Query('creditScore') creditScore: string,
  ): EligibilitySummaryDto {
    // Validate and parse creditScore
    if (!creditScore) {
      throw new BadRequestException('creditScore query parameter is required');
    }

    const parsedScore = parseInt(creditScore, 10);
    if (isNaN(parsedScore) || parsedScore < 0) {
      throw new BadRequestException(
        'creditScore must be a valid non-negative number',
      );
    }

    if (!applicantId) {
      throw new NotFoundException('applicantId query parameter is required');
    }

    return this.loanService.getEligibilitySummary(applicantId, parsedScore);
  }
}