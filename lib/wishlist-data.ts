import { supabase } from "@/lib/supabaseClient";
import type { DataResult, FamilyWishlist, MyWishlistData, RegaloRow } from "@/lib/types";

function getPerfilNombre(
  perfiles: { nombre: string | null } | { nombre: string | null }[] | null
): string {
  if (!perfiles) return "Sin nombre";
  if (Array.isArray(perfiles)) {
    return perfiles[0]?.nombre ?? "Sin nombre";
  }
  return perfiles.nombre ?? "Sin nombre";
}

export async function fetchFamilyWishlists(): Promise<DataResult<FamilyWishlist[]>> {

  const { data, error } = await supabase
    .from("wishlist")
    .select(
      `
      wishlist_id,
      perfil_id,
      perfiles ( nombre ),
      regalo ( regalo_id, descripcion_regalo )
    `
    )
    .order("perfil_id");

  if (error) {
    return { data: [], error: error.message };
  }

  const familyWishlists: FamilyWishlist[] = (data ?? []).map((row) => ({
    perfilId: row.perfil_id,
    nombre: getPerfilNombre(row.perfiles),
    wishlistId: row.wishlist_id,
    regalos: row.regalo ?? [],
  }));

  return { data: familyWishlists, error: null };
}

export async function fetchMyWishlist(
  perfilId: string
): Promise<DataResult<MyWishlistData | null>> {

  const { data: wishlist, error: wishlistError } = await supabase
    .from("wishlist")
    .select("wishlist_id")
    .eq("perfil_id", perfilId)
    .single();

  if (wishlistError) {
    return { data: null, error: wishlistError.message };
  }

  const { data: regalos, error: regaloError } = await supabase
    .from("regalo")
    .select("regalo_id, descripcion_regalo")
    .eq("wishlist_id", wishlist.wishlist_id)
    .order("descripcion_regalo");

  if (regaloError) {
    return { data: null, error: regaloError.message };
  }

  return {
    data: {
      wishlistId: wishlist.wishlist_id,
      regalos: (regalos ?? []) as RegaloRow[],
    },
    error: null,
  };
}

export async function addRegalo(
  wishlistId: string,
  descripcion: string
): Promise<DataResult<RegaloRow | null>> {

  const trimmed = descripcion.trim();
  if (!trimmed) {
    return { data: null, error: "La descripción del regalo es obligatoria." };
  }

  const { data, error } = await supabase
    .from("regalo")
    .insert({ wishlist_id: wishlistId, descripcion_regalo: trimmed })
    .select("regalo_id, descripcion_regalo")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as RegaloRow, error: null };
}

export async function deleteRegalo(regaloId: string): Promise<DataResult<null>> {

  const { error } = await supabase.from("regalo").delete().eq("regalo_id", regaloId);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}

export async function updateRegalo(
  regaloId: string,
  newDescripcion: string
): Promise<DataResult<RegaloRow | null>> {
  const trimmed = newDescripcion.trim();
  if (!trimmed) {
    return { data: null, error: "La descripción del regalo es obligatoria." };
  }

  const { data, error } = await supabase
    .from("regalo")
    .update({ descripcion_regalo: trimmed })
    .eq("regalo_id", regaloId)
    .select("regalo_id, descripcion_regalo")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as RegaloRow, error: null };
}
