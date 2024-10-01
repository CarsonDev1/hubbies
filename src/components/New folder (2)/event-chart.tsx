/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
	{ name: 'XS', feedback: 75, participants: 0, views: 0 },
	{ name: 'S', feedback: 0, participants: 120, views: 0 },
	{ name: 'M', feedback: 0, participants: 0, views: 170 },
];

export default function EventChart() {
	return (
		<div className='bg-[#f5e8c9] p-6 rounded-lg'>
			<h2 className='mb-4 text-xl font-semibold'>Event Id: 00001 - Name: Local market</h2>
			<ResponsiveContainer width='100%' height={400}>
				<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray='3 3' vertical={true} stroke='#d3d3d3' />
					<XAxis dataKey='name' axisLine={false} tickLine={false} />
					<YAxis
						axisLine={false}
						tickLine={false}
						ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
						// domain={[0, 200]}
					/>
					<Tooltip
						contentStyle={{ backgroundColor: '#f5e8c9', border: 'none' }}
						itemStyle={{ color: '#3c3836' }}
					/>
					<Legend
						verticalAlign='middle'
						align='right'
						layout='vertical'
						wrapperStyle={{ paddingLeft: '20px', borderRadius: '9999px' }}
					/>
					<Bar dataKey='feedback' fill='#ffd700' name='Total feedback' radius={[50, 50, 0, 0]} />
					<Bar dataKey='participants' fill='#8b4513' name='Total participants' radius={[50, 50, 0, 0]} />
					<Bar dataKey='views' fill='#4b0082' name='Total views' radius={[50, 50, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
