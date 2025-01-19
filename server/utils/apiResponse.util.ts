import { Response } from 'express';

const ResponseApi = (res: Response, status: number, message: string, data: any = []) => {
    res.status(status).json({
        message,
        data,
    });
};

export default ResponseApi;