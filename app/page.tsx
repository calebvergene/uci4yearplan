import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import Root from './components/root';


export default async function Home() {

  const user = await currentUser();
  if (user) {


  const loggedInUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });
  if (!loggedInUser) {
    await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.emailAddresses[0].emailAddress.split('@')[0]
      },
    });
  }
}

  return (
    <div>
      <Root/>
    </div>
  );
}
