export type JournalEntryType = {
  id: string,
  createdAt: Date,
  content: string,
  // analysis: AnalysisTypeType,
}

export type AnalysisType = {
  entryId: string,
  mood: string,
  summary: string,
  colour: string,
  negative: boolean
  subject: string,
}
