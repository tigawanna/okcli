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
- pandacss
- tanstack

Currently supported frameworks:
### React
    - Vite SPA
    - Next.js
    - Redwood
    - Rakkasjs

running 
```sh
okcli add tanstack
```
In Nextjs or rakkas will only add tanstack query ,and will add query + router in vite SPA

### okcli gen
 sub commands 
 - route : generate a route , which will create boilerplate for
   - The route directory
   - a layout file
   - a route file
   - a dynamic route file

```sh
okcli gen route Route1 Route2
```

example
```sh
pnpm okcli gen route user about
```
to generate the user and about routes



-  model: 🚧



### okcli create 🚧

Currentlt only supports rakkasjs 
- Rakkasjs will pull in a [trpc + prisma + tailwind + typescript template](https://github.com/tigawanna/trpc-rakkas.git) for now , fine grained choice might be added later


