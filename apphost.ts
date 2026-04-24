// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { ContainerLifetime, createBuilder } from "./.modules/aspire.js";

async function main(): Promise<void> {
  const builder = await createBuilder();

  const fileStorage = builder
    .addAzureStorage("storage")
    .runAsEmulator({
      configureContainer: async (azurite) => {
        await azurite.withDataVolume();
        await azurite.withLifetime(ContainerLifetime.Persistent);
      },
    })
    .addBlobContainer("images", { blobContainerName: "images" });

  await builder
    .addDockerfile("nextjs-web", "with-jest-app")
    .withReference(fileStorage)
    .withHttpEndpoint({ targetPort: 3000, env: "PORT" })
    .withExternalHttpEndpoints();

  await builder.build().run();
}

void main().catch((error: unknown) => {
  console.error("Failed to start the Aspire AppHost.", error);
  process.exit(1);
});
