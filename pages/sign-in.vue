<template>
  <NuxtLayout name="default">
    <div class="space-y-2">
      <h1 class="text-2xl font-bold flex justify-center">Crie sua conta!</h1>
      <USeparator color="primary" block />
      <UForm
        class="space-y-4"
        :state="state"
        :schema="schema"
        @submit="onSubmit"
      >
        <UFormField name="email" label="E-mail" class="text-lg">
          <UInput
            placeholder="Digite seu e-mail..."
            type="email"
            v-model="state.email"
            color="primary"
            highlight
            size="lg"
            class="text-white w-full"
          />
        </UFormField>

        <UFormField name="password" label="Senha" class="text-lg">
          <UInput
            placeholder="Digite sua senha..."
            type="password"
            highlight
            color="primary"
            v-model="state.password"
            size="lg"
            class="text-white w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          label="Entrar"
          block
          class="text-black font-bold"
        />
      </UForm>

      <div>
        <p>
          Ainda não tem uma conta?
          <NuxtLink to="/sign-up" class="text-blue-600">Crie a sua</NuxtLink>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { api } from "~/server/api";
import type { userLoginResponse } from "~/src/@types/user-login";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  password: z.string().min(8, { message: "Digite sua senha por completo!" }),
  email: z
    .string()
    .min(1, "Digite seu e-mail!")
    .email({ message: "Digite um email válido!" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  password: "",
  email: "",
});

const toast = useToast();

const userLogin = async ({ email, password }: Schema) => {
  const { data, error } = await useFetch(`${api}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      email,
      password,
    },
    transform: (data: userLoginResponse) => ({
      token: data.token,
      status: data.codeStatus,
    }),
  });
  return { data, error };
};

const onSubmit = async (e: FormSubmitEvent<Schema>) => {
  e.preventDefault();
  const { data, error } = await userLogin(e.data);

  if (data.value!.token) {
    toast.add({
      title: "Sucesso",
      description: "Login realizado com sucesso",
      color: "success",
    });
    localStorage.setItem("token", data.value!.token);
    await navigateTo("/sign-up");
    Object.assign(state, {
      email: "",
      password: "",
    });
  }
  if (error.value?.statusCode === 500 || error.value?.statusCode === 422) {
    toast.add({
      title: "Falha",
      description:
        "Não foi possivel realizar o seu login, verifique os seus dados e tente novamente",
      color: "error",
    });
  }
};
definePageMeta({
  layout: false,
});
</script>
