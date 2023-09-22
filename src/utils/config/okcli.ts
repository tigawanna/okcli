import { frameworkDefaults } from "@/utils/helpers/framework/framework";
import { checkFramework, supportedFrameworks } from "@/utils/helpers/framework/whatFramework";
import { selectPrompt, textPrompt } from "@/utils/helpers/clack/prompts";
import { z } from "zod";
import { saveConfig } from "./helpers";
import { tailwindSchema } from "./tailwind";



export const okcliConfigSchema = z.object({
  root_dir: z.string().default("./src"),
  root_styles: z.string().default("./src/index.css"),
  root_file: z.string().default("./src/main.ts"),
  framework: z.enum(supportedFrameworks),
  tailwind: tailwindSchema.optional(),
});

export type TOkCliConfigSchema = z.infer<typeof okcliConfigSchema>;

export async function promptForConfig() {
  try {
    const framework_type = await checkFramework();
    const { root_dir, root_styles, state, components,root_file } = frameworkDefaults(framework_type);
    const answers: TOkCliConfigSchema = {
      root_dir:(await textPrompt({ message: "root directory ?", defaultValue: root_dir,initialValue: root_dir})),
      root_file:(await textPrompt({ message: "root/entry file ?", defaultValue: root_file,initialValue: root_file})),
      root_styles:(await textPrompt({ message: "Main css file ?",defaultValue: root_styles,initialValue: root_styles})),
      framework:
        framework_type ??
        (await selectPrompt({
          message: "Framework ?",
          options: [
            { value: "React+Vite", label: "React+Vite" },
            { value: "Nextjs", label: "Nextjs" },
            { value: "RedWood", label: "RedWood" },
            { value: "Rakkasjs", label: "Rakkasjs" },
            ],
        })),

    };

    saveConfig(answers);
    return answers;
  } catch (error: any) {
    throw new Error("error prompting for config" + error.message);
  }
}
