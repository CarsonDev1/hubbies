import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { RiFilter2Line } from 'react-icons/ri';
import CardLast from '../components/CardLast/CardLast';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
	const data = {
		labels: ['XS', '', 'M', '', 'S', ''],
		datasets: [
			{
				label: 'Feedback',
				backgroundColor: ['#FFD583', '#944B08', '#442101'],
				borderColor: '#000',
				borderWidth: 2,
				data: [200, 0, 50, 0, 50, 0],
				borderRadius: 10,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<div className='w-full p-4'>
			<div className='flex gap-4'>
				<div className='w-2/3'>
					<h3 className='text-[#4C4C4C] text-xl font-bold mb-4'>In the last 30 days,</h3>
					<CardLast />
					<div className='p-4 bg-white rounded-lg shadow'>
						<h2 className='mb-4 text-lg font-semibold'>Feedback</h2>
						<div className='flex items-center justify-between'>
							<Bar data={data} options={options} />
							<div className='flex flex-col items-end ml-4'>
								{data.labels.map((label, index) => (
									<button
										key={label}
										className={`w-8 h-8 rounded-full mb-2`}
										style={{
											backgroundColor: data.datasets[0].backgroundColor[index],
											border: '2px solid #000',
										}}
									>
										<span className='sr-only'>{label}</span>
									</button>
								))}
							</div>
						</div>
					</div>

					<div className='flex items-center col-span-1 p-4 bg-white rounded-lg shadow md:col-span-2 lg:col-span-3'>
						<input
							type='text'
							placeholder='Filter...'
							className='w-full p-2 border rounded-full border-button-color text-button-color placeholder:text-button-color focus:outline-none focus:ring-0'
						/>
						<button className='flex items-center px-4 py-2 ml-2 text-white bg-blue-500 rounded-full'>
							<RiFilter2Line className='mr-2' />
							Filter
						</button>
					</div>

					<div className='col-span-1 p-4 bg-white rounded-lg shadow md:col-span-2 lg:col-span-3'>
						<h2 className='mb-4 text-lg font-semibold'>Data Table</h2>
						<table className='min-w-full border border-gray-300'>
							<thead>
								<tr className='bg-gray-200'>
									<th className='p-2 border border-gray-300'>Item</th>
									<th className='p-2 border border-gray-300'>Quantity</th>
									<th className='p-2 border border-gray-300'>Price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='p-2 border border-gray-300'>Item 1</td>
									<td className='p-2 border border-gray-300'>10</td>
									<td className='p-2 border border-gray-300'>$100</td>
								</tr>
								<tr>
									<td className='p-2 border border-gray-300'>Item 2</td>
									<td className='p-2 border border-gray-300'>5</td>
									<td className='p-2 border border-gray-300'>$50</td>
								</tr>
								<tr>
									<td className='p-2 border border-gray-300'>Item 3</td>
									<td className='p-2 border border-gray-300'>2</td>
									<td className='p-2 border border-gray-300'>$20</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className='w-1/3 p-4 bg-white rounded-lg shadow'>
					<h2 className='mb-4 text-lg font-semibold'>Feedback</h2>
					<div className='flex items-center justify-between'>
						<Bar data={data} options={options} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
