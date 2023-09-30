import { analyse } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      content
    }
  })

  const analysis = await analyse(updatedEntry.content)
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis!
    },
    update: {...analysis}
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: {...updatedEntry, analysis: updatedAnalysis} })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const user = await getUserByClerkId()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: { id: params.id } })
}
