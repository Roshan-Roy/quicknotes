import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const POST = async (req, { params }) => {
    try {
        const { id } = params
        const { note } = await req.json()
        await prisma.note.create({
            data: {
                note,
                userId: id
            }
        })
        return NextResponse.json({ message: "Note Added" }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ message: "An error occurred" }, { status: 500 })
    }
}