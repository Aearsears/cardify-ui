import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';

interface QA {
    Answer: string;
    Question: string;
    context: string;
    id: number;
}

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    /*  
   # takes in JSON of {"text": "this is that. that is this.", "max_questions":int} 
    [{'Answer': 'cricketer',
               'Question': "What is Sachin Ramesh Tendulkar's career?",
               'context': 'Sachin Ramesh Tendulkar is a former international '
                          'cricketer from India and a former captain of the '
                          'Indian national team.',
               'id': 1},
] 
    */ try {
        if (!Array.isArray(sampleUserData)) {
            throw new Error('Cannot find user data');
        }

        res.status(200).json(sampleUserData);
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

export default handler;
