import { CVAnalysisResponse } from "@/types/api";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/analyze-cv`;

export class CVAnalyzerService {
  static async analyzeCV(
    file: File,
    jobRequirements: string = ""
  ): Promise<CVAnalysisResponse> {
    const formData = new FormData();
    formData.append("file", file);

    if (jobRequirements.trim()) {
      formData.append("job_requirements", jobRequirements);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }
}
