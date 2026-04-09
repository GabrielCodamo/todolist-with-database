"use server"
import { prisma } from "@/lib/prisma"

export async function mutationStatus(id: string) {

    if (!id) {
        return {
            error: "Tarefa não encontrada"
        }
    }

    try {
        await prisma.task.update({
            where: {
                id: id
            },
            data: {
                status: "COMPLETED"
            }
        })

        return {
            success: "Tarefa alterado para concluido"
        }
    } catch (error) {
        return console.log(error)
    }

}