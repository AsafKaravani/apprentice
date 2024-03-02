import { FC, useEffect, useState } from 'react';
import { AppForm } from '../../core/form/AppForm';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetch from 'use-http'

export const HomePage: FC = () => {
	const form = useForm();
	const navigate = useNavigate();

	return <div className='flex flex-col gap-6 p-4'>
		
		<Question 
			question='מהי בירת צרפת?'
			expectedAnswer='פריז'
		/>

		<Question 
			question='מי כתב את המנון התקווה?'
			expectedAnswer='נפתלי הרץ אימבר'
		/>

		<Question 
			question='מהו הר הגבוה ביותר בעולם?'
			expectedAnswer='הר אוורסט'
		/>

		<Question 
			question='באיזה שנה הוקמה מדינת ישראל?'
			expectedAnswer='1948'
		/>

		<Question 
			question='מהו החג היהודי החוגג את יציאת מצרים?'
			expectedAnswer='פסח'
		/>

		<Question 
			question='מי היה הנשיא הראשון של מדינת ישראל?'
			expectedAnswer='חיים ויצמן'
		/>

		<Question 
			question='מהו האוקיינוס הגדול ביותר בעולם?'
			expectedAnswer='האוקיינוס השקט'
		/>

		<Question 
			question='איזו מדינה היא הגדולה ביותר מבחינת שטח?'
			expectedAnswer='רוסיה'
		/>
	</div>;

};

type QuestionProps = {
	question: string;
	expectedAnswer: string;
}

const Question: FC<QuestionProps> = props => {
	const { post, response, loading, error } = useFetch<any>(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/v1/ai/questions`);
	console.log(import.meta.env.VITE_SERVER_ENDPOINT);
	const [value, setValue] = useState('');
	const [score, setScore] = useState(0);
	const [note, setNote] = useState('');

	const checkAnswer = async () => {
		post({
			question: props.question,
			givenAnswer: value,
			expectedAnswer: props.expectedAnswer
		});	
	}

	useEffect(() => {
		if (!response?.ok) return
		response.json().then(data => {
			setScore(data.score);
			setNote(data.note);
		});
	}, [response, loading, error]);

	return <div className='w-full'>
		<h3>
			{props.question}
		</h3>
		<TextField fullWidth value={value} onChange={e => setValue(e.target.value)} />
		<div className='mt-2 flex justify-between'>
			<Button onClick={checkAnswer} >בדוק</Button>
			<div>
				{loading && 'בודק...'}
				{error && 'שגיאה'}
				{response?.ok && score}
			</div>
		</div>
		{response?.ok && note}
	</div>;
}