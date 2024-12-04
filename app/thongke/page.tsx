'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { findAll } from "@/app/timelineold/actions";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TimelinePage = () => {
    const [data, setData] = useState([]);
    const { data: session, status } = useSession();

    const fetchData = async () => {
        // const d = status === 'authenticated' && await findAll(session?.user?.username) || [];
        // setData(d);
    };

    useEffect(() => {
        fetchData();
    }, [session, status]);

    // Prepare chart data
    const chartData = {
        labels: data.map(item => item.date), // Assuming 'date' is your date field
        datasets: [
            {
                label: 'Chi	phí',
                data: data.map(item => item.chiphi), // Assuming 'cost' is your cost field
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader>
									<CardTitle>Thống kê chi phí</CardTitle>
							
								</CardHeader>
								<CardContent>
								<Line data={chartData} options={options} />

									</CardContent>
									</Card>
									</main>
        </div>        </div>

    );
};

export default TimelinePage;