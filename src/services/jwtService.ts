export const getToken = () => window.localStorage.getItem('token');

export const saveToken = (token: string) => {
    window.localStorage.setItem('token', token);
};

export const destroyToken = () => {
    window.localStorage.removeItem('token');
};

