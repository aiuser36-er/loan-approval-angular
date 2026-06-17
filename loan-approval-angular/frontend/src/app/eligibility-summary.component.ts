import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EligibilitySummary } from './loan.model';

/**
 * Standalone component for displaying applicant eligibility summary.
 * Accepts eligibility data and displays score-specific feedback.
 * Can be embedded in forms or used as a modal.
 */
@Component({
  selector: 'app-eligibility-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eligibility-summary.component.html',
  styleUrl: './eligibility-summary.component.scss',
})
export class EligibilitySummaryComponent {
  /**
   * The eligibility summary data to display.
   */
  @Input() eligibility: EligibilitySummary | null = null;
}
