interface CityData {
  province: string;
  score: number;
}

export const CITY_DATA: Record<string, CityData> = {
  'Agrigento': { province: 'AG', score: 3 },
  'Caltanissetta': { province: 'CL', score: 3 },
  'Catania': { province: 'CT', score: 2 },
  'Enna': { province: 'EN', score: 3 },
  'Messina': { province: 'ME', score: 2 },
  'Palermo': { province: 'PA', score: 1 },
  'Ragusa': { province: 'RG', score: 3 },
  'Siracusa': { province: 'SR', score: 2 },
  'Trapani': { province: 'TP', score: 3 },
}; 