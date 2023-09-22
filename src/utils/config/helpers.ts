import { existsSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { printHelpers } from "../helpers/print-tools";
import { removeDirectory } from "../helpers/fs/directories";
import { TOkCliConfigSchema, okcliConfigSchema, promptForConfig } from "./okcli";
import { loadingSpinner } from "../helpers/clack/spinner";

// const frameworkEnums = ["React+Vite", "Nextjs"] as const;


export async function getBonitaConfig() {
  try {
    if (existsSync("./okcli.config.json")) {
      const bonita_config_file = JSON.parse(
        readFileSync("./okcli.config.json").toString(),
      );
      const bonita_config = okcliConfigSchema.parse(bonita_config_file);
      if (bonita_config) {
        return bonita_config;
      } else {
        return await promptForConfig();
      }
    } else {
      return await promptForConfig();
    }
  } catch (error) {
    printHelpers.warning("corrupt okcli config attempting to reset");
    await removeDirectory("./okcli.config.json");
    printHelpers.error("error getting okcli config , try again");
    process.exit(1);
  }
}

export async function saveConfig(config: TOkCliConfigSchema) {
  const save_config_loader = loadingSpinner();
  save_config_loader.add("saved config", { text: "saving config" });
  writeFile("./okcli.config.json", JSON.stringify(config, null, 2)).catch(
    (err) => {
      printHelpers.error("error saving config ", err.message);
      printHelpers.warning("Bonita config :", config);
      save_config_loader.fail("saved config",{text:"error saving config " + err.message});
    },
  );

  save_config_loader.succeed("saved config", { text: "saved config" });
}
