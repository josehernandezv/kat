import { useState } from "react";
import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createServerClient } from "~/utils/supabase.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const mode = form.get("mode");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const response = new Response();
  const supabaseClient = createServerClient({ request, response });

  if (mode === "login") {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    console.log("🦁", data);
    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
  return redirect("/", { headers: response.headers });
};

export default function LoginRoute() {
  const [mode, setMode] = useState<"login" | "signUp">("login");

  return (
    <div className="container mx-auto max-w-xs py-12">
      <div className="space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Kat"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-base-content">
            KAT
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Herramienta de análisis para Karate
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <input type="hidden" name="remember" defaultValue="true" />
          {/* Pass the mode to the form so we can use it in the action */}
          <input type="hidden" name="mode" value={mode} />
          <div>
            <label htmlFor="email-address" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-bordered input w-full max-w-xs"
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input-bordered input w-full max-w-xs"
              placeholder="Contraseña"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-focus"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn-primary  btn-block btn"
              // className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mode === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          </div>
        </Form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {mode === "login"
              ? "¿No tienes una cuenta?"
              : "¿Ya tienes una cuenta?"}{" "}
            <span
              onClick={() => setMode(mode === "login" ? "signUp" : "login")}
              className="cursor-pointer font-medium text-primary hover:text-primary-focus"
            >
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
