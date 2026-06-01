export type RegaloRow = {
  regalo_id: string;
  descripcion_regalo: string;
};

export type PlatilloRow = {
  platillo_id: string;
  descripcion_platillo: string;
  perfil_id: string;
};

export type FamilyWishlist = {
  perfilId: string;
  nombre: string;
  wishlistId: string;
  regalos: RegaloRow[];
};

export type FamilyPlatillo = {
  platilloId: string;
  nombre: string;
  descripcion_platillo: string;
};

export type DataResult<T> = {
  data: T;
  error: string | null;
};

export type MyWishlistData = {
  wishlistId: string;
  regalos: RegaloRow[];
};
