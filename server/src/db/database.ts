import { connection } from './connection';

const getDataPost = (q: string, values: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    connection.query(q, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export { getDataPost };