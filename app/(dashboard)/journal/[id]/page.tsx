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
    },
    include: {
      analysis: true
    }
  })

  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)
  
  return (
    <div className="w-full h-full">
      <Editor entry={entry}/> 
    </div>
  )
}

export default EntryPage