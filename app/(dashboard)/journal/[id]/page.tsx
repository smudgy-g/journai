import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

/**
 * To make sure that not anyone can look up anyone's journal entry, 
 * first get the user from Clerk and use the compound unique UserId & id 
 * on the journal entry as extra security
 */
const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id
      }
    }
  })

  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    {name: 'Summary', value: ''},
    {name: 'Subject', value: ''},
    {name: 'Mood', value: ''},
    {name: 'Negative', value: 'false'},
  ]

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry}/> 
      </div>
      <div className="border border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((data) => (
            <li key={data.name} className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10">
              <span className="text-lg font-semibold">{data.name}</span>
              <span>{data.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EntryPage