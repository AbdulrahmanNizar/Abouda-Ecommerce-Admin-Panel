const today: number = new Date().getDate();
const month: number = new Date().getMonth() + 1;
const year: number = new Date().getFullYear();

const hour: number = new Date().getHours();
const minutes: number = new Date().getMinutes();
const seconds: number = new Date().getSeconds();

export const todayDate: string = `${year}-${month}-${today}--${hour}-${minutes}-${seconds}`;
