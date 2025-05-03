<template>
  <NuxtLayout name="default">
    <div class="space-y-2 w-1/4">
      <h1 class="text-2xl font-bold flex justify-center">Crie sua conta!</h1>
      <USeparator color="primary" block />
      <UForm
        class="space-y-2"
        :state="state"
        :schema="schema"
        @submit="onSubmit"
      >
        <UFormField class="text-lg" name="name" label="Nome">
          <UInput
            v-model="state.name"
            type="text"
            placeholder="Digite seu nome..."
            highlight
            size="lg"
            color="primary"
            class="text-white w-full"
          />
        </UFormField>

        <UFormField class="text-lg" name="email" label="E-mail">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Digite seu email..."
            highlight
            size="lg"
            color="primary"
            class="text-white w-full"
          />
        </UFormField>

        <UFormField class="text-lg" name="password" label="Senha">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Digite sua senha..."
            highlight
            size="lg"
            color="primary"
            class="text-white w-full"
          />
        </UFormField>
        <UFormField
          class="text-lg"
          name="confirm_password"
          label="Confirme sua senha"
        >
          <UInput
            v-model="state.confirm_password"
            type="password"
            placeholder="Confirme sua senha..."
            highlight
            size="lg"
            color="primary"
            class="text-white w-full"
          />
        </UFormField>
        <UButton block class="text-black font-bold" type="submit" loading-auto>
          Criar conta
        </UButton>
      </UForm>
      <div class="flex justify-center">
        <p>
          Já tem uma conta?
          <NuxtLink to="/sign-in" class="text-blue-600">Entre aqui</NuxtLink>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { api } from "~/server/api";
import type { createUserResponse } from "~/src/@types/user-create";
const toast = useToast();

const schema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Digite seu nome!" })
      .regex(/^[^\d]+$/, { message: "O nome não pode conter números!" }),
    email: z
      .string()
      .min(1, { message: "Digite seu e-mail" })
      .email({ message: "Digite um e-mail válido!" }),
    password: z.string().min(8, "Sua senha deve ter pelo menos 8 dígitos!"),
    confirm_password: z.string().min(1, { message: "Cofnirme sua senha" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguais!",
    path: ["confirm_password"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const createUser = async ({ email, name, password }: Schema) => {
  const response = await $fetch<createUserResponse>(`${api}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name,
      email,
      password,
    },
  });
  return response;
};

const onSubmit = async (e: FormSubmitEvent<Schema>) => {
  e.preventDefault();
  const response = await createUser(e.data);
  if (response.codeStatus === 200) {
    toast.add({
      title: "Sucesso!",
      description: "Sua conta foi criada com sucesso",
      color: "success",
    });
    await navigateTo("/sign-in");
    Object.assign(state, {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  } else {
    toast.add({
      title: "Falha!",
      description: "Sua conta não pode ser criada!",
      color: "error",
    });
  }
};
definePageMeta({
  layout: false,
});
</script>
