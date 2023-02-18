import { connection } from './connection';

const getDataPost = (q: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        connection.query(q, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
    });
};

export { getDataPost };