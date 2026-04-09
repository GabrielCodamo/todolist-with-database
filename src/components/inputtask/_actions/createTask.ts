"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "../../../../generated/prisma/client"
import { normalizeTaskField } from "@/utils/normalizeTaskField"

export type task = Prisma.TaskModel["status"]

interface createTaskProps {
    nameTask: string
    status: task
    category: string
    dueDate: Date
}

export async function createTask(data: createTaskProps) {
    if (!data) {
        return {
            error: "erro ausência de Dados"
        }
    }

    try {
        const modifyNameTask = normalizeTaskField(data.nameTask)
        const modifyCategoryTask = normalizeTaskField(data.category)
        await prisma.task.create({
            data: {
                taskName: modifyNameTask,
                dueDate: data.dueDate,
                category: modifyCategoryTask,
                status: data.status
            }
        })

        return {
            data: "Tarefa salva com sucesso"
        }
    } catch {
        return {
            error: "Erro ao enviar dados"
        }
    }
}
