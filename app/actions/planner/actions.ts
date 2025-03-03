"use server";

import db from "@/lib/db";

interface Props {
    id: string;
    title: string;
    courseId: number;
    teacherId: number;
}

export async function createReflection({ id, title, courseId, teacherId }: Props) {
    const createdReflection = await db.reflection.create({
        data: {
            id: id,
            title: title,
            courseId: courseId,
            teacherId: teacherId,
          },
    });

    return createdReflection;
}
