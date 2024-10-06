import { Camera } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MdClose } from 'react-icons/md';
import { Textarea } from '../components/ui/textarea';
import Avt from '../assets/images/avt.png';
import { ChangeEvent, useState } from 'react';
import { Input } from '../components/ui/input';

interface CreatePostProps {
	onClose: () => void;
}

export default function CreatePost({ onClose }: CreatePostProps) {
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setFileName(file ? file.name : null);
	};
	return (
		<div className='fixed inset-0 z-30 flex items-center justify-center px-2 bg-black bg-opacity-50'>
			<div className='relative w-full bg-white rounded-lg shadow-lg sm:w-3/4 md:w-2/4 xl:w-1/3'>
				<Card className='w-full shadow-lg bg-amber-50 rounded-3xl'>
					<CardHeader className='flex flex-row items-center gap-3 pb-2'>
						<img src={Avt} alt='avt' />
						<div className='flex flex-col gap-1'>
							<div className='flex items-center gap-1'>
								<span className='px-3 py-1 text-xs font-semibold text-white rounded-full bg-button-color'>
									Host
								</span>
								<h2 className='text-lg font-semibold'>Chika_pottery</h2>
							</div>
							<p className='px-3 py-1 w-fit rounded-full text-sm bg-[#FFCA66] text-[#944B08]'>
								#add your hashtag
							</p>
						</div>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								className='rounded-full bg-amber-100 border-amber-200 text-amber-900 hover:bg-amber-200 hover:text-amber-950'
							>
								#workshop
							</Button>
							<Button
								variant='outline'
								className='rounded-full bg-amber-100 border-amber-200 text-amber-900 hover:bg-amber-200 hover:text-amber-950'
							>
								#DIY_pottery
							</Button>
							<Button
								variant='outline'
								className='rounded-full bg-amber-100 border-amber-200 text-amber-900 hover:bg-amber-200 hover:text-amber-950'
							>
								#pottery
							</Button>
						</div>
						<div className='relative flex items-center justify-center p-8 border-2 rounded-lg bg-amber-100 border-button-color'>
							<Input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
							/>
							<div className='text-center'>
								{fileName ? (
									<p className='text-amber-900'>{fileName}</p>
								) : (
									<p className='relative p-3 rounded-full text-amber-900 w-fit bg-[#FFCA66]'>
										<Camera className='w-6 h-6 text-amber-900' />
									</p>
								)}
							</div>
						</div>

						<div>
							<h3 className='mb-2 text-sm font-medium py-1 px-3 bg-[#FFCA66] w-fit rounded-full text-button-color'>
								Detail description
							</h3>
							<Textarea
								placeholder='Write about 50-200 characters to describe your workshop'
								className='border-2 bg-amber-100 border-button-color placeholder:text-button-color'
							/>
						</div>
					</CardContent>
					<CardFooter className='flex justify-end'>
						<Button className='flex w-full px-12 py-1 rounded-full md:w-fit bg-amber-900 hover:bg-amber-800 text-amber-50'>
							Upload
						</Button>
					</CardFooter>
				</Card>
				<Button onClick={onClose} className='absolute top-4 right-4 bg-amber-900'>
					<MdClose />
				</Button>
			</div>
		</div>
	);
}
