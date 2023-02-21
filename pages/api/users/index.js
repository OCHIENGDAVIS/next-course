import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			const { email } = req.body;

			const newUser = { email, id: new Date().toISOString() };
			// ! TODO => store user into the database
			const connectionURL = process.env.MONGO_URI;

			try {
				const client = await MongoClient.connect(connectionURL);
				const db = client.db();
				const newInsert = await db
					.collection('email')
					.insertOne(newUser);
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
				error: 'method not supported. only POST methods are supported.',
			});
	}
}
