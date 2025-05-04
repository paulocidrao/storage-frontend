<template>
  <NuxtLayout name="default">
    <section class="min-h-[80vh] flex flex-col items-center justify-center">
      <div class="text-center space-y-4">
        <h2 class="text-8xl font-bold">404</h2>
        <h1 class="text-3xl">Página não encontrada!</h1>
        <p class="mt-4">A página que você está procurando não existe.</p>
        <NuxtLink
          to="/"
          class="inline-block mt-6 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Voltar para página inicial
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>
