# # OKCLI

Ultimate CLI tool for frontend frameworks

run 
```sh
npx/pnpm dlx/yarn okcli [add] or [page]
```
you can also add it asadev dependancy 

```sh
npm i -D okcli
yarn add -D okcli
pnpm i -D okcli
```

## commands 

### okcli add

- Adding tailwind 
```sh
npx okcli add tailwind
yarn okcli add tailwind
pnpm dlx okcli add tailwind
```

This command currently works for 
- tailwind


Currently supported frameworks:
- React
    - Vite SPA
    - Next.js
    - Redwood
    - Rakkasjs


options:

```ts
  .option("-d, --root-dir <root_dir>", "Root directory")
  .option("-s, --root-styles <root_styles>", "Root styles file")
  .option("-f, --root-file <root_file>", "Root file",)
  .option("-tw, --tw-config <tw_config>", "tailwind config path",)
  .option("-p, --plugins <plugins...>", "Plugins")
  .option("-y, --yes", "Accept all defaults", false)
```
ex:
```sh
okcli add tailwind -y --root-dir ./src --root-file ./src/main.tsx --root-styles ./src/index.css  --plugins daisyui --tw-config tailwind.config.js
```

passing in all the options will bypass the prompts , if a required option is missing it will propmpt for it


