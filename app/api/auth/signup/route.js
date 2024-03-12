import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export const POST = async (req) => {
    try {
        const { name, username, password } = await req.json()
        if (!name || !username || !password) {
            return NextResponse.json({ message: "Fill all fields" }, { status: "400" })
        }
        const existingUser = await prisma.cuser.findUnique({
            where: {
                username
            }
        })
        if (existingUser) {
            return NextResponse.json({ message: "Username already exists" }, { status: 409 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.cuser.create({
            data: {
                name,
                username,
                hashedPassword
            }
        })
        return NextResponse.json({ message: "Signup completed" }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ message: "An error occurred" }, { status: 500 })
    }
}