import { printHelpers } from "@/utils/helpers/print-tools";
import { z } from "zod";
const add_args = ["tailwind"] as const;
const addArgsShema = z.array(z.enum(add_args));
export type TAddArgs = z.infer<typeof addArgsShema>;

export async function add_command_args(args: any) {
  try {
    const parsed_args = await addArgsShema.parse(args);
    return parsed_args;
  } catch (error: any) {
    printHelpers.error("invalid arguments: " + error.message);
    process.exit(1);
  }
}

const addOptionsSchema = z.object({
  // /src
  rootDir: z.string().optional(),
  // /src/index.css
  rootStyles: z.string().optional(),
  // /src/main.tsx
  twConfig: z.string().default("tailwind.config.js").optional(),
  rootFile: z.string().optional(),
   plugins: z.array(z.string()).default([]).optional(),
  yes:z.boolean().default(false).optional(),
});


export type TAddOptions = z.infer<typeof addOptionsSchema>;
export async function add_command_options(options: any) {
  printHelpers.info("add command options", options);
  try {
    const parsed_options = await addOptionsSchema.parse(options);
    // printHelpers.success("add command opts succecssfully parsed", parsed_options)
    return parsed_options;
  } catch (error: any) {
    printHelpers.error("invalid arguments: " , error.message);
    return
    // process.exit(1);
  }
}
