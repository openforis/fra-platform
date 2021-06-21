import { OdpRepository } from '@server/repository/odp'

type Odp = any

create(options: {
  name: string;
  label: string;
  lang: LanguageCode;
  template?: boolean;
  user: User;
}): Promise<Odp>;

export const { createOdp } = OdpRepository
