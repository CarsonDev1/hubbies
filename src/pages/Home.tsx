import { Suspense } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import AvtContent01 from '../assets/images/avt-content-01.png';
import AvtContent02 from '../assets/images/avt-content-02.png';
import ImgContent01 from '../assets/images/image-content-01.png';
import ImgContent02 from '../assets/images/image-content-02.png';
import { useState } from 'react';
import { LuMap } from 'react-icons/lu';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

const Home = () => {
	const [selectedDate, setSelectedDate] = useState(18);
	const [highlightedDate] = useState(12);

	const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	const dates = Array.from({ length: 31 }, (_, i) => i + 1);

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<div className='flex flex-col gap-4 md:flex-row'>
				<div className='w-full md:w-2/3 px-2 md:px-6 lg:px-8 xl:w-[65%]'>
					<div className='space-y-6'>
						{/* Content Cards */}
						<Card className='overflow-hidden bg-transparent border rounded-3xl border-button-color'>
							<CardContent className='p-4'>
								<div className='flex items-center mb-2'>
									<img
										src={AvtContent01}
										alt='User'
										width={40}
										height={40}
										className='mr-2 rounded-full'
									/>
									<div>
										<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
										<p className='text-sm text-gray-500'>@localartmarket</p>
									</div>
								</div>
								<div className='flex flex-col gap-6'>
									<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
									<p className='w-8 h-[2px] bg-black'></p>
									<p className='mb-2 text-sm'>
										Trước cổng chợ làm em, LỊCH ĐỂ TẾT đã sẵng sàng rồi đó! Hãy đến chợ Tết chúng
										tôi để sắm sửa những vật phẩm trang trí nhà cửa nhé các bạn!
									</p>
								</div>
								<img
									src={ImgContent01}
									alt='Tet Market'
									width={400}
									height={200}
									className='object-cover w-full h-auto mb-4 rounded-md md:mb-10 lg:mb-20'
								/>
								<div className='flex flex-row items-center justify-between gap-6 mb-5 md:flex-col xl:flex-row md:mb-10'>
									<div className='flex items-center gap-3'>
										<LuMap className='size-6' />
										<IoPaperPlaneOutline className='size-6' />
									</div>
									<div className='flex items-center gap-3'>
										<Button
											variant='ghost'
											className='px-3 text-sm text-white rounded-full md:px-10 xl:px-20 bg-button-color hover:bg-orange-500 hover:text-white'
										>
											DETAIL
										</Button>
										<Button
											variant='ghost'
											className='px-3 md:px-10 xl:px-20 text-sm rounded-full bg-[#FFD583] hover:bg-orange-500 hover:text-white'
										>
											ADD TO CART
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Second Content Card */}
						<Card className='overflow-hidden bg-transparent border rounded-3xl border-button-color'>
							<CardContent className='p-4'>
								<div className='flex items-center mb-2'>
									<img
										src={AvtContent02}
										alt='User'
										width={40}
										height={40}
										className='mr-2 rounded-full'
									/>
									<div>
										<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
										<p className='text-sm text-gray-500'>@localartmarket</p>
									</div>
								</div>
								<div className='flex flex-col gap-6'>
									<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
									<p className='w-8 h-[2px] bg-black'></p>
									<p className='mb-2 text-sm'>
										Trước cổng chợ làm em, LỊCH ĐỂ TẾT đã sẵng sàng rồi đó! Hãy đến chợ Tết chúng
										tôi để sắm sửa những vật phẩm trang trí nhà cửa nhé các bạn!
									</p>
								</div>
								<img
									src={ImgContent02}
									alt='Tet Market'
									width={400}
									height={200}
									className='object-cover w-full h-auto mb-4 rounded-md md:mb-10 lg:mb-20'
								/>
								<div className='flex flex-row items-center justify-between gap-6 mb-5 md:flex-col xl:flex-row md:mb-10'>
									<div className='flex items-center gap-3'>
										<LuMap className='size-6' />
										<IoPaperPlaneOutline className='size-6' />
									</div>
									<div className='flex items-center gap-3'>
										<Button
											variant='ghost'
											className='px-3 text-sm text-white rounded-full md:px-10 xl:px-20 bg-button-color hover:bg-orange-500 hover:text-white'
										>
											DETAIL
										</Button>
										<Button
											variant='ghost'
											className='px-3 md:px-10 xl:px-20 text-sm rounded-full bg-[#FFD583] hover:bg-orange-500 hover:text-white'
										>
											ADD TO CART
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Calendar Section */}
				<div className='p-4 font-sans h-fit bg-[#FFD583] rounded-xl w-full md:w-1/2 xl:w-1/4'>
					<h2 className='mb-4 text-xl font-bold'>January 2023</h2>
					<div className='grid grid-cols-7 gap-2 justify-items-center'>
						{days.map((day, index) => (
							<div key={day} className={`text-center font-medium ${index > 4 ? 'text-red-500' : ''}`}>
								{day}
							</div>
						))}
						{[...Array(dates[0] - 1)].map((_, index) => (
							<div key={`empty-${index}`} />
						))}
						{dates.map((date) => (
							<button
								key={date}
								className={`w-8 h-8 flex items-center justify-center rounded-full ${
									date === selectedDate
										? 'bg-amber-700 text-white'
										: date === highlightedDate
										? 'bg-gray-200'
										: ''
								} ${[7, 8, 14, 15, 21, 22, 28, 29].includes(date) ? 'text-red-500' : ''}`}
								onClick={() => setSelectedDate(date)}
							>
								{date}
							</button>
						))}
					</div>
				</div>
			</div>
		</Suspense>
	);
};

export default Home;
