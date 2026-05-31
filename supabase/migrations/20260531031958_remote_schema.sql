


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre, correo)
  VALUES (new.id, new.raw_user_meta_data->>'nombre', new.email);
  
  INSERT INTO public.wishlist (perfil_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."perfiles" (
    "id" "uuid" NOT NULL,
    "nombre" "text",
    "correo" "text"
);


ALTER TABLE "public"."perfiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."platillos" (
    "platillo_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "perfil_id" "uuid" NOT NULL,
    "descripcion_platillo" "text" NOT NULL
);


ALTER TABLE "public"."platillos" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."regalo" (
    "regalo_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "wishlist_id" "uuid" NOT NULL,
    "descripcion_regalo" "text" NOT NULL
);


ALTER TABLE "public"."regalo" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."wishlist" (
    "wishlist_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "perfil_id" "uuid" NOT NULL
);


ALTER TABLE "public"."wishlist" OWNER TO "postgres";


ALTER TABLE ONLY "public"."perfiles"
    ADD CONSTRAINT "perfiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."platillos"
    ADD CONSTRAINT "platillos_pkey" PRIMARY KEY ("platillo_id");



ALTER TABLE ONLY "public"."regalo"
    ADD CONSTRAINT "regalo_pkey" PRIMARY KEY ("regalo_id");



ALTER TABLE ONLY "public"."wishlist"
    ADD CONSTRAINT "wishlist_perfil_id_key" UNIQUE ("perfil_id");



ALTER TABLE ONLY "public"."wishlist"
    ADD CONSTRAINT "wishlist_pkey" PRIMARY KEY ("wishlist_id");



ALTER TABLE ONLY "public"."perfiles"
    ADD CONSTRAINT "perfiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."platillos"
    ADD CONSTRAINT "platillos_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "public"."perfiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."regalo"
    ADD CONSTRAINT "regalo_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlist"("wishlist_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."wishlist"
    ADD CONSTRAINT "wishlist_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "public"."perfiles"("id") ON DELETE CASCADE;



CREATE POLICY "Todos los usuarios pueden ver todas las listas" ON "public"."wishlist" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Todos los usuarios pueden ver todos los platillos" ON "public"."platillos" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Todos los usuarios pueden ver todos los regalos" ON "public"."regalo" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Usuarios pueden editar sus platillos" ON "public"."platillos" USING (("auth"."uid"() = "perfil_id"));



CREATE POLICY "Usuarios pueden editar sus regalos" ON "public"."regalo" USING (("auth"."uid"() IN ( SELECT "wishlist"."perfil_id"
   FROM "public"."wishlist"
  WHERE ("wishlist"."wishlist_id" = "regalo"."wishlist_id"))));



CREATE POLICY "Usuarios pueden ver su propio perfil" ON "public"."perfiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Usuarios pueden ver su wishlist" ON "public"."wishlist" FOR SELECT USING (("auth"."uid"() = "perfil_id"));



ALTER TABLE "public"."perfiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."platillos" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."regalo" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."wishlist" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."perfiles" TO "anon";
GRANT ALL ON TABLE "public"."perfiles" TO "authenticated";
GRANT ALL ON TABLE "public"."perfiles" TO "service_role";



GRANT ALL ON TABLE "public"."platillos" TO "anon";
GRANT ALL ON TABLE "public"."platillos" TO "authenticated";
GRANT ALL ON TABLE "public"."platillos" TO "service_role";



GRANT ALL ON TABLE "public"."regalo" TO "anon";
GRANT ALL ON TABLE "public"."regalo" TO "authenticated";
GRANT ALL ON TABLE "public"."regalo" TO "service_role";



GRANT ALL ON TABLE "public"."wishlist" TO "anon";
GRANT ALL ON TABLE "public"."wishlist" TO "authenticated";
GRANT ALL ON TABLE "public"."wishlist" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


