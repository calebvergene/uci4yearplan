import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from '@/components/ui/skeleton';

const AboutDialog = () => {
    const [showModal, setShowModal] = useState(false);

    // to open dialog when there is a new user
    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1000);
            localStorage.setItem('hasVisited', 'true');
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger className='focus:outline-none'>
                <Image
                    src="/uci4yearplanlogo.png"
                    width={40}
                    height={40}
                    alt="UCI 4 Year Plan Logo"
                />
            </DialogTrigger>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>About <span className=''>uci4yearplan.com</span></DialogTitle>
                    <DialogDescription className='py-0.5'>
                        Hey UCI students! Thanks for using my app. I built uci4yearplan to help students plan out their next 4 years at UCI. The app also visualizes course data to help students choose their classes wisley to maximize their GPA.
                    </DialogDescription>
                    <Suspense fallback={<Skeleton className='h-72'/>}></Suspense>
                    <video
                        poster={"/uci4yearplanthumb.png"}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="rounded-md object-cover w-full h-full transition-transform duration-500 ease-out"
                    >
                        <source src={"/uci4yearplan.mov"} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Suspense />
                    <DialogDescription className='pb-1.5 pt-4 flex justify-center'>
                        built by <a href="https://www.calebvergene.com/" className="pl-1 underline">caleb</a>. Found a bug? <a href="https://github.com/calebvergene/uci4yearplan/issues"><span className='underline pl-1'>Please let us know.</span></a>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AboutDialog