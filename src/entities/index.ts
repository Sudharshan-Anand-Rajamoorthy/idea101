/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: startupideasevaluations
 * Interface for StartupIdeaEvaluations
 */
export interface StartupIdeaEvaluations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  ideaTitle?: string;
  /** @wixFieldType text */
  ideaDescription?: string;
  /** @wixFieldType number */
  noveltyScore?: number;
  /** @wixFieldType number */
  marketPotentialScore?: number;
  /** @wixFieldType number */
  technicalDifficultyScore?: number;
  /** @wixFieldType number */
  userFitScore?: number;
  /** @wixFieldType text */
  evaluationSummary?: string;
  /** @wixFieldType datetime */
  submissionTimestamp?: Date | string;
}
