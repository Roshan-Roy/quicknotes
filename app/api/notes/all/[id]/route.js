import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const GET = async (_, { params }) => {
    try {
        const { id } = params
        const notes = await prisma.note.findMany({
            where: {
                userId: id
            },
            select: {
                id:true,
                note:true
            }
        })
        return NextResponse.json({ data: notes }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ message: "An Error occurred" }, { status: 500 })
    }
}