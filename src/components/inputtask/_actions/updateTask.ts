"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "../../../../generated/prisma/client"
export type task = Prisma.TaskModel["status"]

interface updateTaskProps {
    chave: string
    category: string
    taskName: string
    dueDate: Date
    status: task
}

export async function updateTask({ chave, category, taskName, dueDate, status }: updateTaskProps) {

    try {
        await prisma.task.update({
            where: {
                id: chave
            },
            data: {
                taskName,
                category,
                dueDate,
                status
            }
        })

        return {
            data: "Tarefa Atualizado com sucesso"
        }
    } catch (error) {
        console.error("Erro ao atualizar a tarefa: ", error)
    }

}