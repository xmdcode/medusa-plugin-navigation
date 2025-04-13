# Medusa Navigation Menu

This is a plugin for **MedusaJS 2.7.0+** designed to create basic navigations/menu for the frontend of a MedusaJS project. The project is just getting started and there's still lots of work to be done.

---

## ✨ Features

- Create custom navigations with up to **2 levels of depth**
- Rearrange the index of each item to match your preferred order
- Exposes custom API endpoints for use in frontend frameworks like:
  - **Next.js**
  - **Remix.js**
  - **Angular.js**
  - Or any other frontend of your choice paired with MedusaJS

---

## 🚀 Usage

### Plugin Options

To enable **Admin UI extensions**, please update your `medusa-config.ts` with the following:

```ts
plugins: [
  {
    resolve: 'medusa-navigation-menu',
    options: {},
  },
],
admin: {
  vite: () => {
    return {
      optimizeDeps: {
        include: ['qs'],
      },
    };
  },
},
```

Then you need to install it with the following dependencies

```
npm i medusa-navigation-menu @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities dnd-kit-sortable-tree

```

then do the necessary migrate to add the required array in database

```
npx medusa db:migrate

```

To access the custom endpoint for each navigation you must have a Publishable API key required in the request header: x-publishable-api-key. You can manage your keys in settings in the dashboard of your medusajs project.

### 🤝 Contributing

This project is in its early stages. Contributions are welcome 💚🙏

Feel free to open issues, suggest improvements, or submit pull requests.
