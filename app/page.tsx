import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import Root from './components/root';
import { prismaLoadUserPlanner } from './actions/planner/loadPlanner';
import { Year } from './types';

export default async function Home() {
  const user = await currentUser();
  let years: Year[] | undefined = undefined;
  let userId: string | undefined = undefined;

  if (user) {

    const loggedInUser = await db.user.upsert({
      where: { email: user.emailAddresses[0].emailAddress },
      update: {
        clerkUserId: user.id, // update clerkUserId if it changed
        username: user.emailAddresses[0].emailAddress.split('@')[0]
      },
      create: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.emailAddresses[0].emailAddress.split('@')[0]
      },
    });
    
    // load the planner
    const planner = await prismaLoadUserPlanner(loggedInUser.id);
    
    years = planner?.years;
    userId = loggedInUser.id;
  }

  return (
    <div>
      <Root loadedPlanner={years} userId={userId} />
    </div>
  );
}