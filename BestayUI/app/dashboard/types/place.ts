export type Place = {
  id: number;
  city: string;
  name: string;
  description: string;
  category: string;
  type: string;
  coordinates: string;
  photo?: string | null;
  photos?: { id: number; url: string }[];
  website_url?: string;
};
