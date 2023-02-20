import { getFeedBackData } from '.';

export default function DetailHandler(req, res) {
	switch (req.method) {
		case 'GET':
			const { id } = req.query;
			const data = getFeedBackData();
			const feedback = data.find((item) => item.id === id);
			if (!feedback) {
				return res.status(404).json({
					message: '404',
					error: 'Feedback not found',
				});
			}
			return res.status(200).json({
				message: 'success',
				feedback,
			});

		default:
			return res.status(4000).json({
				message: 'fail',
				error: 'invalid request type, /GET requests only )',
			});
	}
}
