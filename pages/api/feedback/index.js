import fs from 'fs';
import path from 'path';

function buildFeedbackPath() {
	const filePath = path.join(process.cwd(), 'data', 'feedback.json');
	return filePath;
}

export function getFeedBackData() {
	const filePath = buildFeedbackPath();
	const fileData = fs.readFileSync(filePath);
	const data = JSON.parse(fileData);
	return data;
}

export default function handler(req, res) {
	switch (req.method) {
		case 'GET':
			const feedbackData = getFeedBackData();
			return res.status(200).json({
				message: 'success',
				feedbacks: feedbackData,
			});

		case 'POST':
			const { email, subject, comment } = req.body;
			const newFeedback = {
				email,
				subject,
				comment,
				id: new Date().toISOString(),
			};
			const data = getFeedBackData();
			data.push(newFeedback);
			const filePath = buildFeedbackPath();
			fs.writeFileSync(filePath, JSON.stringify(data));
			return res.status(201).json({
				message: 'success',
				feedback: newFeedback,
			});

		default:
			return json.status(400).json({
				message: 'fail',
				error: 'request type unknown, please try again',
			});
	}
}
