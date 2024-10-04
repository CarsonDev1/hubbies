import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import CartImage from '../assets/images/cart.png';

export default function Cart() {
	const [quantity, setQuantity] = useState(2);
	const ticketPrice = 580000;
	const total = quantity * ticketPrice;

	return (
		<div className='flex flex-col p-5 gap-9'>
			<h3 className='text-2xl font-bold text-center sm:text-left'>YOUR CART</h3>
			<Card className='max-w-5xl overflow-hidden bg-transparent border-2 border-button-color rounded-xl'>
				<CardContent className='flex flex-col gap-6 p-6 sm:flex-row'>
					<div className='flex flex-col w-full gap-4 sm:w-1/4'>
						<img
							src={CartImage}
							alt='Pottery hands'
							width={200}
							height={200}
							className='object-cover mx-auto rounded-lg'
						/>
						<h4 className='text-2xl font-bold text-center text-button-color sm:text-left'>
							POTTERY <br /> WORKSHOP
						</h4>
					</div>
					<div className='w-full sm:w-3/4'>
						<div className='flex flex-col gap-3'>
							<h2 className='mb-1 text-2xl font-bold text-center sm:text-left'>
								WORKSHOP LÀM GỐM THỦ CÔNG
							</h2>
							<p className='mb-1 text-xl text-center sm:text-left'>
								<span className='font-bold'>Host by:</span> Chika Pottery
							</p>
							<p className='text-xl font-bold text-center sm:text-left'>
								Ticket Price:{' '}
								<span className='text-button-color'>{ticketPrice.toLocaleString()} VND</span>
							</p>
							<div className='h-[2px] bg-button-color w-2/3 mx-auto sm:mx-0'></div>
							<div className='flex flex-col items-center gap-5 sm:flex-row'>
								<div className='flex items-center'>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className='text-xl'
									>
										-
									</Button>
									<span className='p-1 px-3 text-xl font-semibold border rounded-md border-button-color'>
										{quantity}
									</span>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => setQuantity(quantity + 1)}
										className='text-xl'
									>
										+
									</Button>
								</div>
								<div className='flex items-center gap-4 mt-4 sm:mt-0'>
									<span className='font-semibold'>Total:</span>{' '}
									<span className='text-xl font-bold text-button-color'>
										{total.toLocaleString()} VND
									</span>
								</div>
							</div>
							<Button className='w-full sm:w-max mt-4 bg-[#f0c14b] hover:bg-[#ddb347] text-black font-bold py-2 px-4 rounded'>
								PLACE PAYMENT
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
