import { Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
	{ name: 'XS', feedback: 75, participants: 0, views: 0 },
	{ name: 'S', feedback: 0, participants: 125, views: 0 },
	{ name: 'M', feedback: 0, participants: 0, views: 175 },
];

export default function Component() {
	return (
		<div className='flex'>
			<main className='flex-1 p-4 overflow-auto'>
				<div className='flex flex-col gap-6 lg:flex-row'>
					<div className='space-y-6 lg:w-3/4'>
						{/* All Events */}
						<section>
							<h2 className='mb-4 text-2xl font-bold'>All Events</h2>
							<div className='flex items-center justify-between mb-4'>
								<input
									type='text'
									placeholder='Search events'
									className='py-2 px-4 rounded-full border border-[#d5c4a1] bg-[#f2e5bc]'
								/>
								<button className='flex items-center bg-[#f2e5bc] py-2 px-4 rounded-full'>
									<Filter className='mr-2' /> Filter
								</button>
							</div>
							<div className='overflow-x-auto'>
								<table className='w-full bg-[#f2e5bc] rounded-lg'>
									<thead className='bg-[#504945] text-white'>
										<tr>
											<th className='px-4 py-2 text-left'>EID</th>
											<th className='px-4 py-2 text-left'>HID</th>
											<th className='px-4 py-2 text-left'>EventName</th>
											<th className='px-4 py-2 text-left'>TotalCare</th>
											<th className='px-4 py-2 text-left'>TotalJoin</th>
											<th className='px-4 py-2 text-left'>Tag</th>
											<th className='px-4 py-2 text-left'>TotalFeedback</th>
											<th className='px-4 py-2 text-left'>Date</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className='px-4 py-2'>00001</td>
											<td className='px-4 py-2'>00008</td>
											<td className='px-4 py-2'>Local Market</td>
											<td className='px-4 py-2'>120</td>
											<td className='px-4 py-2'>100</td>
											<td className='px-4 py-2'>Tag1, Tag2...</td>
											<td className='px-4 py-2'>80</td>
											<td className='px-4 py-2'>18/10/2024</td>
										</tr>
										<tr>
											<td className='px-4 py-2'>00002</td>
											<td className='px-4 py-2'>00008</td>
											<td className='px-4 py-2'>Drawing</td>
											<td className='px-4 py-2'>80</td>
											<td className='px-4 py-2'>65</td>
											<td className='px-4 py-2'>Tag1, Tag2...</td>
											<td className='px-4 py-2'>55</td>
											<td className='px-4 py-2'>7/6/2024</td>
										</tr>
										<tr>
											<td className='px-4 py-2'>00003</td>
											<td className='px-4 py-2'>00010</td>
											<td className='px-4 py-2'>Photograph</td>
											<td className='px-4 py-2'>70</td>
											<td className='px-4 py-2'>55</td>
											<td className='px-4 py-2'>Tag1, Tag2...</td>
											<td className='px-4 py-2'>50</td>
											<td className='px-4 py-2'>22/2/2024</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>

						{/* All Feedback */}
						<section>
							<h2 className='mb-4 text-2xl font-bold'>All Feedback</h2>
							<div className='flex items-center justify-between mb-4'>
								<input
									type='text'
									placeholder='Search feedbacks'
									className='py-2 px-4 rounded-full border border-[#d5c4a1] bg-[#f2e5bc]'
								/>
								<button className='flex items-center bg-[#f2e5bc] py-2 px-4 rounded-full'>
									<Filter className='mr-2' /> Filter
								</button>
							</div>
							<div className='overflow-x-auto'>
								<table className='w-full bg-[#f2e5bc] rounded-lg'>
									<thead className='bg-[#504945] text-white'>
										<tr>
											<th className='px-4 py-2 text-left'>EID</th>
											<th className='px-4 py-2 text-left'>No.Feedbacks</th>
											<th className='px-4 py-2 text-left'>Feedbacks</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className='px-4 py-2'>00008</td>
											<td className='px-4 py-2'>1</td>
											<td className='px-4 py-2'>
												Lorem ipsum is simply dummy text of the printing and typesetting
												industry. Lorem ipsum has been the industry's standard dummy text ever
												since the 1500s.
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2'>00008</td>
											<td className='px-4 py-2'>2</td>
											<td className='px-4 py-2'>
												Lorem ipsum is simply dummy text of the printing and typesetting
												industry. Lorem ipsum has been the industry's standard dummy text ever
												since the 1500s.
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2'>00010</td>
											<td className='px-4 py-2'>1</td>
											<td className='px-4 py-2'>
												Lorem ipsum is simply dummy text of the printing and typesetting
												industry. Lorem ipsum has been the industry's standard dummy text ever
												since the 1500s.
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>

						{/* Visualizations */}
						<section>
							<h2 className='mb-4 text-2xl font-bold'>Visualizations</h2>
							<div className='flex items-center justify-between mb-4'>
								<input
									type='text'
									placeholder='Search events'
									className='py-2 px-4 rounded-full border border-[#d5c4a1] bg-[#f2e5bc]'
								/>
								<button className='flex items-center bg-[#f2e5bc] py-2 px-4 rounded-full'>
									<Filter className='mr-2' /> Filter
								</button>
							</div>
							<div className='bg-[#f2e5bc] p-4 rounded-lg'>
								<h3 className='mb-2 font-semibold'>Event Id: 00001 - Name: Local market</h3>
								<ResponsiveContainer width='100%' height={300}>
									<BarChart data={data}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' />
										<YAxis />
										<Tooltip />
										<Bar dataKey='feedback' fill='#ffd700' name='Total feedback' />
										<Bar dataKey='participants' fill='#8b4513' name='Total participants' />
										<Bar dataKey='views' fill='#4b0082' name='Total views' />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</section>
					</div>

					{/* Right Sidebar */}
					<div className='space-y-6 lg:w-1/4'>
						<section>
							<h2 className='mb-4 text-2xl font-bold'>All event visualizations</h2>
							<ResponsiveContainer width='100%' height={200}>
								<BarChart data={data}>
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Bar dataKey='feedback' fill='#ffd700' name='Total feedback' />
									<Bar dataKey='participants' fill='#8b4513' name='Total participants' />
									<Bar dataKey='views' fill='#4b0082' name='Total views' />
								</BarChart>
							</ResponsiveContainer>
						</section>

						<section>
							<h2 className='mb-4 text-2xl font-bold'>Most famous event</h2>
							<div className='space-y-2'>
								<div className='flex items-center bg-[#f2e5bc] p-2 rounded-lg'>
									<div className='w-10 h-10 mr-4 bg-purple-500 rounded-full'></div>
									<div>
										<p className='font-semibold'>Flotsam</p>
										<p className='text-sm'>400+ participants 400+ views</p>
									</div>
								</div>
								<div className='flex items-center bg-[#f2e5bc] p-2 rounded-lg'>
									<div className='w-10 h-10 mr-4 bg-blue-500 rounded-full'></div>
									<div>
										<p className='font-semibold'>Astrom</p>
										<p className='text-sm'>420+ participants 404+ views</p>
									</div>
								</div>
								<div className='flex items-center bg-[#f2e5bc] p-2 rounded-lg'>
									<div className='w-10 h-10 mr-4 bg-gray-500 rounded-full'></div>
									<div>
										<p className='font-semibold'>Shoom</p>
										<p className='text-sm'>450+ participants 540+ views</p>
									</div>
								</div>
							</div>
							<button className='w-full bg-[#d65d0e] text-white py-2 px-4 rounded-lg mt-4'>
								View all events
							</button>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}
