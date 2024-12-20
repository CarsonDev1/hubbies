/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CardLast from '../components/CardLast/CardLast';
import { Filter } from 'lucide-react';
import { FiSearch } from 'react-icons/fi';
import FamousCard from '../components/FamousCard/FamousCard';
import Clock from '../components/Clock/Clock';

const data = [
	{ name: 'XS', totalFeedback: 70, totalParticipants: 70, totalViews: 70 },
	{ name: 'M', totalFeedback: 70, totalParticipants: 70, totalViews: 170 },
	{ name: 'S', totalFeedback: 120, totalParticipants: 70, totalViews: 70 },
];

// const CustomBar = (props: any) => {
// 	const { x, y, width, height, fill } = props;
// 	return <rect x={x} y={y} width={width} height={height} fill={fill} rx={20} ry={20} />;
// };

const CustomLegend = (props: any) => {
	const { payload } = props;
	return (
		<ul className='flex flex-col'>
			{payload.map((entry: any, index: number) => (
				<li key={`item-${index}`} className='flex items-center gap-2 mb-2'>
					<span className='inline-block w-4 h-4 rounded-full' style={{ backgroundColor: entry.color }}></span>
					<span>{entry.value}</span>
				</li>
			))}
		</ul>
	);
};

const CustomLegendRight = (props: any) => {
	const { payload } = props;
	return (
		<ul className='flex flex-col'>
			{payload.map((entry: any, index: number) => (
				<li key={`item-${index}`} className='flex items-center gap-2 mb-2'>
					<span className='inline-block w-4 h-4 rounded-full' style={{ backgroundColor: entry.color }}></span>
					<span>{entry.value}</span>
				</li>
			))}
		</ul>
	);
};

const Dashboard: React.FC = () => {
	return (
		<div className='w-full'>
			<div className='flex flex-col gap-6 xl:flex-row'>
				<div className='space-y-6 xl:w-3/4'>
					<h3 className='text-[#4C4C4C] text-xl font-bold mb-4'>In the last 30 days,</h3>
					<CardLast />
					<section>
						<div className='flex flex-col items-center justify-between gap-2 mb-4 md:flex-row md:mb-8 md:gap-0'>
							<div className='flex flex-col items-center gap-1 md:items-start'>
								<h2 className='text-xl font-bold md:text-4xl'>All Events</h2>
								<span className='text-sm md:text-base'>Monitor event informations, tags, etc.</span>
							</div>
							<div className='flex items-center gap-4'>
								<div className='relative flex items-center'>
									<FiSearch className='absolute left-4 text-[#8b8b8b]' />
									<input
										type='text'
										placeholder='Search events'
										className='pl-10 pr-4 py-2 rounded-full border border-[#d5c4a1] bg-transparent focus:outline-none'
									/>
								</div>
								<button className='flex items-center px-4 py-2 border rounded-lg border-slate-200'>
									<Filter className='mr-1' /> Filter
								</button>
							</div>
						</div>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='text-white rounded-tl-lg rounded-tr-lg bg-second-color'>
									<tr>
										<th className='px-4 py-2 text-left'>EID</th>
										<th className='px-4 py-2 text-left'>HID</th>
										<th className='px-4 py-2 text-left'>EventName</th>
										<th className='px-4 py-2 text-left'>Revenue</th>
										<th className='px-4 py-2 text-left'>TotalJoin</th>
										<th className='px-4 py-2 text-center'>Tag</th>
										<th className='px-4 py-2 text-left'>TotalFeedback</th>
										<th className='px-4 py-2 text-center'>Date</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='px-4 py-2'>00001</td>
										<td className='px-4 py-2'>00008</td>
										<td className='px-4 py-2'>Piano Steinway & Sons</td>
										<td className='px-4 py-2'>50,000 VND</td>
										<td className='px-4 py-2'>100</td>
										<td className='px-4 py-2'>Tag1, Tag2...</td>
										<td className='px-12 py-2'>80</td>
										<td className='px-4 py-2'>16/11/2024</td>
									</tr>
									<tr>
										<td className='px-4 py-2'>00002</td>
										<td className='px-4 py-2'>00008</td>
										<td className='px-4 py-2'>Gốm Sài Gòn</td>
										<td className='px-4 py-2'>450,000 VND</td>
										<td className='px-4 py-2'>65</td>
										<td className='px-4 py-2'>Tag1, Tag2...</td>
										<td className='px-12 py-2'>55</td>
										<td className='px-4 py-2'>11/7/2024</td>
									</tr>
									<tr>
										<td className='px-4 py-2'>00003</td>
										<td className='px-4 py-2'>00010</td>
										<td className='px-4 py-2'>Hien Concept</td>
										<td className='px-4 py-2'>450,000 VND</td>
										<td className='px-4 py-2'>55</td>
										<td className='px-4 py-2'>Tag1, Tag2...</td>
										<td className='px-12 py-2'>50</td>
										<td className='px-4 py-2'>11/8/2024</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>

					<section>
						<div className='flex flex-col items-center justify-between gap-2 mb-4 md:flex-row md:mb-8 md:gap-0'>
							<div className='flex flex-col items-center gap-1 md:items-start'>
								<h2 className='text-xl font-bold md:text-4xl'>All Events</h2>
								<span className='text-sm md:text-base'>Monitor event informations, tags, etc.</span>
							</div>
							<div className='flex items-center gap-4'>
								<div className='relative flex items-center'>
									<FiSearch className='absolute left-4 text-[#8b8b8b]' />
									<input
										type='text'
										placeholder='Search events'
										className='pl-10 pr-4 py-2 rounded-full border border-[#d5c4a1] bg-transparent focus:outline-none'
									/>
								</div>
								<button className='flex items-center px-4 py-2 border rounded-lg border-slate-200'>
									<Filter className='mr-1' /> Filter
								</button>
							</div>
						</div>
						<div className='overflow-x-auto'>
							<table className='w-full rounded-lg'>
								<thead className='text-white rounded-tl-lg rounded-tr-lg bg-second-color'>
									<tr>
										<th className='px-4 py-2 text-left'>EID</th>
										<th className='px-4 py-2 text-center'>No.Feedbacks</th>
										<th className='px-4 py-2 text-left'>Feedbacks</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='px-4 py-2'>00008</td>
										<td className='px-12 py-2'>1</td>
										<td className='px-4 py-2'>
											Lorem ipsum is simply dummy text of the printing and typesetting industry.
											Lorem ipsum has been the industry's standard dummy text ever since the
											1500s.
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2'>00008</td>
										<td className='px-12 py-2'>2</td>
										<td className='px-4 py-2'>
											Lorem ipsum is simply dummy text of the printing and typesetting industry.
											Lorem ipsum has been the industry's standard dummy text ever since the
											1500s.
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2'>00010</td>
										<td className='px-12 py-2'>1</td>
										<td className='px-4 py-2'>
											Lorem ipsum is simply dummy text of the printing and typesetting industry.
											Lorem ipsum has been the industry's standard dummy text ever since the
											1500s.
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>

					<section>
						<div className='flex flex-col items-center justify-between gap-2 mb-4 md:flex-row md:mb-8 md:gap-0'>
							<div className='flex flex-col items-center gap-1 md:items-start'>
								<h2 className='text-xl font-bold md:text-4xl'>All Events</h2>
								<span className='text-sm md:text-base'>Monitor event informations, tags, etc.</span>
							</div>
							<div className='flex items-center gap-4'>
								<div className='relative flex items-center'>
									<FiSearch className='absolute left-4 text-[#8b8b8b]' />
									<input
										type='text'
										placeholder='Search events'
										className='pl-10 pr-4 py-2 rounded-full border border-[#d5c4a1] bg-transparent focus:outline-none'
									/>
								</div>
								<button className='flex items-center px-4 py-2 border rounded-lg border-slate-200'>
									<Filter className='mr-1' /> Filter
								</button>
							</div>
						</div>

						<div className='w-full p-4 bg-[#fdf6e3] rounded-lg shadow'>
							<h2 className='text-xl font-semibold mb-4 text-[#3c3c3c]'>
								Event Id: 00001 - Name: Local market
							</h2>
							<ResponsiveContainer width='100%' height={400}>
								<BarChart data={data} margin={{ top: 10, right: 100, left: 0, bottom: 5 }}>
									<CartesianGrid strokeDasharray='3 3' stroke='#d0d0d0' />
									<XAxis dataKey='name' tickLine={false} axisLine={false} />
									<YAxis
										tickLine={false}
										axisLine={false}
										domain={[0, 200]}
										ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
									/>
									<Tooltip cursor={{ fill: 'transparent' }} />
									<Legend
										content={<CustomLegend />}
										verticalAlign='middle'
										align='right'
										layout='vertical'
										wrapperStyle={{ right: '0', paddingLeft: '30px', lineHeight: '40px' }}
									/>
									<Bar
										dataKey='totalFeedback'
										fill='#ffd700'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
									<Bar
										dataKey='totalParticipants'
										fill='#8b4513'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
									<Bar
										dataKey='totalViews'
										fill='#3e2723'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</section>

					<section>
						<div className='flex flex-col items-center justify-between gap-2 mb-4 md:flex-row md:mb-8 md:gap-0'>
							<div className='flex flex-col items-center gap-1 md:items-start'>
								<h2 className='text-xl font-bold md:text-4xl'>All Events</h2>
								<span className='text-sm md:text-base'>Monitor event informations, tags, etc.</span>
							</div>
							<div className='flex items-center gap-4'>
								<div className='relative flex items-center'>
									<FiSearch className='absolute left-4 text-[#8b8b8b]' />
									<input
										type='text'
										placeholder='Search events'
										className='pl-10 pr-4 py-2 rounded-full border border-[#d5c4a1] bg-transparent focus:outline-none'
									/>
								</div>
								<button className='flex items-center px-4 py-2 border rounded-lg border-slate-200'>
									<Filter className='mr-1' /> Filter
								</button>
							</div>
						</div>

						<div className='w-full p-4 bg-[#fdf6e3] rounded-lg shadow'>
							<h2 className='text-xl font-semibold mb-4 text-[#3c3c3c]'>
								Event Id: 00001 - Name: Local market
							</h2>
							<ResponsiveContainer width='100%' height={400}>
								<BarChart data={data} margin={{ top: 10, right: 100, left: 0, bottom: 5 }}>
									<CartesianGrid strokeDasharray='3 3' stroke='#d0d0d0' />
									<XAxis dataKey='name' tickLine={false} axisLine={false} />
									<YAxis
										tickLine={false}
										axisLine={false}
										domain={[0, 200]}
										ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
									/>
									<Tooltip cursor={{ fill: 'transparent' }} />
									<Legend
										content={<CustomLegend />}
										verticalAlign='middle'
										align='right'
										layout='vertical'
										wrapperStyle={{ right: '0', paddingLeft: '30px', lineHeight: '40px' }}
									/>
									<Bar
										dataKey='totalFeedback'
										fill='#ffd700'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
									<Bar
										dataKey='totalParticipants'
										fill='#8b4513'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
									<Bar
										dataKey='totalViews'
										fill='#3e2723'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</section>
				</div>
				<div className='space-y-6 xl:w-1/3'>
					<section>
						<div className='w-full p-4 bg-[#fdf6e3] rounded-lg shadow'>
							<h2 className='text-lg font-semibold mb-4 text-[#3c3c3c]'>
								Event Id: 00001 - Name: Local market
							</h2>
							<ResponsiveContainer width='100%' height={300}>
								<BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 5 }}>
									<CartesianGrid strokeDasharray='3 3' stroke='#d0d0d0' />
									<XAxis dataKey='name' tickLine={false} axisLine={false} />
									<YAxis
										tickLine={false}
										axisLine={false}
										domain={[0, 200]}
										ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
									/>
									<Tooltip cursor={{ fill: 'transparent' }} />
									<Legend
										content={<CustomLegendRight />}
										verticalAlign='bottom'
										align='center'
										layout='horizontal'
									/>
									<Bar
										dataKey='totalFeedback'
										fill='#ffd700'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
									<Bar
										dataKey='totalParticipants'
										fill='#8b4513'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
									<Bar
										dataKey='totalViews'
										fill='#3e2723'
										radius={[20, 20, 20, 20]}
										maxBarSize={40}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</section>
					<FamousCard />
					<Clock />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
