"use server"

import { prisma } from "@/lib/prisma"

export async function deleteTask(id: string) {
    if (!id) {
        // return NextResponse.json({ error: "Não foi possível obter os dados para efetuar a requisição" }, { status: 404 })
        return {
            error: "Não foi possível obter os dados para efetuar a requisição"
        }
    }

    try {
        await prisma.task.delete({
            where: {
                id
            }
        })
        return {
            sucess: "Tarefa deletada com sucesso"
        }

        // return NextResponse.json({ sucess: "Tarefa deletada com sucesso" }, { status: 204 })
    } catch (err) {
        return {
            error: `Não foi possível efetuar a exclusão da tarefa ${err}`
        }
        // return NextResponse.json({ error: `Não foi possível efetuar a exclusão da tarefa ${err}` })
    }

}