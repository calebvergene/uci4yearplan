import db from "@/lib/db";

export async function prismaLoadUserPlanner(userId: string) {
  // fetch the planner with all related data
  const userPlanner = await db.planner.findUnique({
    where: { userId: userId },
    include: {
      years: {
        include: {
          quarters: true
        },
        orderBy: {
          yearNumber: 'asc'
        }
      }
    }
  });
  
  if (!userPlanner) {
    return;
  }
  
  return userPlanner;
}