
import { Command } from "commander";
import { TAddArgs, TAddOptions, add_command_args, add_command_options } from "./add-commnad-args";
import { multiselectPrompt} from "#/src/utils/helpers/clack/prompts";
import { TOkCliConfigSchema, getOkCliConfig } from "#/src/utils/config/okcli";
import { installTailwind } from "@/commands/add/installers/tailwind/tailwind";


const program = new Command();

export const addCommand = program
  .command("add")
  .description("add packages to your project")
  .argument("[inputs...]", "sub commands")
  .option("-d, --root-dir <root_dir>", "Root directory")
  .option("-s, --root-styles <root_styles>", "Root styles file")
  .option("-f, --root-file <root_file>", "Root file",)
  .option("-tw, --tw-config <tw_config>", "tailwind config path",)
  .option("-p, --plugins <plugins...>", "Plugins")
  .option("-y, --yes", "Accept all defaults", false)
  .action(async (args,opts) => {
    const add_args = await add_command_args(args)
    const add_options = await add_command_options(opts) 
    const config = await getOkCliConfig(add_options)
   
    if (add_args.includes("tailwind")) {
      await installTailwind(config,add_options);
    }
});


export async function listAddablePackages(config: TOkCliConfigSchema, add_options?: TAddOptions) {
  const result = await multiselectPrompt<TAddArgs[number]>({
    /* REQUIRED OPTIONS */
    message: "Which packages would you like to add?", // The message that the user will read
    options: [
      { label: "TailwindCSS", value: "tailwind" },
    ]
  });

  const packages = result && result;
  if (packages) {
    if (packages.includes("tailwind")) {
      await installTailwind(config);
    }

    // await promptToInstall(add_options)
  }
}



