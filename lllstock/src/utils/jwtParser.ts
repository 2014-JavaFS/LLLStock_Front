import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    userId: string;
}

export const parseJwt = <T extends JwtPayload>(token: string):T | null => {
    try {
        return jwtDecode<T>(token)
    } catch (error) {
        console.error(error)
        return null
    }
}