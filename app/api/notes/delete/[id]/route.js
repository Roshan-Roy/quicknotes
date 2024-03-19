import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const DELETE = async (req, { params }) => {
    try {
        const { id } = params
        const searchParams = req.nextUrl.searchParams
        const noteId = searchParams.get("noteid")
        await prisma.note.delete({
            where: {
                id: noteId,
                userId: id
            }
        })
        return NextResponse.json({ message: "Note deleted" }, { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "An error occurred" }, { status: 500 })
    }
}