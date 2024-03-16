import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        const { id } = params
        const searchParams = req.nextUrl.searchParams
        const noteId = searchParams.get("noteid")
        const note = await prisma.note.findFirst({
            where: {
                id: noteId,
                userId: id
            },
            select: {
                id:true,
                note: true
            }
        })
        if (!note) {
            return NextResponse.json({ message: "No note found" }, { status: 404 })
        }
        return NextResponse.json({ data: note }, { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}