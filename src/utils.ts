export const getOfferType = (offerType: string = ''): string => offerType[0].toUpperCase() + offerType.slice(1);

export const getRating = (rating = 0) => Math.round(rating) * 100 / 5;

export const getCurrentTime = (time: string) => (new Date(time)).getTime();
