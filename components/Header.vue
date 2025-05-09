<template>
  <header
    class="w-full bg-white flex items-center justify-between px-6 py-4 shadow-sm"
  >
    <img src="../assets/imgs/logo.png" alt="logo" class="w-25 h-auto" />
    <nav class="flex items-center text-gray-800">
      <UPopover arrow mode="hover">
        <UAvatar src="https://github.com/benjamincanac.png" size="3xl" />

        <template #content>
          <div class="w-auto h-auto p-3 flex flex-col bg-white ring rounded">
            <NuxtLink
              to=""
              class="flex gap-2 p-1.5 rounded text-black font-bold cursor-pointer hover:bg-zinc-100"
            >
              <UIcon name="lucide:user" class="size-5" />
              <p>Minha conta</p>
            </NuxtLink>
            <NuxtLink
              to=""
              class="flex gap-2 p-1.5 rounded text-red-500 font-bold cursor-pointer hover:bg-zinc-100"
            >
              <UIcon name="lucide:user-x" class="size-5" />
              <p>Sair</p>
            </NuxtLink>
          </div>
        </template>
      </UPopover>
    </nav>
  </header>
</template>

<script lang="ts" setup></script>
