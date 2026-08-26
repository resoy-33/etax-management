export type TaxpayerType = 'Personne Physique' | 'Personne Morale';
export type TaxpayerStatus = 'Actif' | 'Inactif' | 'Suspendu' | 'En attente';

export interface Taxpayer {
  id: number;
  taxpayerType: TaxpayerType | '';
  nif: string;
  status: TaxpayerStatus | '';
  registrationDate: string;

  // Personne Physique
  firstName: string;
  lastName: string;
  cin: string;
  birthDate: string;

  // Personne Morale
  companyName: string;
  tradeRegister: string;

  // Coordonnées
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;

  // Informations fiscales
  activity: string;
  taxCenter: string;
  taxRegime: string;
}
