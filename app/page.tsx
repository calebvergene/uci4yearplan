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
    // first, need to find or create the user
    let loggedInUser = await db.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
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