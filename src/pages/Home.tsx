import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import AvtContent01 from '../assets/images/avt-content-01.png';
import AvtContent02 from '../assets/images/avt-content-02.png';
import ImgContent01 from '../assets/images/image-content-01.png';
import ImgContent02 from '../assets/images/image-content-02.png';

const Home = () => {
	return (
		<div className='w-full px-2 md:px-6 lg:px-12 xl:w-3/5'>
			<div className='space-y-6'>
				<Card className='overflow-hidden bg-transparent border rounded-3xl border-button-color'>
					<CardContent className='p-4'>
						<div className='flex items-center mb-2'>
							<img src={AvtContent01} alt='User' width={40} height={40} className='mr-2 rounded-full' />
							<div>
								<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
								<p className='text-sm text-gray-500'>@localartmarket</p>
							</div>
						</div>
						<div className='flex flex-col gap-6'>
							<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
							<p className='w-8 h-[2px] bg-black'></p>
							<p className='mb-2 text-sm'>
								Trước cổng chợ làm em, LỊCH ĐỂ TẾT đã sẵng sàng rồi đó! Hãy đến chợ Tết chúng tôi để sắm
								sửa những vật phẩm trang trí nhà cửa nhé các bạn!
							</p>
						</div>
						<img
							src={ImgContent01}
							alt='Tet Market'
							width={400}
							height={200}
							className='object-cover w-full h-auto mb-4 rounded-md md:mb-10 lg:mb-20'
						/>
						<div className='flex justify-end'>
							<Button
								variant='ghost'
								className='px-20 mb-2 text-sm text-white rounded-full md:mb-5 lg:mb-10 bg-button-color hover:bg-orange-500 hover:text-white'
							>
								DETAIL
							</Button>
						</div>
					</CardContent>
				</Card>
				<Card className='overflow-hidden bg-transparent border rounded-3xl border-button-color'>
					<CardContent className='p-4'>
						<div className='flex items-center mb-2'>
							<img src={AvtContent02} alt='User' width={40} height={40} className='mr-2 rounded-full' />
							<div>
								<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
								<p className='text-sm text-gray-500'>@localartmarket</p>
							</div>
						</div>
						<div className='flex flex-col gap-6'>
							<h3 className='font-semibold'>Local Tet Art Market 2024</h3>
							<p className='w-8 h-[2px] bg-black'></p>
							<p className='mb-2 text-sm'>
								Trước cổng chợ làm em, LỊCH ĐỂ TẾT đã sẵng sàng rồi đó! Hãy đến chợ Tết chúng tôi để sắm
								sửa những vật phẩm trang trí nhà cửa nhé các bạn!
							</p>
						</div>
						<img
							src={ImgContent02}
							alt='Tet Market'
							width={400}
							height={200}
							className='object-cover w-full h-auto mb-4 rounded-md md:mb-10 lg:mb-20'
						/>
						<div className='flex justify-end'>
							<Button
								variant='ghost'
								className='px-20 mb-2 text-sm text-white rounded-full md:mb-5 lg:mb-10 bg-button-color hover:bg-orange-500 hover:text-white'
							>
								DETAIL
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Home;
