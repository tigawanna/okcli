import { writeFile } from "fs/promises";
import { printHelpers } from "../helpers/print-tools";
import { TOkCliConfigSchema,} from "./okcli";
import { loadingSpinner } from "../helpers/clack/spinner";


// const frameworkEnums = ["React+Vite", "Nextjs"] as const;




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
