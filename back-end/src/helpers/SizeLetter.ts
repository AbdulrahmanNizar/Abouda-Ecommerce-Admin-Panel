export const sizeLetter = (sizeName: string): string | void => {
  switch (sizeName != '') {
    case sizeName == 'Very Small':
      return 'XS';
      break;
    case sizeName == 'Small':
      return 'S';
      break;
    case sizeName == 'Medium':
      return 'M';
      break;
    case sizeName == 'Large':
      return 'L';
      break;
    case sizeName == 'Very Large':
      return 'XL';
      break;
  }
};
