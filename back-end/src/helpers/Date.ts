const today: number = new Date().getDate();

const month: number = new Date().getMonth() + 1;

const year: number = new Date().getFullYear();

export const todayDate: string = `${month}-${today}-${year}`;
