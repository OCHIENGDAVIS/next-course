import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
	const connectionURL = process.env.MONGO_URI;

	switch (req.method) {
		case 'GET':
			try {
				const client = await MongoClient.connect(connectionURL);
				const db = client.db();
				const comments = await db
					.collection('comments')
					.find()
					.sort({ _id: -1 })
					.toArray();

				client.close();

				return res.status(201).json({
					message: 'success',
					comments,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'fail',
					error: 'database cannot be found',
				});
			}

		case 'POST':
			const { email, name, text } = req.body;
			const newComment = {
				email,
				name,
				text,
			};
			try {
				const client = await MongoClient.connect(connectionURL);
				const db = client.db();
				const newInsert = await db
					.collection('comments')
					.insertOne(newComment);
				client.close();

				return res.status(201).json({
					message: 'success',
					user: newInsert,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'fail',
					error: 'database cannot be found',
				});
			}

		default:
			return res.status(400).json({
				message: 'fail',
				error: 'methods not support (only /GET and /POST methods are supported)',
			});
	}
}
