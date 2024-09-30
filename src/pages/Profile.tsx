import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MdOutlineStar } from 'react-icons/md';
import ImgProfile from '../assets/images/img-profile.png';

const Profile: React.FC = () => {
	const tags = ['#art&print', '#photography', '#design', '#illustration', '#handmade', '#crafts', '#creative'];

	const stars = Array.from({ length: 5 }, (_, index) => index);

	return (
		<div className='flex flex-col w-full max-w-4xl gap-4 p-4'>
			<h3 className='text-lg font-bold'>Your tags</h3>
			<div className='flex flex-wrap items-center gap-2'>
				{tags.map((tag, index) => (
					<Button key={index} variant='ghost' className='border-2 rounded-full border-[#FFCA66]'>
						{tag}
					</Button>
				))}
			</div>
			<input
				type='text'
				placeholder='Post your event'
				className='pl-5 pr-3 py-2 border border-button-color rounded-full w-full bg-transparent focus:outline-none placeholder:text-[#D1B186]'
			/>
			<h3 className='text-lg font-bold'>Your posts: 36</h3>
			<Card className='overflow-hidden bg-transparent border rounded-3xl border-button-color'>
				<CardContent className='p-6'>
					<div className='flex flex-col gap-5 md:flex-row'>
						<div className='flex flex-col w-full gap-2 md:w-1/3'>
							<img
								src={ImgProfile}
								alt='Tet Market'
								className='object-cover rounded-md size-32 md:w-full md:h-auto'
							/>
							<span className='text-xl font-semibold uppercase text-button-color'>LÔ CỒ LOVE MARKET</span>
						</div>
						<div className='flex flex-col w-full gap-4 md:w-2/3'>
							<h3 className='text-lg font-semibold'>locoartmarket</h3>
							<p className='text-sm md:text-base'>
								Sẽ là một trong những kỉ niệm tuyệt vời nhất trong năm 2024. Cảm giác được hòa cùng mọi
								người ngân vang những lời ca đẹp đẽ, cũng là khoảnh khắc sự vui sướng chạm đến tâm hồn.
								Cảm ơn một concert Cam Gala thật đẹp!
							</p>
							<span className='text-lg font-semibold'>Care: 208</span>
							<div className='flex items-center gap-1 font-semibold'>
								<span className='text-lg'>Rating:</span>
								{stars.map((_, index) => (
									<MdOutlineStar key={index} className='text-lg text-button-color' />
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Profile;
