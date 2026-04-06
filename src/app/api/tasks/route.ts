import { prisma } from "@/lib/prisma"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET() {

    try {
        const tasks = await prisma.task.findMany()

        const tasksCompleted = tasks.filter((task) => task.status === "COMPLETED")
        const tasksPending = tasks.filter((task) => task.status === "PENDING")
        const tasksLate = tasks.filter((task) => task.status === "LATE")

        // 2. ATUALIZA A LISTA (TaskItem)
        // O revalidatePath limpa o cache da página que usa Server Components + Prisma
        revalidatePath("/")

        // 3. ATUALIZA OS CARDS (TaskStats)
        // O revalidateTag limpa o cache do 'fetch' que você marcou com a tag 'tasks-stats'
        revalidateTag('tasks-stats', {})

        return NextResponse.json(
            {
                total: tasks,
                completed: tasksCompleted,
                pending: tasksPending,
                late: tasksLate
            })
    } catch (err) {
        return NextResponse.json({ error: `Não foi possíver obter os dados ${err}` }, { status: 400 })
    }


} 