
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Predicts project budget and completion risks based on BOQ and current progress.
   */
  async predictProjectTrajectory(projectData: any) {
    const prompt = `Act as a Master Construction Auditor. 
    Analyze this ERP Project Data: ${JSON.stringify(projectData)}
    
    TASKS:
    1. Calculate Estimated at Completion (EAC) vs Planned Budget.
    2. Identify probability of delay based on current velocity.
    3. Suggest 3 specific mitigation strategies for the Project Manager.
    
    Format as a structured professional advisory report.`;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the ILLUMINATI PREDICTOR engine. Use construction industry standards (PMBOK/EVM) for all calculations. Be sharp and strategic.",
          temperature: 0.2, // Keep it precise
        }
      });
      return response.text;
    } catch (error) {
      console.error("AI Prediction Error:", error);
      return "Critical failure in AI prediction engine. Check connectivity.";
    }
  }

  /**
   * Scans financial records for anomalies, fraud, or rate deviations.
   */
  async detectFinancialAnomalies(invoices: any[], accounts: any[]) {
    const prompt = `Scan these financial records for anomalies:
    Invoices: ${JSON.stringify(invoices)}
    Accounts: ${JSON.stringify(accounts)}
    
    Look for:
    - Rate spikes (prices 20% higher than category average)
    - Duplicate payment risks
    - Unusual ledger patterns
    
    Highlight specific IDs that need human review.`;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are the ILLUMINATI SENTINEL. Your goal is to detect financial leakage and ensure fiscal discipline.",
        }
      });
      return response.text;
    } catch (error) {
      return "Anomaly detection failed. Manual audit recommended.";
    }
  }

  /**
   * Generates a comprehensive executive summary for the CEO.
   */
  async generateExecutiveSummary(allData: any) {
    const prompt = `Generate a high-level executive report for the CEO based on: ${JSON.stringify(allData)}.
    Include:
    - Overall Portfolio Health
    - Cash Runway Status
    - Critical Resource Blockers
    - Strategic Recommendation for next month.
    
    Use professional business language and Markdown formatting.`;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      return "Failed to synthesize executive report.";
    }
  }

  /**
   * Context-aware chatbot for general ERP assistance.
   */
  async chatWithAssistant(history: any[], message: string) {
    try {
      const chat = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are ILLUMINATI GENIUS, the intelligent core of the ERP. You help users navigate the system, explain complex project metrics, and perform basic data retrieval tasks."
        }
      });
      const response = await chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      return "I'm sorry, my neural core is temporarily unresponsive.";
    }
  }
}

export const geminiService = new GeminiService();
