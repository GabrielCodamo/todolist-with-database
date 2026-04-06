"use server"

import { prisma } from "../../../lib/prisma"


export async function getTaskItem() {

    /**
   * Compara a dueDate (prazo) com a data atual.
   * Retorna true se o prazo já passou ou é hoje.
   */
    function isLate(dueDate: Date): boolean {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Zera horário do dia atual

        const due = new Date(dueDate) // Cria cópia para não mutar o objeto original
        due.setHours(0, 0, 0, 0)    // Zera horário do prazo

        return due <= today // dueDate anterior ou igual a hoje = LATE
    }

    try {
        // Busca todas as tasks com a dueDate do banco
        const tasks = await prisma.task.findMany({
            orderBy: {
                taskName: "asc"
            },
            select: {
                taskName: true,
                category: true,
                dueDate: true,
                id: true,
                status: true,
                createdAt: true
            }
        })


        // CORREÇÃO: Filtra tasks que venceram E que NÃO estão completas
        const lateTasks = tasks.filter((task) =>
            isLate(task.dueDate) && // Filtra as tasks onde dueDate (prazo) já passou ou é hoje
            task.status !== "COMPLETED" &&
            task.status !== "LATE"
        )

        const lateTaskIds = lateTasks.map((task) => task.id)

        if (lateTaskIds.length > 0) {
            // Atualiza no banco de uma vez só
            await prisma.task.updateMany({
                where: { id: { in: lateTaskIds } },
                data: { status: "LATE" }
            })

            // Atualiza o array em memória para o frontend refletir a mudança
            tasks.forEach(task => {
                if (lateTaskIds.includes(task.id)) {
                    task.status = "LATE"
                }
            })
        }

        return {
            tasks
        }


    } catch (error) {
        return {
            error: `Não foi possível obter os dados ${error}`
        }
    }
}