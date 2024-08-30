const hour: number = new Date().getHours();

const minutes: number = new Date().getMinutes();

const seconds: number = new Date().getSeconds();

export const currentTime: string =
  minutes > 10
    ? `${hour}:${minutes}:${seconds}`
    : `${hour}:0${minutes}:${seconds}`;
