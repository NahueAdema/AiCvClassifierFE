export interface CVAnalysisResponse {
  predicted_class: string;
  confidence: number;
  probabilities?: {
    "No Apto": number;
    Revisar: number;
    Apto: number;
  };
  cv_score: number;
  cv_info: {
    email: string | null;
    phone: string | null;
    skills: string[];
    experience_years: number;
    education: string;
  };
  text_preview: string;
  validation_stage: string;
  initial_validation: string;
  tech_score: number;
  detailed_analysis: {
    title: string;
    category: string;
    confidence_score: number;
    technical_score: number;
    executive_summary: string;
    strengths_analysis: {
      technical_skills: {
        count: number;
        top_skills: string[];
        comments: string[];
      };
      experience: {
        years: number;
        level: string;
        assessment: string;
      };
      education: {
        level: string;
        relevance: string;
      };
    };
    areas_for_improvement: string[];
    technical_breakdown: {
      skills_analysis: {
        total_skills: number;
        tech_skills_ratio: number;
        skill_diversity: string;
      };
      experience_quality: {
        years: number;
        assessment: string;
      };
      completeness_score: number;
      red_flags: string[];
    };
    recommendations: {
      priority: string;
      action: string;
      reason: string;
    }[];
    next_steps: string[];
    detailed_assessment: string;
  };
  analysis: CVAnalysisResponse["detailed_analysis"];
  filename: string;
  file_size_kb: number;
  processed_at: string;
}
