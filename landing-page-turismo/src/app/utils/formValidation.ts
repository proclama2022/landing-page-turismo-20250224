import { z } from "zod";

export const InvestmentValidation = z.object({
  customInvestmentAmount: z.number()
    .min(62500, "L'importo minimo ammissibile è €62.500 (80% di €50.000)")
    .max(3500000, "L'importo massimo ammissibile è €3.500.000"),
  companySize: z.enum(['micro', 'piccola', 'media', 'grande'], {
    required_error: "Seleziona la dimensione aziendale"
  })
}).refine((data: {
  companySize: 'micro' | 'piccola' | 'media' | 'grande';
  customInvestmentAmount: number;
}) => {
  // Verifica combinata dimensione aziendale e importo
  if (data.companySize === 'grande') {
    if (data.customInvestmentAmount <= 300000) {
      throw new Error("Le grandi imprese non sono ammissibili al regime De Minimis (importi ≤ €300.000)");
    }
    return data.customInvestmentAmount <= 3500000;
  }
  return true;
}, {
  message: "Per grandi imprese l'importo deve essere compreso tra €300.001 e €3.500.000",
  path: ["customInvestmentAmount"]
});
