import { Tables } from "@/types/supabase";

export type ProfileOrganization = Tables<"profiles_organizations"> & {
  profiles: Tables<"profiles"> | null;
};

export type Transaction = Tables<"transactions"> & {
  orders: Order | null;
};

export type Order = Tables<"orders"> & {
  profiles: Tables<"profiles"> | null;
};

export type OrganizationDeep = Tables<"organizations"> & {
  transactions: Transaction[];
  profiles_organizations: ProfileOrganization[];
};

export type OrganizationData = Tables<"profiles_organizations"> & {
  organizations: OrganizationDeep | null;
};

export type SearchResultOrders = {
  id: number;
  title: string;
  description: string;
  profile_id: string;
  full_name: string;
  email: string;
  location_name: string;
  amount: number;
  fee: number;
  stripe_id: string;
};

export type TransactionCustomer = Tables<"transactions"> & {
  organizations: Tables<"organizations"> | null;
};

export type OrderCustomer = Tables<"orders"> & {
  transactions: TransactionCustomer | null;
};

export type CustomerData = Tables<"profiles"> & {
  orders: OrderCustomer[];
};
