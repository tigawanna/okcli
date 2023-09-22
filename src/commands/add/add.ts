
import { Command } from "commander";
import { printHelpers } from "#/src/utils/helpers/print-tools";
import { add_command_args, add_command_options } from "./add-commnad-args";


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
    // const config = await getBonitaConfig();
  const add_args = await add_command_args(args)
  const add_options = await add_command_options(opts) 

  // printHelpers.success("add command with args", args)
  // printHelpers.success("add_args", add_args)
  // printHelpers.success("add_options", add_options)
  // printHelpers.debug("add command with options", options)




  });



//   export async function listAddablePackages(config: TOkCliConfigSchema,add_options?:TAddOptions) {
//   const result = await multiselectPrompt<TAddArgs[number]>({
//     /* REQUIRED OPTIONS */
//     message: "Which packages would you like to add?", // The message that the user will read
//     options: [
//       { label: "TailwindCSS", value: "tailwind" },
//       { label: "PandaCSS", value: "panda" },
//       { label: "Tanstack", value: "tanstack" },
//     ]
//   });

//   const packages = result && result;
//   if (packages) {
//     // if (packages.includes("tailwind")) {
//     //   await installTailwind(config);
//     // }
//     // if (packages.includes("panda")) {
//     //   await installPanda(config);
//     // }
//     // if (packages.includes("tanstack")) {
//     //   await installTanstack(config,add_options);
//     // }
//     await promptToInstall(add_options)
//   }
// }
