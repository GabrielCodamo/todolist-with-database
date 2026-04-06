import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });

    try {
        const data = await prisma.task.findUnique({
            where: {
                id: id
            },
            select: {
                category: true,
                taskName: true,
                dueDate: true
            }
        })

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: `Erro interno ${err}` }, { status: 500 });
    }
}
