import { useEffect, useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createServerClient } from "~/utils/supabase.server";
import { validateLoginCredentials } from "~/utils/validation";
import { getTranslatedErrorMessage } from "~/utils/helper";
import Alert from "~/components/Alert";

export async function loader({ request, params, context }: LoaderArgs) {
  const response = new Response();
  const supabaseClient = createServerClient({ request, response });
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (session) {
    return redirect("/", {
      headers: response.headers,
    });
  }
  return json({});
}

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const credentials = validateLoginCredentials(formPayload);
  if (!credentials.success)
    return json({ error: credentials.error.format() }, { status: 400 });

  const response = new Response();
  const supabaseClient = createServerClient({ request, response });

  if (formPayload.mode === "login") {
    const { error } = await supabaseClient.auth.signInWithPassword(
      credentials.data
    );
    if (error)
      return json(
        { error: { message: getTranslatedErrorMessage(error.message) } },
        { status: 400 }
      );
  } else {
    const { error, data } = await supabaseClient.auth.signUp(credentials.data);

    if (error) {
      let message = getTranslatedErrorMessage(error.message);
      if (error.status === 429) {
        message =
          "Demasiados intentos. Por favor, inténtalo de nuevo en 1 minuto";
      }

      return json({ error: { message } }, { status: 400 });
    }

    if (data?.user?.identities?.length === 0) {
      return json(
        { error: { message: "Este correo electrónico ya está registrado." } },
        { status: 400 }
      );
    }

    if (data.user && !data.session) {
      return json(
        {
          error: {},
          message: "Confirma tu correo electrónico",
        },
        { status: 200 }
      );
    }
  }
  return redirect("/", { headers: response.headers });
};

function ConfirmEmail({ message }: { message: string }) {
  return (
    <main className="container mx-auto grid min-h-full max-w-lg place-items-center py-12 px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl text-gray-900">{message}</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Gracias por unirte a KAT
          <br />
          Para completar el registro, por favor confirma tu correo electrónico.
        </p>
        <button
          className="btn-primary btn-outline btn mt-10"
          onClick={() => (window.location.href = "/")}
        >
          Volver
        </button>
      </div>
    </main>
  );
}

export default function LoginRoute() {
  const [mode, setMode] = useState<"login" | "signUp">("login");
  const data = useActionData<typeof action>();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (data?.error && "message" in data?.error) {
      setAlertMessage(data.error.message);
    }
  }, [data]);

  if (data && "message" in data) {
    return <ConfirmEmail message={data.message} />;
  }

  return (
    <main className="container mx-auto max-w-xs py-12">
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
        {!!alertMessage && (
          <Alert
            type="error"
            message={alertMessage}
            onClose={() => setAlertMessage("")}
          />
        )}
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
            {data?.error && "email" in data?.error && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {data?.error?.email?._errors[0]}
                </span>
              </label>
            )}
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
            {data?.error && "password" in data?.error && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {data?.error?.password?._errors[0]}
                </span>
              </label>
            )}
          </div>
          {mode === "login" && (
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
          )}

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
    </main>
  );
}
