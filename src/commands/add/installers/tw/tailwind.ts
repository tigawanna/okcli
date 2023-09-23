import { validateRelativePath } from "@/utils/helpers/strings/general";
import { z } from "zod";
import { printHelpers } from "@/utils/helpers/print-tools";
import { TOkCliConfigSchema } from "#/src/utils/config/okcli";
import { saveConfig } from "#/src/utils/config/helpers";
import { textPrompt, multiselectPrompt } from "#/src/utils/helpers/clack/prompts";
import { existsSync } from "fs";



// Define the tailwind schema
export const tailwindSchema = z.object({
  tw_config: z.string().default("tailwind.config.js"),
  tw_plugins: z.array(z.string()).default([]),
});

export type TTailwindConfigSchema = z.infer<typeof tailwindSchema>;


export async function promptForTWConfig(config: TOkCliConfigSchema) {
  try {
    if (config && config.tailwind && "tw_config" in config.tailwind) {
      return {
        ...config,
        tailwind: {
          tw_config: config.tailwind.tw_config ?? "tailwind.config.js",
          tw_plugins: config.tailwind.tw_plugins ?? [],
        },
      };
    }

    const answers: TTailwindConfigSchema = {
      tw_config: await textPrompt({
        message: "Where do you want to add your tailwind config file",
        initialValue: existsSync("tailwind.config.ts") ? "tailwind.config.ts" : "tailwind.config.js",
      }),

      tw_plugins: (await multiselectPrompt({
        message: "Want some plugins?",
        options: [
          { value: "daisyui", label: "daisyui" },
          { value: "tailwindcss-animate", label: "tailwindcss-animate" },
          { value: "tailwind-scrollbar", label: "tailwind-scrollbar" },
          { value: "tailwindcss-elevation", label: "tailwindcss-elevation" },
        ],
      })) ?? [""],
    };

    const new_config = {
      ...config,
      tailwind: answers,
    };

    await saveConfig(new_config);
    // printHelpers.debug("new_config saved", new_config);
    return new_config;
  } catch (error: any) {
    throw new Error("error prompting for tailwind config " + error.message);
  }
}



export async function installTailwind(bonita_config: TOkCliConfigSchema) {
try {
    const tw_config = await promptForTWConfig(bonita_config);
    const root_styles = validateRelativePath(tw_config.root_styles);
    // await addBaseTWcss(root_styles)
    // await addTailwindPostcssConfig();
    // await addTailwindDeps(config)


    } catch (error: any) {
    // tailwind_spinners.fail("main");
    printHelpers.error("Error installing Tailwind  :\n" + error.message);
   // process.exit(1);
  }
}
