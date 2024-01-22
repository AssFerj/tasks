import jwt from 'jsonwebtoken';

class JwtService{
    createToken(data: any): string {
        return jwt.sign(data, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        })
    }
    decodeToken() {
        return true;
    }
}

export {JwtService}