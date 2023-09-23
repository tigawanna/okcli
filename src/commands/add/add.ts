
import { Command } from "commander";
import { TAddArgs, TAddOptions, add_command_args, add_command_options } from "./add-commnad-args";
import { multiselectPrompt, textPrompt } from "#/src/utils/helpers/clack/prompts";
import { TOkCliConfigSchema, getOkCliConfig, promptForOkCliConfig } from "#/src/utils/config/okcli";
import { installTailwind } from "./installers/tw/tailwind";



const program = new Command();

export const addCommand = program
  .command("add")
  .description("add packages to your project")
  .argument("[inputs...]", "string to split")
  .option("-d, --root-dir <root_dir>", "Root directory")
  .option("-s, --root-styles <root_styles>", "Root styles file")
  .option("-f, --root-file <root_file>", "Root file",)
  .option("-p, --plugins <plugins...>", "Plugins")
  .option("-y, --yes", "Accept all defaults", false)
  .action(async (args,opts) => {
    const add_args = await add_command_args(args)
    const add_options = await add_command_options(opts) 
    
    const configure={
      root_dir:await textPrompt({
        message: "Root dir ?",
        defaultValue: "./src",
        initialValue: "./src",
      }),
    main_file:await textPrompt({
        message: "Main file ?",
        defaultValue: "main.tsx",
        initialValue: "main.tsx",
      }),
    css_file:await textPrompt({
        message: "Styles file ?",
        defaultValue: "index.css",
        initialValue: "index.css",
      })      
    }
    


    console.log({configure})
    const config = await getOkCliConfig(add_options)

    // const config = await promptForOkCliConfig()
    // const config = await validateRootOptions(add_options)
    console.log("config gotten ===  ",config)
    // if (add_args.includes("tailwind")) {
    //   await installTailwind(config);
    // }
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

