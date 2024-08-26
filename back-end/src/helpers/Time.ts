const hour: number = new Date().getHours();

const minutes: number = new Date().getMinutes();

const seconds: number = new Date().getSeconds();

export const currentTime: string = `${hour}:${minutes}:${seconds}`;
