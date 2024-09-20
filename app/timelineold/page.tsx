import { Metadata } from 'next';
import React from 'react';
import Timeline from "./components";
// @ts-ignore
import prisma from "@/prisma/prisma";
import {getSession} from "next-auth/react";

export const metadata: Metadata = {
    title: 'Calendar',
};

const Calendar = async () => {
    // @ts-ignore
    const session = await getSession()
    console.log("session", session)
    // @ts-ignore
    const data = await prisma.nhatky.findMany({
        where: {
            user: session?.user?.username
        },
        include: {
            congviecObject: true
        }
    }) || []
    // console.log('nk', data)
    return <Timeline data={data} />;
};

export default Calendar;
