"use server";

import { Year } from "@/app/types";
import db from "@/lib/db";

interface Props {
    years: Year[];
    userId: string;  // User ID to identify their planner
}

export async function prismaUpdatePlanner({ years, userId }: Props) {
    // First, find the planner associated with this user
    const userPlanner = await db.planner.findUnique({
        where: { userId: userId }
    });
    
    if (!userPlanner) {
        // Create a new planner for this user if none exists
        return await db.planner.create({
            data: {
                userId: userId,
                years: {
                    create: years.map(year => ({
                        yearNumber: year.id,
                        quarters: {
                            create: year.quarters.map(quarter => ({
                                name: quarter.id,
                                courses: quarter.courses
                            }))
                        }
                    }))
                }
            }
        });
    } else {
        // First delete all existing years
        await db.year.deleteMany({
            where: { plannerId: userPlanner.id }
        });
        
        // Then create new years
        return await db.planner.update({
            where: { id: userPlanner.id },
            data: {
                years: {
                    create: years.map(year => ({
                        yearNumber: year.id,
                        quarters: {
                            create: year.quarters.map(quarter => ({
                                name: quarter.id,
                                courses: quarter.courses
                            }))
                        }
                    }))
                }
            }
        });
    }
}
