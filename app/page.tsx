import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import Root from './components/root';
import { prismaLoadUserPlanner } from './actions/planner/loadPlanner';
import { Year } from './types';

export default async function Home() {
  const user = await currentUser();
  let years: Year[] | undefined = undefined; // Initialize as undefined instead of null
  let userId: string | undefined = undefined;

  if (user) {
    // First find or create the user
    let loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });
    
    if (!loggedInUser) {
      loggedInUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          username: user.emailAddresses[0].emailAddress.split('@')[0]
        },
      });
    }
    
    // Load the planner
    const planner = await prismaLoadUserPlanner(loggedInUser.id);
    
    // Extract just the years array from the planner
    years = planner?.years;
    userId = loggedInUser.id;
  }

  return (
    <div>
      <Root loadedPlanner={years} userId={userId} />
    </div>
  );
}