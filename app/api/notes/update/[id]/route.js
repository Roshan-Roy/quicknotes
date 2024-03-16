import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const PATCH = async (req, { params }) => {
    try {
        const { id } = params
        const searchParams = req.nextUrl.searchParams
        const noteId = searchParams.get("noteid")
        const { data } = await req.json()
        await prisma.note.update({
            where: {
                id: noteId,
                userId: id
            },
            data: {
                note: data
            }
        })
        return NextResponse.json({ message: "Note updated" }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ message: "An error occurred" }, { status: 500 })
    }
}