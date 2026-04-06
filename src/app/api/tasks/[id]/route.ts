import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    { params }: { params: { chave: string } }
) {
    const chave = params.chave;

    if (!chave) {
        return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 });
    }

    try {
        const task = await prisma.task.findUnique({
            where: { id: chave },
            select: {
                category: true,
                taskName: true
            }
        });


        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: `Erro ao buscar tarefa ${error}` }, { status: 500 });
    }
}