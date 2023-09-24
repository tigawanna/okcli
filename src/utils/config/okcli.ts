import { TFrameWorkDefaults, frameworkDefaults } from "@/utils/helpers/framework/framework";
import {
  TFrameworkType,
  checkFramework,
  supportedFrameworks,
} from "@/utils/helpers/framework/whatFramework";
import { selectPrompt, textPrompt } from "@/utils/helpers/clack/prompts";
import { z } from "zod";
import { saveConfig } from "./helpers";
import { tailwindSchema } from "./tailwind";
import { TAddOptions } from "#/src/commands/add/add-commnad-args";
import { existsSync, readFileSync } from "fs";
import { removeDirectory } from "../helpers/fs/directories";
import { safeJSONParse } from "../helpers/json/json";
import { printHelpers } from "../helpers/print-tools";


// this is the base okcli config , every other config ffile will be netedunder this 
export const okcliConfigSchema = z.object({
  root_dir: z.string().default("./src"),
  root_styles: z.string().default("./src/index.css"),
  root_file: z.string().default("./src/main.ts"),
  framework: z.enum(supportedFrameworks),
  tailwind: tailwindSchema.optional(),
});

export type TOkCliConfigSchema = z.infer<typeof okcliConfigSchema>;



/**
 * Retrieves the OkCliConfig object asynchronously.
 * This will either take the command options and if not present 
 * get the saved config or prompt a new config
 * it will also prompt for ant missing fields from the config
 *
 * @param {TAddOptions} config_options - Optional configuration options
 * @return {Promise<OkCliConfig>} The retrieved OkCliConfig object
 */
export async function getOkCliConfig(config_options?: TAddOptions) {
  try {
    const framework_type = await checkFramework();
    const fw_defaults = frameworkDefaults(framework_type);
    const a_config = config_options ? config_options : await getSavedOkCliConfig();
    const config = await getOkCliConfigOrPrompt({
      config_input: a_config,
      framework_type,
      fw_defaults,
    });
    if (config) {
      saveConfig(config);
    }
    return config;
  } catch (error: any) {
    throw new Error("error prompting for config" + error.message);
  }
}



export interface IGetOkCliConfigOrPromptprops {
  config_input: TAddOptions | TOkCliConfigSchema;
  framework_type?: TFrameworkType;
  fw_defaults?: TFrameWorkDefaults;
}

/**
 * Retrieves the OK CLI configuration object or 
 * prompts the user  if fields are missing.
 *
 * @param {IGetOkCliConfigOrPromptprops} {
 *   config_input,
 *   framework_type,
 *   fw_defaults,
 * } - The input parameters for the function:
 * - config_input: The input configuration object that may contain the OK CLI configuration details.
 * - framework_type: The type of framework.
 * - fw_defaults: The default framework details.
 *
 * @return {Promise<TOkCliConfigSchema>} The OK CLI configuration object.
 */
export async function getOkCliConfigOrPrompt({
  config_input,
  framework_type,
  fw_defaults,
}: IGetOkCliConfigOrPromptprops): Promise<TOkCliConfigSchema> {
  const { root_dir, root_file, root_styles } = fw_defaults || {};

  const config_partial =
    config_input && "root_dir" in config_input
      ? config_input
      : {
          root_dir: config_input?.rootDir,
          root_file: config_input?.rootFile,
          root_styles: config_input?.rootStyles,
          framework: framework_type,
        };

  // if (!config_partial?.root_dir) {
  //   printHelpers.warning("missing root directory");
  //   config_partial.root_dir = await textPrompt({
  //     message: "root directory ?",
  //     defaultValue: root_dir,
  //     initialValue: root_dir,
  //   });
  // }
  // if (!config_partial?.root_file) {
  //   printHelpers.warning("missing root/entry file");
  //   config_partial.root_file = await textPrompt({
  //     message: "root/entry file ?",
  //     defaultValue: root_file,
  //     initialValue: root_file,
  //   });
  // }
  // if (!config_partial?.root_styles) {
  //   printHelpers.warning("missing main css file");
  //   config_partial.root_styles = await textPrompt({
  //     message: "Main css file ?",
  //     defaultValue: root_styles,
  //     initialValue: root_styles,
  //   });
  // }

  // if (!framework_type) {
  //   printHelpers.warning("framework type misiing ");
  //   config_partial.framework = (await selectPrompt({
  //     message: "Framework ?",
  //     options: [
  //       { value: "React+Vite", label: "React+Vite" },
  //       { value: "Nextjs", label: "Nextjs" },
  //       { value: "RedWood", label: "RedWood" },
  //       { value: "Rakkasjs", label: "Rakkasjs" },
  //     ],
  //   })) as TFrameworkType;
  // }

  return {
    root_dir: config_partial?.root_dir ?? await textPrompt({
      message: "root directory ?",
      // defaultValue: root_dir,
      initialValue: root_dir,
    }),
    root_file: config_partial?.root_file ?? await textPrompt({
      message: "root/entry file ?",
      // defaultValue: root_file,
      initialValue: root_file,
    }),
    root_styles: config_partial?.root_styles?? await textPrompt({
      message: "Main css file ?",
      // defaultValue: root_styles,
      initialValue: root_styles,
    }),
    framework: config_partial.framework ?? (await selectPrompt({
      message: "Framework ?",
      options: [
        { value: "React+Vite", label: "React+Vite" },
        { value: "Nextjs", label: "Nextjs" },
        { value: "RedWood", label: "RedWood" },
        { value: "Rakkasjs", label: "Rakkasjs" },
      ],
    })) as TFrameworkType
  };

  // return await getSavedOkCliConfig(config_partial);
}

/**
 * Generates prompts the user for  OkCli config 
 * this is the root config where all the other configs will e nested.
 *
 * @return {Promise<TOkCliConfigSchema>} The user's configuration answers.
 * @throws {Error} If there is an error prompting for the configuration.
 */
export async function promptForOkCliConfig() {
  try {
    const framework_type = await checkFramework();
    const { root_dir, root_styles, root_file } = frameworkDefaults(framework_type);
    const answers: TOkCliConfigSchema = {
      root_dir: await textPrompt({
        message: "root directory ?",
        defaultValue: root_dir,
        initialValue: root_dir,
      }),
      root_file: await textPrompt({
        message: "root/entry file ?",
        defaultValue: root_file,
        initialValue: root_file,
      }),

      root_styles: await textPrompt({
        message: "Main css file ?",
        defaultValue: root_styles,
        initialValue: root_styles,
      }),
      framework:
        framework_type ??
        (await selectPrompt({
          message: "Framework ?",
          options: [
            { value: "React+Vite", label: "React+Vite" },
            { value: "Nextjs", label: "Nextjs" },
          ],
        })),
    };

    saveConfig(answers);
    return answers;
  } catch (error: any) {
    throw new Error("error prompting for config" + error.message);
  }
}


/**
 * Retrieves the saved OkCli configuration or prompts fro a new one if missing
 *
 * @return {Promise<TOkCliConfigSchema>} The saved OkCli configuration.
 */
export async function getSavedOkCliConfig() {
  try {
    if (existsSync("./okcli.config.json")) {
      const okcli_config_file = await safeJSONParse<TOkCliConfigSchema>(
        readFileSync("./okcli.config.json").toString()
      );
      const okcli_config = okcliConfigSchema.parse(okcli_config_file);
      if (okcli_config) {
        return okcli_config;
      } else {
        return await promptForOkCliConfig();
      }
    } else {
      return await promptForOkCliConfig();
    }
  } catch (error) {
    printHelpers.warning("corrupt okcli config attempting to reset");
    await removeDirectory("./okcli.config.json");
    printHelpers.error("error getting okcli config , try again");
    process.exit(1);
  }
}
