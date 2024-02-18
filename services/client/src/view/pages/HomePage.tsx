import { FC } from 'react';
import { AppForm } from '../../core/form/AppForm';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
	const form = useForm();
	const navigate = useNavigate();

	return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 20 }}>
		<div className='w-full p-4 bg-gray-100'>
			<div className='mb-2 font-bold opacity-75'>מצב כללי</div>
			<div className='flex gap-4'>
				<div className='flex flex-col items-center p-4 bg-gray-300 rounded'>
					<span className='text-3xl font-bold'> 57</span>
					<span> פעילות </span>
				</div>
				<div className='flex flex-col items-center p-4 bg-red-300 rounded'>
					<span className='text-3xl font-bold'> 3 </span>
					<span> תקלות </span>
				</div>
			</div>
		</div>



	</div>;
};

