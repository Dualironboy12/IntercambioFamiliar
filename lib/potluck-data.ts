import { supabase } from "@/lib/supabaseClient";
import { devSkipAuth } from "@/lib/dev-flags";
import type { DataResult, FamilyPlatillo, PlatilloRow } from "@/lib/types";

function getPerfilNombre(
  perfiles: { nombre: string | null } | { nombre: string | null }[] | null
): string {
  if (!perfiles) return "Sin nombre";
  if (Array.isArray(perfiles)) {
    return perfiles[0]?.nombre ?? "Sin nombre";
  }
  return perfiles.nombre ?? "Sin nombre";
}

export async function fetchFamilyPlatillos(): Promise<DataResult<FamilyPlatillo[]>> {
  if (devSkipAuth) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("platillos")
    .select(
      `
      platillo_id,
      descripcion_platillo,
      perfil_id,
      perfiles ( nombre )
    `
    )
    .order("descripcion_platillo");

  if (error) {
    return { data: [], error: error.message };
  }

  const platillos: FamilyPlatillo[] = (data ?? []).map((row) => ({
    platilloId: row.platillo_id,
    nombre: getPerfilNombre(row.perfiles),
    descripcion_platillo: row.descripcion_platillo,
  }));

  return { data: platillos, error: null };
}

export async function fetchMyPlatillos(
  perfilId: string
): Promise<DataResult<PlatilloRow[]>> {
  if (devSkipAuth) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("platillos")
    .select("platillo_id, descripcion_platillo, perfil_id")
    .eq("perfil_id", perfilId)
    .order("descripcion_platillo");

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data ?? []) as PlatilloRow[], error: null };
}

export async function addPlatillo(
  perfilId: string,
  descripcion: string
): Promise<DataResult<PlatilloRow | null>> {
  if (devSkipAuth) {
    return { data: null, error: "Inicia sesión real para agregar platillos." };
  }

  const trimmed = descripcion.trim();
  if (!trimmed) {
    return { data: null, error: "La descripción del platillo es obligatoria." };
  }

  const { data, error } = await supabase
    .from("platillos")
    .insert({ perfil_id: perfilId, descripcion_platillo: trimmed })
    .select("platillo_id, descripcion_platillo, perfil_id")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as PlatilloRow, error: null };
}

export async function deletePlatillo(platilloId: string): Promise<DataResult<null>> {
  if (devSkipAuth) {
    return { data: null, error: "Inicia sesión real para eliminar platillos." };
  }

  const { error } = await supabase
    .from("platillos")
    .delete()
    .eq("platillo_id", platilloId);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}
